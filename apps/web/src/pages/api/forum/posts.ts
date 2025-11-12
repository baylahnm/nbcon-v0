import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createPostSchema = z.object({
  threadId: z.string().uuid(),
  content: z.string().min(1),
  parentPostId: z.string().uuid().optional(),
});

/**
 * Forum posts API endpoint
 * GET: List posts for a thread
 * POST: Create a new post (reply)
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return res.status(500).json({ error: "Database not configured" });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  if (req.method === "GET") {
    try {
      const { threadId } = req.query;

      if (!threadId || typeof threadId !== "string") {
        return res.status(400).json({ error: "threadId is required" });
      }

      const { data, error } = await supabase
        .from("forum_posts")
        .select(
          `
          *,
          parentPost:forum_posts!forum_posts_parent_post_id_fkey(id, content)
        `
        )
        .eq("thread_id", threadId)
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Error fetching posts:", error);
        return res.status(500).json({ error: "Failed to fetch posts" });
      }

      // Transform data
      const posts = (data || []).map((post: any) => ({
        id: post.id,
        threadId: post.thread_id,
        content: post.content,
        authorId: post.author_id,
        author: {
          id: post.author_id,
          name: `User ${post.author_id.slice(0, 8)}`, // Will be enhanced with user lookup
        },
        votes: post.votes,
        isBestAnswer: post.is_best_answer,
        parentPostId: post.parent_post_id,
        parentPost: post.parentPost
          ? {
              id: post.parentPost.id,
              content: post.parentPost.content,
            }
          : undefined,
        createdAt: post.created_at,
        updatedAt: post.updated_at,
      }));

      return res.status(200).json({ posts });
    } catch (error) {
      console.error("Error in GET /api/forum/posts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  if (req.method === "POST") {
    try {
      // Get authenticated user
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const token = authHeader.replace("Bearer ", "");
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser(token);

      if (authError || !user) {
        return res.status(401).json({ error: "Unauthorized" });
      }

      const body = createPostSchema.parse(req.body);
      const { threadId, content, parentPostId } = body;

      // Check if thread exists and is not locked
      const { data: thread, error: threadError } = await supabase
        .from("forum_threads")
        .select("is_locked")
        .eq("id", threadId)
        .single();

      if (threadError || !thread) {
        return res.status(404).json({ error: "Thread not found" });
      }

      if (thread.is_locked) {
        return res.status(403).json({ error: "Thread is locked" });
      }

      // Create post
      const { data: post, error: postError } = await supabase
        .from("forum_posts")
        .insert({
          thread_id: threadId,
          content,
          author_id: user.id,
          parent_post_id: parentPostId || null,
        })
        .select()
        .single();

      if (postError) {
        console.error("Error creating post:", postError);
        return res.status(500).json({ error: "Failed to create post" });
      }

      return res.status(201).json({ post });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/forum/posts:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


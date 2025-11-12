import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const createThreadSchema = z.object({
  title: z.string().min(3).max(200),
  content: z.string().min(10),
  categoryId: z.string().uuid(),
  tagIds: z.array(z.string().uuid()).optional(),
});

/**
 * Forum threads API endpoint
 * GET: List threads with filters
 * POST: Create a new thread
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
      const { categoryId, sortBy = "recent", limit = 50, offset = 0 } = req.query;

      let query = supabase
        .from("forum_threads")
        .select(
          `
          *,
          category:forum_categories(*),
          tags:forum_thread_tags(
            tag:forum_tags(*)
          )
        `,
          { count: "exact" }
        )
        .order("is_pinned", { ascending: false });

      // Category filter
      if (categoryId && typeof categoryId === "string") {
        query = query.eq("category_id", categoryId);
      }

      // Sort
      switch (sortBy) {
        case "popular":
          query = query.order("votes", { ascending: false });
          break;
        case "trending":
          // Complex sorting would need a computed column or multiple queries
          query = query.order("last_activity_at", { ascending: false });
          break;
        case "unanswered":
          query = query.order("reply_count", { ascending: true });
          break;
        case "recent":
        default:
          query = query.order("last_activity_at", { ascending: false });
          break;
      }

      // Pagination
      const limitNum = parseInt(limit as string, 10);
      const offsetNum = parseInt(offset as string, 10);
      query = query.range(offsetNum, offsetNum + limitNum - 1);

      const { data, error, count } = await query;

      if (error) {
        console.error("Error fetching threads:", error);
        return res.status(500).json({ error: "Failed to fetch threads" });
      }

      // Transform data to match TypeScript types
      const threads = (data || []).map((thread: any) => ({
        id: thread.id,
        title: thread.title,
        content: thread.content,
        authorId: thread.author_id,
        author: {
          id: thread.author_id,
          name: `User ${thread.author_id.slice(0, 8)}`, // Will be enhanced with user lookup
        },
        categoryId: thread.category_id,
        category: thread.category
          ? {
              id: thread.category.id,
              slug: thread.category.slug,
              name: thread.category.name,
              description: thread.category.description,
              icon: thread.category.icon,
              color: thread.category.color,
              sortOrder: thread.category.sort_order,
              threadCount: thread.category.thread_count,
              postCount: thread.category.post_count,
              createdAt: thread.category.created_at,
              updatedAt: thread.category.updated_at,
            }
          : undefined,
        tags: thread.tags?.map((tt: any) => ({
          id: tt.tag.id,
          name: tt.tag.name,
          color: tt.tag.color,
          usageCount: tt.tag.usage_count,
          createdAt: tt.tag.created_at,
        })),
        views: thread.views,
        votes: thread.votes,
        replyCount: thread.reply_count,
        isPinned: thread.is_pinned,
        isLocked: thread.is_locked,
        isSolved: thread.is_solved,
        lastActivityAt: thread.last_activity_at,
        createdAt: thread.created_at,
        updatedAt: thread.updated_at,
      }));

      return res.status(200).json({
        threads,
        total: count || 0,
        limit: limitNum,
        offset: offsetNum,
      });
    } catch (error) {
      console.error("Error in GET /api/forum/threads:", error);
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

      const body = createThreadSchema.parse(req.body);
      const { title, content, categoryId, tagIds } = body;

      // Create thread
      const { data: thread, error: threadError } = await supabase
        .from("forum_threads")
        .insert({
          title,
          content,
          author_id: user.id,
          category_id: categoryId,
        })
        .select()
        .single();

      if (threadError) {
        console.error("Error creating thread:", threadError);
        return res.status(500).json({ error: "Failed to create thread" });
      }

      // Add tags if provided
      if (tagIds && tagIds.length > 0) {
        const tagInserts = tagIds.map((tagId) => ({
          thread_id: thread.id,
          tag_id: tagId,
        }));

        const { error: tagError } = await supabase
          .from("forum_thread_tags")
          .insert(tagInserts);

        if (tagError) {
          console.error("Error adding tags:", tagError);
          // Don't fail the request if tags fail
        }
      }

      return res.status(201).json({ thread });
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/forum/threads:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


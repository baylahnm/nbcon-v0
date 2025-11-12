import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

const voteSchema = z.object({
  threadId: z.string().uuid().optional(),
  postId: z.string().uuid().optional(),
  voteType: z.enum(["up", "down"]),
}).refine((data) => data.threadId || data.postId, {
  message: "Either threadId or postId must be provided",
});

/**
 * Forum votes API endpoint
 * POST: Create or update a vote
 * DELETE: Remove a vote
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

      const body = voteSchema.parse(req.body);
      const { threadId, postId, voteType } = body;

      // Check if vote already exists
      const { data: existingVote } = await supabase
        .from("forum_votes")
        .select("*")
        .eq("user_id", user.id)
        .eq(threadId ? "thread_id" : "post_id", threadId || postId)
        .single();

      if (existingVote) {
        // Update existing vote
        if (existingVote.vote_type === voteType) {
          // Same vote type - remove vote
          const { error: deleteError } = await supabase
            .from("forum_votes")
            .delete()
            .eq("id", existingVote.id);

          if (deleteError) {
            console.error("Error removing vote:", deleteError);
            return res.status(500).json({ error: "Failed to remove vote" });
          }

          return res.status(200).json({ vote: null, action: "removed" });
        } else {
          // Different vote type - update
          const { error: updateError } = await supabase
            .from("forum_votes")
            .update({ vote_type: voteType })
            .eq("id", existingVote.id);

          if (updateError) {
            console.error("Error updating vote:", updateError);
            return res.status(500).json({ error: "Failed to update vote" });
          }

          return res.status(200).json({ vote: { ...existingVote, vote_type: voteType }, action: "updated" });
        }
      } else {
        // Create new vote
        const { data: vote, error: voteError } = await supabase
          .from("forum_votes")
          .insert({
            user_id: user.id,
            thread_id: threadId || null,
            post_id: postId || null,
            vote_type: voteType,
          })
          .select()
          .single();

        if (voteError) {
          console.error("Error creating vote:", voteError);
          return res.status(500).json({ error: "Failed to create vote" });
        }

        return res.status(201).json({ vote, action: "created" });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          error: "Invalid request",
          details: error.errors,
        });
      }

      console.error("Error in POST /api/forum/votes:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


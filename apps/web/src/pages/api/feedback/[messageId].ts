import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client with service role key for server-side operations
const getSupabaseClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
};

interface Feedback {
  id: string;
  user_id: string;
  message_id: string;
  feedback_type: "like" | "dislike";
  feedback_reason?: string;
  created_at: string;
}

// POST /api/feedback - Submit feedback (like/dislike)
// GET /api/feedback/[messageId] - Get feedback for a message

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback | Feedback[] | { success: boolean } | { error: string }>
) {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  // Get user from Authorization header or session
  const authHeader = req.headers.authorization;
  let userId: string | null = null;

  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      userId = user.id;
    }
  }

  // Fallback: try to get user from session cookie
  if (!userId) {
    const { data: { user } } = await supabase.auth.getUser();
    userId = user?.id || null;
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { messageId } = req.query;

  // GET /api/feedback/[messageId] - Get feedback for a message
  if (req.method === "GET" && messageId && typeof messageId === "string") {
    try {
      const { data, error } = await supabase
        .from("feedback")
        .select("*")
        .eq("message_id", messageId)
        .eq("user_id", userId)
        .single();

      if (error && error.code !== "PGRST116") {
        console.error("Error fetching feedback:", error);
        return res.status(500).json({ error: "Failed to fetch feedback" });
      }

      // Return null if no feedback found (not an error)
      return res.status(200).json(data || null);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // POST /api/feedback - Submit feedback
  if (req.method === "POST") {
    try {
      const { message_id, feedback_type, feedback_reason } = req.body;

      if (!message_id || typeof message_id !== "string") {
        return res.status(400).json({ error: "message_id is required" });
      }

      if (!feedback_type || !["like", "dislike"].includes(feedback_type)) {
        return res.status(400).json({ error: "feedback_type must be 'like' or 'dislike'" });
      }

      // Check if feedback already exists for this user and message
      const { data: existingFeedback } = await supabase
        .from("feedback")
        .select("id, feedback_type")
        .eq("user_id", userId)
        .eq("message_id", message_id)
        .single();

      let result;

      if (existingFeedback) {
        // Update existing feedback
        const { data, error } = await supabase
          .from("feedback")
          .update({
            feedback_type,
            feedback_reason: feedback_reason || null,
          })
          .eq("id", existingFeedback.id)
          .eq("user_id", userId)
          .select()
          .single();

        if (error) {
          console.error("Error updating feedback:", error);
          return res.status(500).json({ error: "Failed to update feedback" });
        }

        result = data;
      } else {
        // Insert new feedback
        const { data, error } = await supabase
          .from("feedback")
          .insert({
            user_id: userId,
            message_id,
            feedback_type,
            feedback_reason: feedback_reason || null,
          })
          .select()
          .single();

        if (error) {
          console.error("Error creating feedback:", error);
          return res.status(500).json({ error: "Failed to create feedback" });
        }

        result = data;
      }

      return res.status(200).json(result);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE /api/feedback/[messageId] - Remove feedback
  if (req.method === "DELETE" && messageId && typeof messageId === "string") {
    try {
      const { error } = await supabase
        .from("feedback")
        .delete()
        .eq("message_id", messageId)
        .eq("user_id", userId);

      if (error) {
        console.error("Error deleting feedback:", error);
        return res.status(500).json({ error: "Failed to delete feedback" });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


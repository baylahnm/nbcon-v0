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

// GET /api/feedback/[messageId] - Get feedback for a message
// DELETE /api/feedback/[messageId] - Remove feedback

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Feedback | { success: boolean } | { error: string }>
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

  if (!messageId || typeof messageId !== "string") {
    return res.status(400).json({ error: "messageId is required" });
  }

  // GET /api/feedback/[messageId] - Get feedback for a message
  if (req.method === "GET") {
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

  // DELETE /api/feedback/[messageId] - Remove feedback
  if (req.method === "DELETE") {
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


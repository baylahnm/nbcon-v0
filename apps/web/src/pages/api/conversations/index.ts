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

interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

interface ConversationWithMessages extends Conversation {
  messages?: Array<{
    id: string;
    role: "user" | "assistant";
    content: string;
    created_at: string;
  }>;
}

// GET /api/conversations/[id] - Get conversation with messages
// DELETE /api/conversations/[id] - Delete conversation

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ConversationWithMessages | { success: boolean } | { error: string }>
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

  const { id } = req.query;

  if (!id || typeof id !== "string") {
    return res.status(400).json({ error: "Conversation ID is required" });
  }

  // GET /api/conversations/[id] - Get single conversation with messages
  if (req.method === "GET") {
    try {
      // Get conversation
      const { data: conversation, error: convError } = await supabase
        .from("conversations")
        .select("*")
        .eq("id", id)
        .eq("user_id", userId)
        .single();

      if (convError || !conversation) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      // Get messages from ai_logs
      const { data: messages, error: messagesError } = await supabase
        .from("ai_logs")
        .select("id, input, output, created_at")
        .eq("conversation_id", id)
        .order("created_at", { ascending: true });

      if (messagesError) {
        console.error("Error fetching messages:", messagesError);
      }

      const conversationWithMessages: ConversationWithMessages = {
        ...conversation,
        messages: (messages || []).map((log) => ({
          id: log.id,
          role: "user" as const,
          content: log.input,
          created_at: log.created_at,
        })).concat(
          (messages || [])
            .filter((log) => log.output)
            .map((log) => ({
              id: `${log.id}-response`,
              role: "assistant" as const,
              content: log.output || "",
              created_at: log.created_at,
            }))
        ).sort((a, b) => 
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        ),
      };

      return res.status(200).json(conversationWithMessages);
    } catch (error) {
      console.error("Error fetching conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE /api/conversations/[id] - Delete conversation
  if (req.method === "DELETE") {
    try {
      const { error } = await supabase
        .from("conversations")
        .delete()
        .eq("id", id)
        .eq("user_id", userId);

      if (error) {
        console.error("Error deleting conversation:", error);
        return res.status(500).json({ error: "Failed to delete conversation" });
      }

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error deleting conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}


import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client - use anon key with cookies for auth, service role for admin operations
const getSupabaseClient = (req: NextApiRequest) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  // Create client with anon key that can read cookies
  const client = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
    global: {
      headers: {
        Cookie: req.headers.cookie || "",
      },
    },
  });

  return client;
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

// GET /api/conversations - List user's conversations
// POST /api/conversations - Create new conversation
// GET /api/conversations/[id] - Get conversation with messages
// DELETE /api/conversations/[id] - Delete conversation

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Conversation | Conversation[] | ConversationWithMessages | { error: string }>
) {
  const supabase = getSupabaseClient(req);
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  // Get user from Authorization header or session cookie
  const authHeader = req.headers.authorization;
  let userId: string | null = null;

  // Try Authorization header first
  if (authHeader?.startsWith("Bearer ")) {
    const token = authHeader.substring(7);
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (!error && user) {
      userId = user.id;
    }
  } else {
    // Try to get user from session cookie
    // The client with cookies should automatically handle session
    const { data: { user }, error } = await supabase.auth.getUser();
    if (!error && user) {
      userId = user.id;
    }
  }

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { id } = req.query;

  // GET /api/conversations/[id] - Get single conversation with messages
  if (req.method === "GET" && id && typeof id === "string") {
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

  // GET /api/conversations - List all conversations
  if (req.method === "GET") {
    try {
      const { data, error } = await supabase
        .from("conversations")
        .select("id, title, created_at, updated_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        return res.status(500).json({ error: "Failed to fetch conversations" });
      }

      return res.status(200).json(data || []);
    } catch (error) {
      console.error("Error fetching conversations:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // POST /api/conversations - Create new conversation
  if (req.method === "POST") {
    try {
      const { title } = req.body;

      if (!title || typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ error: "Title is required" });
      }

      const { data, error } = await supabase
        .from("conversations")
        .insert({
          user_id: userId,
          title: title.trim(),
        })
        .select()
        .single();

      if (error) {
        console.error("Error creating conversation:", error);
        return res.status(500).json({ error: "Failed to create conversation" });
      }

      return res.status(201).json(data);
    } catch (error) {
      console.error("Error creating conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // PATCH /api/conversations/[id] - Update conversation (e.g., title)
  if (req.method === "PATCH") {
    try {
      const { title } = req.body;

      if (!title || typeof title !== "string" || title.trim().length === 0) {
        return res.status(400).json({ error: "Title is required" });
      }

      const { data, error } = await supabase
        .from("conversations")
        .update({ title: title.trim() })
        .eq("id", id)
        .eq("user_id", userId)
        .select()
        .single();

      if (error) {
        console.error("Error updating conversation:", error);
        return res.status(500).json({ error: "Failed to update conversation" });
      }

      if (!data) {
        return res.status(404).json({ error: "Conversation not found" });
      }

      return res.status(200).json(data);
    } catch (error) {
      console.error("Error updating conversation:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  // DELETE /api/conversations/[id] - Delete conversation
  if (req.method === "DELETE" && id && typeof id === "string") {
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


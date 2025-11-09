import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";

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

// POST /api/conversations/[id]/export/docs - Export conversation to Google Docs
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ doc_url: string; doc_id: string } | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { id } = req.query;
    if (!id || typeof id !== "string") {
      return res.status(400).json({ error: "Conversation ID is required" });
    }

    // Get conversation with messages
    const { data: conversation, error: conversationError } = await supabase
      .from("conversations")
      .select("*")
      .eq("id", id)
      .eq("user_id", user.id)
      .single();

    if (conversationError || !conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Get messages from ai_logs
    const { data: messages, error: messagesError } = await supabase
      .from("ai_logs")
      .select("input, output, created_at")
      .eq("conversation_id", id)
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (messagesError) {
      console.error("Error fetching messages:", messagesError);
      return res.status(500).json({ error: "Failed to fetch messages" });
    }

    // Format conversation for export
    const conversationText = [
      `# ${conversation.title}`,
      `\nCreated: ${new Date(conversation.created_at).toLocaleString()}\n`,
      ...(messages || []).flatMap((msg) => {
        const parts: string[] = [];
        if (msg.input) {
          parts.push(`## User\n${msg.input}\n`);
        }
        if (msg.output) {
          parts.push(`## Assistant\n${msg.output}\n`);
        }
        return parts;
      }),
    ].join("\n");

    // TODO: Implement Google Docs API integration
    // For now, return a placeholder response
    // In production, you would:
    // 1. Authenticate with Google OAuth
    // 2. Create a new Google Doc
    // 3. Insert the conversation text
    // 4. Return the doc URL

    return res.status(501).json({
      error: "Google Docs export not yet implemented. Requires Google OAuth setup.",
    });
  } catch (error) {
    console.error("Error exporting to Docs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


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

// GET /api/ai/versions/[messageId] - Get all versions for a message
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    versions: Array<{ version_number: number; content: string; created_at: string }>;
    total_versions: number;
    current_version: number;
  } | { error: string }>
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const supabase = getSupabaseClient();
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured" });
  }

  try {
    // Get authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const { messageId } = req.query;

    if (!messageId || typeof messageId !== "string") {
      return res.status(400).json({ error: "messageId is required" });
    }

    // Verify user owns this message
    const { data: message, error: messageError } = await supabase
      .from("ai_logs")
      .select("id, version_number")
      .eq("id", messageId)
      .eq("user_id", user.id)
      .single();

    if (messageError || !message) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Get all versions for this message
    const { data: versions, error: versionsError } = await supabase
      .from("response_versions")
      .select("version_number, content, created_at")
      .eq("message_id", messageId)
      .order("version_number", { ascending: true });

    if (versionsError) {
      console.error("Error fetching versions:", versionsError);
      return res.status(500).json({ error: "Failed to fetch versions" });
    }

    // Include current version from ai_logs if no versions exist yet
    const versionsList = versions || [];
    const totalVersions = Math.max(versionsList.length, 1);
    const currentVersion = message.version_number || 1;

    return res.status(200).json({
      versions: versionsList,
      total_versions: totalVersions,
      current_version: currentVersion,
    });
  } catch (error) {
    console.error("Error fetching versions:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


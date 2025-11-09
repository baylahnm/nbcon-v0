import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import { agentRegistry } from "@nbcon/ai-core";

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

interface RegenerateRequest {
  message_id: string;
  conversation_id?: string;
  agent_key?: string;
}

interface RegenerateResponse {
  output: string;
  tokens: number;
  version_number: number;
  log_id: string;
}

// POST /api/ai/regenerate - Regenerate AI response
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegenerateResponse | { error: string }>
) {
  if (req.method !== "POST") {
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

    const { message_id, conversation_id, agent_key = "civil" }: RegenerateRequest = req.body;

    if (!message_id) {
      return res.status(400).json({ error: "message_id is required" });
    }

    // Get the original message from ai_logs
    const { data: originalMessage, error: messageError } = await supabase
      .from("ai_logs")
      .select("*")
      .eq("id", message_id)
      .eq("user_id", user.id)
      .single();

    if (messageError || !originalMessage) {
      return res.status(404).json({ error: "Message not found" });
    }

    // Get agent configuration
    const agent = agentRegistry[agent_key as keyof typeof agentRegistry];
    if (!agent) {
      return res.status(400).json({ error: `Agent "${agent_key}" not found` });
    }

    // Get the next version number
    // First check if any versions exist
    const { data: existingVersions, error: versionsCheckError } = await supabase
      .from("response_versions")
      .select("version_number")
      .eq("message_id", message_id)
      .order("version_number", { ascending: false })
      .limit(1);

    let versionNumber = 1;
    if (!versionsCheckError && existingVersions && existingVersions.length > 0) {
      versionNumber = existingVersions[0].version_number + 1;
    } else {
      // No versions exist yet, check if we need to create version 1 from ai_logs
      const { count, error: countError } = await supabase
        .from("response_versions")
        .select("*", { count: "exact", head: true })
        .eq("message_id", message_id);

      if (!countError && count === 0 && originalMessage.output) {
        // Save the original response as version 1
        await supabase.from("response_versions").insert({
          message_id,
          version_number: 1,
          content: originalMessage.output,
          tokens_used: originalMessage.tokens_used || 0,
        });
        versionNumber = 2; // Next version will be 2
      } else {
        versionNumber = 1; // First version
      }
    }

    // Prepare OpenAI API request
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      return res.status(500).json({ error: "OpenAI API key not configured" });
    }

    const body = {
      model: agent.model,
      messages: [
        {
          role: "system" as const,
          content: `You are a ${agent.context} specialist. ${agent.description}`,
        },
        {
          role: "user" as const,
          content: originalMessage.input,
        },
      ],
      temperature: agent.temperature || 0.3,
      max_tokens: agent.maxTokens || 4000,
    };

    // Call OpenAI API
    const openaiResponse = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openaiApiKey}`,
      },
      body: JSON.stringify(body),
    });

    if (!openaiResponse.ok) {
      const errorData = await openaiResponse.json();
      console.error("OpenAI API error:", errorData);
      return res.status(500).json({ error: "AI request failed" });
    }

    const openaiData = await openaiResponse.json();
    const output = openaiData.choices[0]?.message?.content || "";
    const tokens = openaiData.usage?.total_tokens || 0;

    // Save new version to response_versions table
    const { data: versionRecord, error: versionInsertError } = await supabase
      .from("response_versions")
      .insert({
        message_id,
        version_number: versionNumber,
        content: output,
        tokens_used: tokens,
      })
      .select()
      .single();

    if (versionInsertError) {
      console.error("Error saving version:", versionInsertError);
      return res.status(500).json({ error: "Failed to save version" });
    }

    // Update ai_logs with new version number and output
    const { error: updateError } = await supabase
      .from("ai_logs")
      .update({
        output: output,
        version_number: versionNumber,
        tokens_used: tokens,
      })
      .eq("id", message_id);

    if (updateError) {
      console.error("Error updating ai_logs:", updateError);
      // Don't fail the request, version is already saved
    }

    return res.status(200).json({
      output,
      tokens,
      version_number: versionNumber,
      log_id: message_id,
    });
  } catch (error) {
    console.error("Error regenerating response:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}


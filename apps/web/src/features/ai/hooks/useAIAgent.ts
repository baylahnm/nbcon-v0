import { useState } from "react";
import { agentRegistry } from "../registry/agentRegistry";
import { supabase } from "@nbcon/config";
import { track } from "@nbcon/enterprise-sdk/telemetry";
import type { AgentRequest, AgentResponse } from "@nbcon/ai-core";

type AgentKey = keyof typeof agentRegistry;

export function useAIAgent(agentKey: AgentKey) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const agent = agentRegistry[agentKey];

  if (!agent) {
    throw new Error(`Agent "${agentKey}" not found in registry`);
  }

  const runAgent = async (params: AgentRequest): Promise<AgentResponse> => {
    setLoading(true);
    setError(null);

    let user: { id: string } | null = null;

    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        throw new Error("User not authenticated");
      }

      user = authUser;

      const body = {
        model: agent.model,
        messages: [
          {
            role: "system" as const,
            content: `You are a ${agent.context} specialist. ${agent.description}`,
          },
          {
            role: "user" as const,
            content: params.prompt,
          },
        ],
        temperature: params.options?.temperature || agent.temperature || 0.3,
        max_tokens: params.options?.maxTokens || agent.maxTokens || 4000,
      };

      // Call API route
      const res = await fetch("/api/ai/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "AI request failed");
      }

      const data: AgentResponse = await res.json();

      // Log to Supabase
      const { data: logData, error: logError } = await supabase.from("ai_logs").insert({
        user_id: user!.id,
        agent: agent.id,
        input: params.prompt,
        output: data.output || "",
        tokens_used: data.tokens || 0,
      }).select().single();

      if (logError) {
        console.error("Error logging AI request:", logError);
      } else {
        // Track to PostHog for telemetry
        track("ai_agent_request", {
          agent_id: agent.id,
          agent_key: agentKey,
          agent_context: agent.context,
          model: agent.model,
          tokens_used: data.tokens || 0,
          log_id: logData?.id,
          user_id: user!.id,
          prompt_length: params.prompt.length,
          response_length: data.output?.length || 0,
          temperature: params.options?.temperature || agent.temperature || 0.3,
          max_tokens: params.options?.maxTokens || agent.maxTokens || 4000,
        });

        // Track token usage separately for analytics
        track("ai_token_usage", {
          agent_id: agent.id,
          tokens: data.tokens || 0,
          model: agent.model,
          user_id: user!.id,
        });
      }

      setLoading(false);
      return data;
    } catch (err: any) {
      // Track errors to PostHog
      track("ai_agent_error", {
        agent_id: agent.id,
        agent_key: agentKey,
        error_message: err.message,
        user_id: user?.id,
      });

      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { runAgent, loading, error, agent };
}


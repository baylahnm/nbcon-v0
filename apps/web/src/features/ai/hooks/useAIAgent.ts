import { useState } from "react";
import { agentRegistry } from "../registry/agentRegistry";
import { supabase } from "@nbcon/config";
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

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        throw new Error("User not authenticated");
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
      const { error: logError } = await supabase.from("ai_logs").insert({
        user_id: user.id,
        agent: agent.id,
        input: params.prompt,
        output: data.output || "",
        tokens_used: data.tokens || 0,
      });

      if (logError) {
        console.error("Error logging AI request:", logError);
      }

      setLoading(false);
      return data;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
      throw err;
    }
  };

  return { runAgent, loading, error, agent };
}


import { useState } from "react";
import { agentRegistry } from "../registry/agentRegistry";
import { supabase } from "@nbcon/config";
import { track } from "@nbcon/enterprise-sdk";
import type { AgentRequest, AgentResponse } from "@nbcon/ai-core";

type AgentKey = keyof typeof agentRegistry;

export function useAIAgent(agentKey: AgentKey, options?: { model?: string; provider?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const agent = agentRegistry[agentKey];

  if (!agent) {
    throw new Error(`Agent "${agentKey}" not found in registry`);
  }

  const runAgent = async (params: AgentRequest & { model?: string; provider?: string }): Promise<AgentResponse> => {
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

      // Check credit balance before execution
      const { data: creditsData, error: creditsError } = await supabase
        .from('user_credits')
        .select('daily_tokens_used, daily_tokens_limit, subscription_tier')
        .eq('user_id', user.id)
        .single();

      if (creditsError && creditsError.code !== 'PGRST116') {
        console.error('Error fetching credits:', creditsError);
        // Continue without credit check if table doesn't exist yet
      } else if (creditsData) {
        const { daily_tokens_used = 0, daily_tokens_limit, subscription_tier } = creditsData;
        
        // Check if user has exceeded daily limit (enterprise has unlimited)
        if (subscription_tier !== 'enterprise' && daily_tokens_used >= daily_tokens_limit) {
          const errorMessage = `Daily credit limit exceeded (${daily_tokens_used}/${daily_tokens_limit}). Please upgrade your plan at /billing or wait until midnight UTC for reset.`;
          throw new Error(errorMessage);
        }
      }

      // Use provided model or fall back to agent model
      const model = params.model || options?.model || agent.model;
      const provider = params.provider || options?.provider;

      const body: any = {
        model: model,
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

      // Add provider if explicitly provided
      if (provider) {
        body.provider = provider;
      }

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

      // Deduct tokens from user credits
      if (data.tokens && data.tokens > 0) {
        const { error: deductError } = await supabase.rpc('deduct_user_credits', {
          p_user_id: user!.id,
          p_tokens: data.tokens,
        });

        if (deductError) {
          console.error('Error deducting credits:', deductError);
          // Continue even if credit deduction fails (log error but don't block)
        }
      }

      // Log to Supabase with conversation_id if provided
      const logData: any = {
        user_id: user!.id,
        agent: agent.id,
        input: params.prompt,
        output: data.output || "",
        tokens_used: data.tokens || 0,
      };

      // Add conversation_id if provided (from params or type assertion)
      if ((params as any).conversationId) {
        logData.conversation_id = (params as any).conversationId;
      }

      const { data: insertedLogData, error: logError } = await supabase.from("ai_logs").insert(logData).select().single();

      if (logError) {
        console.error("Error logging AI request:", logError);
      } else {
        // Save initial version to response_versions table
        if (insertedLogData?.id && data.output) {
          const { error: versionError } = await supabase.from("response_versions").insert({
            message_id: insertedLogData.id,
            version_number: 1,
            content: data.output,
            tokens_used: data.tokens || 0,
          });

          if (versionError) {
            console.error("Error saving initial version:", versionError);
            // Don't fail the request if version save fails
          }
        }

        // Track to PostHog for telemetry
        track("ai_agent_request", {
          agent_id: agent.id,
          agent_key: agentKey,
          agent_context: agent.context,
          model: model, // Use actual model being used
          provider: provider, // Include provider if provided
          tokens_used: data.tokens || 0,
          log_id: insertedLogData?.id,
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
          model: model, // Use actual model being used
          provider: provider, // Include provider if provided
          user_id: user!.id,
        });
      }

      setLoading(false);
      // Return data with logId for feedback tracking
      return {
        ...data,
        logId: insertedLogData?.id,
      };
    } catch (err: unknown) {
      // Track errors to PostHog
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      track("ai_agent_error", {
        agent_id: agent.id,
        agent_key: agentKey,
        error_message: errorMessage,
        user_id: user?.id,
      });

      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
      throw err;
    }
  };

  return { runAgent, loading, error, agent };
}


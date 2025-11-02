import { useEffect } from "react";
import { supabase } from "@nbcon/config";
import type { AgentLog } from "@nbcon/ai-core";

interface AgentOutputPanelProps {
  agentId: string;
  onOutput?: (log: AgentLog) => void;
}

export function AgentOutputPanel({ agentId, onOutput }: AgentOutputPanelProps) {
  useEffect(() => {
    const channel = supabase
      .channel(`ai_logs:${agentId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ai_logs",
          filter: `agent=eq.${agentId}`,
        },
        (payload) => {
          if (onOutput) {
            onOutput(payload.new as AgentLog);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [agentId, onOutput]);

  return null;
}


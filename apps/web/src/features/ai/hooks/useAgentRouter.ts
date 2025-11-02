import { agentRegistry } from "../registry/agentRegistry";

export function useAgentRouter(domain: string) {
  return agentRegistry[domain as keyof typeof agentRegistry];
}


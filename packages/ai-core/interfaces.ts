export interface AgentConfig {
  id: string;
  description: string;
  model: string;
  context: string;
  maxTokens?: number;
  temperature?: number;
}

export interface AgentRequest {
  prompt: string;
  context?: Record<string, any>;
  options?: {
    temperature?: number;
    maxTokens?: number;
  };
}

export interface AgentResponse {
  output: string;
  tokens: number;
  agent: string;
  timestamp: string;
}

export interface AgentLog {
  id: string;
  user_id: string;
  agent: string;
  input: string;
  output: string;
  tokens_used: number;
  created_at: string;
}


import { z } from 'zod';

// Agent Request Schema
export const AgentRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt cannot be empty').max(10000, 'Prompt too long'),
  context: z.record(z.any()).optional(),
  options: z.object({
    temperature: z.number().min(0).max(2).optional(),
    maxTokens: z.number().int().min(1).max(16000).optional(),
  }).optional(),
});

// AI API Request Schema
export const AIRequestSchema = z.object({
  model: z.string().min(1, 'Model is required'),
  messages: z.array(
    z.object({
      role: z.enum(['system', 'user', 'assistant']),
      content: z.string().min(1, 'Message content cannot be empty'),
    })
  ).min(1, 'At least one message is required'),
  temperature: z.number().min(0).max(2).optional().default(0.3),
  max_tokens: z.number().int().min(1).max(16000).optional().default(4000),
});

// AI Response Schema
export const AIResponseSchema = z.object({
  output: z.string(),
  tokens: z.number().int().min(0),
  usage: z.object({
    prompt_tokens: z.number().int().min(0).optional(),
    completion_tokens: z.number().int().min(0).optional(),
    total_tokens: z.number().int().min(0).optional(),
  }).optional(),
});

// Agent Response Schema
export const AgentResponseSchema = z.object({
  output: z.string(),
  tokens: z.number().int().min(0),
  agent: z.string().optional(),
  timestamp: z.string().optional(),
});

// Agent Config Schema
export const AgentConfigSchema = z.object({
  id: z.string().min(1),
  description: z.string().min(1),
  model: z.string().min(1),
  context: z.string().min(1),
  maxTokens: z.number().int().min(1).max(16000).optional(),
  temperature: z.number().min(0).max(2).optional(),
});

// Type exports
export type AgentRequest = z.infer<typeof AgentRequestSchema>;
export type AIRequest = z.infer<typeof AIRequestSchema>;
export type AIResponse = z.infer<typeof AIResponseSchema>;
export type AgentResponse = z.infer<typeof AgentResponseSchema>;
export type AgentConfig = z.infer<typeof AgentConfigSchema>;


import type { NextApiRequest, NextApiResponse } from "next";

interface AIRequest {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  max_tokens?: number;
}

interface AIResponse {
  output: string;
  tokens: number;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { model, messages, temperature = 0.3, max_tokens = 4000 } =
      req.body as AIRequest;

    if (!model || !messages) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // In production, this would call OpenAI API
    // For now, return a mock response
    const mockResponse = `[Mock AI Response]
Model: ${model}
Temperature: ${temperature}
Max Tokens: ${max_tokens}

Response: This is a placeholder response. Configure OPENAI_API_KEY to enable real AI responses.

User message: ${messages.find((m) => m.role === "user")?.content || "N/A"}`;

    return res.status(200).json({
      output: mockResponse,
      tokens: 150, // Mock token count
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.message || "Internal server error" });
  }
}


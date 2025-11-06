import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import { AIRequestSchema } from "@nbcon/ai-core";

interface AIResponse {
  output: string;
  tokens: number;
}

// Initialize OpenAI client
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate request body with Zod
    const validationResult = AIRequestSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({
        error: `Validation error: ${validationResult.error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`,
      });
    }

    const { model, messages, temperature, max_tokens } = validationResult.data;

    // Check if OpenAI API key is configured
    const openai = getOpenAIClient();
    
    if (!openai) {
      // Fallback to mock response if API key is not configured
      const mockResponse = `[Mock AI Response - OpenAI API Key not configured]
Model: ${model}
Temperature: ${temperature}
Max Tokens: ${max_tokens}

Response: This is a placeholder response. Configure OPENAI_API_KEY environment variable to enable real AI responses.

User message: ${messages.find((m) => m.role === "user")?.content || "N/A"}`;

      return res.status(200).json({
        output: mockResponse,
        tokens: 150, // Mock token count
      });
    }

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: model,
      messages: messages.map((msg) => ({
        role: msg.role as "system" | "user" | "assistant",
        content: msg.content,
      })),
      temperature: temperature,
      max_tokens: max_tokens,
    });

    const responseContent = completion.choices[0]?.message?.content || "";
    const usage = completion.usage;

    return res.status(200).json({
      output: responseContent,
      tokens: usage?.total_tokens || 0,
    });
  } catch (err: unknown) {
    console.error("AI API Error:", err);
    
    // Handle OpenAI-specific errors
    if (err instanceof OpenAI.APIError) {
      return res.status(err.status || 500).json({
        error: err.message || "OpenAI API error",
      });
    }

    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({
      error: errorMessage,
    });
  }
}


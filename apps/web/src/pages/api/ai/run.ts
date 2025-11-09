import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";
import Anthropic from "@anthropic-ai/sdk";
import { GoogleGenerativeAI } from "@google/generative-ai";
import MistralClient from "@mistralai/mistralai";
import { AIRequestSchema } from "@nbcon/ai-core";
import { z } from "zod";

interface AIResponse {
  output: string;
  tokens: number;
}

type Provider = "openai" | "anthropic" | "google" | "mistral" | "xai";

// Extended schema to accept optional provider
const ExtendedAIRequestSchema = AIRequestSchema.extend({
  provider: z.enum(["openai", "anthropic", "google", "mistral", "xai"]).optional(),
});

/**
 * Detect provider from model name if not explicitly provided
 */
function detectProvider(model: string, explicitProvider?: Provider): Provider {
  if (explicitProvider) {
    return explicitProvider;
  }

  const modelLower = model.toLowerCase();

  // Anthropic models
  if (
    modelLower.includes("claude") ||
    modelLower.includes("sonnet") ||
    modelLower.includes("opus") ||
    modelLower.includes("haiku")
  ) {
    return "anthropic";
  }

  // Google/Gemini models
  if (modelLower.includes("gemini")) {
    return "google";
  }

  // Mistral models
  if (
    modelLower.includes("mistral") ||
    modelLower.includes("mixtral") ||
    modelLower.includes("codestral")
  ) {
    return "mistral";
  }

  // xAI/Grok models
  if (modelLower.includes("grok")) {
    return "xai";
  }

  // OpenAI models (default)
  return "openai";
}

/**
 * Get OpenAI client (supports OpenAI and OpenRouter)
 */
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const openRouterUrl = process.env.OPENROUTER_BASE_URL || "https://openrouter.ai/api/v1";

  // Use OpenRouter if API key is provided, otherwise use OpenAI
  if (openRouterApiKey) {
    return new OpenAI({
      apiKey: openRouterApiKey,
      baseURL: openRouterUrl,
      defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "NBCON PRO",
      },
    });
  }

  if (!apiKey) {
    return null;
  }
  return new OpenAI({ apiKey });
};

/**
 * Get Anthropic client
 */
const getAnthropicClient = () => {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Anthropic({ apiKey });
};

/**
 * Get Google Generative AI client
 */
const getGoogleClient = () => {
  const apiKey = process.env.GOOGLE_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenerativeAI(apiKey);
};

/**
 * Get Mistral client
 */
const getMistralClient = () => {
  const apiKey = process.env.MISTRAL_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new MistralClient({ apiKey });
};

/**
 * Call OpenAI/OpenRouter API
 */
async function callOpenAI(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  const client = getOpenAIClient();
  if (!client) {
    throw new Error("OpenAI API key not configured");
  }

  // Handle Anthropic models via OpenRouter (if using OpenRouter)
  const isAnthropicModel =
    model.includes("sonnet") ||
    model.includes("claude") ||
    model.includes("haiku") ||
    model.includes("opus");

  const completionParams: any = {
    model: model,
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    temperature: temperature,
  };

  // Anthropic models use max_completion_tokens instead of max_tokens
  if (isAnthropicModel) {
    completionParams.max_completion_tokens = maxTokens;
  } else {
    completionParams.max_tokens = maxTokens;
  }

  const completion = await client.chat.completions.create(completionParams);
  const responseContent = completion.choices[0]?.message?.content || "";
  const usage = completion.usage;

  return {
    output: responseContent,
    tokens: usage?.total_tokens || 0,
  };
}

/**
 * Call Anthropic API
 */
async function callAnthropic(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  const client = getAnthropicClient();
  if (!client) {
    throw new Error("Anthropic API key not configured");
  }

  // Convert messages format for Anthropic
  // Anthropic doesn't support system messages directly, so we prepend it to the first user message
  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  // Map model names to Anthropic model IDs
  let anthropicModel = model;
  if (model.includes("sonnet-4.5") || model === "claude-sonnet-4.5") {
    anthropicModel = "claude-3-5-sonnet-20241022";
  } else if (model.includes("opus-4") || model === "claude-opus-4") {
    anthropicModel = "claude-3-opus-20240229";
  } else if (model.includes("haiku-4.5") || model === "haiku-4.5") {
    anthropicModel = "claude-3-haiku-20240307";
  } else if (model.includes("sonnet") || model.includes("claude")) {
    // Default to latest sonnet
    anthropicModel = "claude-3-5-sonnet-20241022";
  }

  const response = await client.messages.create({
    model: anthropicModel,
    max_tokens: maxTokens,
    temperature: temperature,
    system: systemMessage?.content || undefined,
    messages: conversationMessages.map((msg) => ({
      role: msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    })),
  });

  const responseContent = response.content[0]?.type === "text" ? response.content[0].text : "";
  const usage = response.usage;

  return {
    output: responseContent,
    tokens: (usage?.input_tokens || 0) + (usage?.output_tokens || 0),
  };
}

/**
 * Call Google Generative AI API
 */
async function callGoogle(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  const client = getGoogleClient();
  if (!client) {
    throw new Error("Google API key not configured");
  }

  // Map model names to Google model IDs
  let googleModel = model;
  if (model.includes("2.5-pro") || model === "gemini-2.5-pro") {
    googleModel = "gemini-2.0-flash-exp";
  } else if (model.includes("2.0-flash") || model === "gemini-2.0-flash") {
    googleModel = "gemini-2.0-flash-exp";
  } else if (model.includes("gemini")) {
    googleModel = "gemini-pro";
  }

  const genModel = client.getGenerativeModel({
    model: googleModel,
    generationConfig: {
      temperature: temperature,
      maxOutputTokens: maxTokens,
    },
  });

  // Convert messages format for Google
  const systemMessage = messages.find((m) => m.role === "system");
  const conversationMessages = messages.filter((m) => m.role !== "system");

  // Build conversation history
  const history: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  let currentUserMessage = "";
  let currentAssistantMessage = "";

  for (const msg of conversationMessages) {
    if (msg.role === "user") {
      if (currentAssistantMessage) {
        history.push({
          role: "model",
          parts: [{ text: currentAssistantMessage }],
        });
        currentAssistantMessage = "";
      }
      currentUserMessage = msg.content;
    } else if (msg.role === "assistant") {
      if (currentUserMessage) {
        history.push({
          role: "user",
          parts: [{ text: currentUserMessage }],
        });
        currentUserMessage = "";
      }
      currentAssistantMessage = msg.content;
    }
  }

  // Add the last user message if exists
  if (currentUserMessage) {
    history.push({
      role: "user",
      parts: [{ text: currentUserMessage }],
    });
  }

  const chat = genModel.startChat({
    history: history,
    systemInstruction: systemMessage?.content,
  });

  const result = await chat.sendMessage(
    currentUserMessage || conversationMessages[conversationMessages.length - 1]?.content || ""
  );
  const response = result.response;
  const responseText = response.text();

  // Estimate tokens (Google doesn't provide exact token count in response)
  const estimatedTokens = Math.ceil(responseText.length / 4) + maxTokens;

  return {
    output: responseText,
    tokens: estimatedTokens,
  };
}

/**
 * Call Mistral API
 */
async function callMistral(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  const client = getMistralClient();
  if (!client) {
    throw new Error("Mistral API key not configured");
  }

  // Map model names to Mistral model IDs
  let mistralModel = model;
  if (model.includes("large") || model === "mistral-large") {
    mistralModel = "mistral-large-latest";
  } else if (model.includes("mixtral") || model === "mixtral-8x7b") {
    mistralModel = "mixtral-8x7b-32768";
  } else if (model.includes("codestral")) {
    mistralModel = "codestral-latest";
  } else {
    mistralModel = "mistral-medium-latest";
  }

  const response = await client.chat({
    model: mistralModel,
    messages: messages.map((msg) => ({
      role: msg.role === "system" ? "system" : msg.role === "assistant" ? "assistant" : "user",
      content: msg.content,
    })),
    temperature: temperature,
    maxTokens: maxTokens,
  });

  const responseContent = response.choices[0]?.message?.content || "";
  const usage = response.usage;

  return {
    output: responseContent,
    tokens: (usage?.promptTokens || 0) + (usage?.completionTokens || 0),
  };
}

/**
 * Call xAI/Grok API (via OpenRouter or direct REST API)
 */
async function callXAI(
  model: string,
  messages: Array<{ role: "system" | "user" | "assistant"; content: string }>,
  temperature: number,
  maxTokens: number
): Promise<AIResponse> {
  // Try OpenRouter first (if configured)
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  if (openRouterApiKey) {
    const openaiClient = new OpenAI({
      apiKey: openRouterApiKey,
      baseURL: "https://openrouter.ai/api/v1",
      defaultHeaders: {
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "NBCON PRO",
      },
    });

    // Map Grok model names
    let grokModel = model;
    if (model.includes("grok-4") || model === "grok-4") {
      grokModel = "x-ai/grok-beta";
    } else if (model.includes("grok-3") || model === "grok-3") {
      grokModel = "x-ai/grok-beta";
    } else if (model.includes("grok") || model === "grok-mini") {
      grokModel = "x-ai/grok-beta";
    }

    const completion = await openaiClient.chat.completions.create({
      model: grokModel,
      messages: messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      temperature: temperature,
      max_tokens: maxTokens,
    });

    const responseContent = completion.choices[0]?.message?.content || "";
    const usage = completion.usage;

    return {
      output: responseContent,
      tokens: usage?.total_tokens || 0,
    };
  }

  // Fallback: xAI direct API (if XAI_API_KEY is configured)
  const xaiApiKey = process.env.XAI_API_KEY;
  if (!xaiApiKey) {
    throw new Error("xAI API key not configured. Configure OPENROUTER_API_KEY or XAI_API_KEY");
  }

  // Use OpenAI SDK with xAI endpoint
  const xaiClient = new OpenAI({
    apiKey: xaiApiKey,
    baseURL: "https://api.x.ai/v1",
  });

  const completion = await xaiClient.chat.completions.create({
    model: model.includes("grok-4") ? "grok-beta" : "grok-beta",
    messages: messages.map((msg) => ({
      role: msg.role,
      content: msg.content,
    })),
    temperature: temperature,
    max_tokens: maxTokens,
  });

  const responseContent = completion.choices[0]?.message?.content || "";
  const usage = completion.usage;

  return {
    output: responseContent,
    tokens: usage?.total_tokens || 0,
  };
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AIResponse | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Validate request body with extended schema
    const validationResult = ExtendedAIRequestSchema.safeParse(req.body);

    if (!validationResult.success) {
      return res.status(400).json({
        error: `Validation error: ${validationResult.error.errors
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`,
      });
    }

    const { model, messages, temperature, max_tokens, provider: explicitProvider } =
      validationResult.data;

    // Detect provider from model name if not explicitly provided
    const provider = detectProvider(model, explicitProvider);

    // Route to appropriate provider
    let response: AIResponse;

    switch (provider) {
      case "anthropic":
        response = await callAnthropic(model, messages, temperature, max_tokens);
        break;
      case "google":
        response = await callGoogle(model, messages, temperature, max_tokens);
        break;
      case "mistral":
        response = await callMistral(model, messages, temperature, max_tokens);
        break;
      case "xai":
        response = await callXAI(model, messages, temperature, max_tokens);
        break;
      case "openai":
      default:
        response = await callOpenAI(model, messages, temperature, max_tokens);
        break;
    }

    return res.status(200).json(response);
  } catch (err: unknown) {
    console.error("AI API Error:", err);

    // Handle provider-specific errors
    if (err instanceof OpenAI.APIError) {
      return res.status(err.status || 500).json({
        error: err.message || "OpenAI API error",
      });
    }

    if (err instanceof Anthropic.APIError) {
      return res.status(err.status || 500).json({
        error: err.message || "Anthropic API error",
      });
    }

    const errorMessage = err instanceof Error ? err.message : "Internal server error";
    return res.status(500).json({
      error: errorMessage,
    });
  }
}

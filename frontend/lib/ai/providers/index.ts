import { createOpenAI } from "@ai-sdk/openai";
import { createAnthropic } from "@ai-sdk/anthropic";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createMistral } from "@ai-sdk/mistral";
import { generateText, type LanguageModel } from "ai";
import { getAIConfig } from "../config";

/**
 * Builds the active LanguageModel from AI_PROVIDER / AI_MODEL / AI_API_KEY.
 * Throws early with a clear message if no API key is configured, instead of
 * letting the request fail deep inside the provider SDK.
 */
export function getModel(): LanguageModel {
  const { provider, model, apiKey } = getAIConfig();

  if (!apiKey) {
    throw new Error(
      `AI_API_KEY is not set — required to use the "${provider}" provider. ` +
        "See frontend/lib/ai/README.md for setup instructions.",
    );
  }

  switch (provider) {
    case "openai":
      return createOpenAI({ apiKey })(model);
    case "anthropic":
      return createAnthropic({ apiKey })(model);
    case "gemini":
      return createGoogleGenerativeAI({ apiKey })(model);
    case "mistral":
      return createMistral({ apiKey })(model);
    default: {
      // Exhaustiveness check — a new AIProvider added to config.ts without a
      // matching case here will fail to compile.
      const unreachable: never = provider;
      throw new Error(`Unsupported AI provider: ${String(unreachable)}`);
    }
  }
}

export interface GenerateWithAIParams {
  system?: string;
  prompt: string;
}

/**
 * Minimal generateText wrapper: system + user prompt in, plain text out.
 * Uses whichever provider/model is currently configured via getModel().
 */
export async function generateWithAI({ system, prompt }: GenerateWithAIParams): Promise<string> {
  const { text } = await generateText({
    model: getModel(),
    system,
    prompt,
  });
  return text;
}

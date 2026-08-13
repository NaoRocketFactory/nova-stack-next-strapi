/**
 * Central AI provider configuration — reads AI_PROVIDER / AI_MODEL / AI_API_KEY
 * from the environment and resolves them into a single, typed config object.
 * See frontend/lib/ai/README.md for setup instructions per provider.
 */

export type AIProvider = "openai" | "anthropic" | "gemini" | "mistral";

const DEFAULT_PROVIDER: AIProvider = "anthropic";

const PROVIDER_DEFAULT_MODELS: Record<AIProvider, string> = {
  openai: "gpt-5.6-terra",
  anthropic: "claude-sonnet-4-6",
  gemini: "gemini-2.0-flash",
  mistral: "mistral-large-latest",
};

const SUPPORTED_PROVIDERS = Object.keys(PROVIDER_DEFAULT_MODELS) as AIProvider[];

function isAIProvider(value: string): value is AIProvider {
  return (SUPPORTED_PROVIDERS as string[]).includes(value);
}

export interface AIConfig {
  provider: AIProvider;
  model: string;
  apiKey: string | undefined;
}

/**
 * Resolves the active AI provider, model and API key from environment
 * variables. Falls back to Anthropic when AI_PROVIDER is unset or set to
 * an unrecognized value.
 */
export function getAIConfig(): AIConfig {
  const rawProvider = process.env.AI_PROVIDER?.trim().toLowerCase() ?? "";
  const provider = isAIProvider(rawProvider) ? rawProvider : DEFAULT_PROVIDER;
  const model = process.env.AI_MODEL?.trim() || PROVIDER_DEFAULT_MODELS[provider];
  const apiKey = process.env.AI_API_KEY;

  return { provider, model, apiKey };
}

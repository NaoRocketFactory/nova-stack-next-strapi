import { z } from "zod";

/**
 * Runtime environment validation. Fails fast with a readable message
 * instead of letting a missing/malformed env var surface as a confusing
 * error deep inside a fetch call or the AI SDK.
 *
 * STRAPI_API_TOKEN, AI_PROVIDER and AI_API_KEY are genuinely optional here:
 * the starter kit works against Strapi's public API and without AI features
 * out of the box (see lib/api.ts and lib/ai/config.ts) — this only validates
 * their *format* when they are set, it doesn't require them to be set.
 */
const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z
    .string()
    .url({ message: "NEXT_PUBLIC_API_URL must be a valid URL, e.g. http://localhost:1338" })
    .default("http://localhost:1338"),

  STRAPI_API_TOKEN: z
    .string()
    .min(1, "STRAPI_API_TOKEN is set but empty — remove it or provide a real token")
    .optional(),

  AI_PROVIDER: z
    .enum(["openai", "anthropic", "gemini", "mistral"], {
      message: 'AI_PROVIDER must be one of: "openai", "anthropic", "gemini", "mistral"',
    })
    .optional(),

  AI_API_KEY: z
    .string()
    .min(1, "AI_API_KEY is set but empty — remove it or provide a real key")
    .optional(),
});

export type Env = z.infer<typeof envSchema>;

function loadEnv(): Env {
  const result = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    STRAPI_API_TOKEN: process.env.STRAPI_API_TOKEN,
    AI_PROVIDER: process.env.AI_PROVIDER,
    AI_API_KEY: process.env.AI_API_KEY,
  });

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `  - ${issue.path.join(".") || "(root)"}: ${issue.message}`)
      .join("\n");

    throw new Error(
      `❌ Invalid environment variables:\n${details}\n\n` +
        "Check frontend/.env.local against frontend/.env.example.",
    );
  }

  return result.data;
}

export const env = loadEnv();

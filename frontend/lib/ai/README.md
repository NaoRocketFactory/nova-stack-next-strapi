# 🤖 AI layer

A thin, provider-agnostic AI layer built on the [Vercel AI SDK](https://sdk.vercel.dev/). One
environment variable (`AI_PROVIDER`) picks the model provider — the rest of the app never talks
to OpenAI/Anthropic/Google/Mistral directly, it goes through `getModel()`.

```
lib/ai/
├── config.ts              # reads AI_PROVIDER / AI_MODEL / AI_API_KEY
├── providers/index.ts      # getModel() + generateWithAI()
├── rate-limit.ts            # basic in-memory rate limiter used by the API route
└── examples/
    ├── generate-meta.ts    # title + content → SEO title/description
    ├── summarize.ts        # content → 2-3 sentence summary (+ streaming variant)
    ├── translate.ts        # text + lang → translated text
    └── generate-slug.ts    # title → SEO-friendly slug
```

## 1. Configure a provider

Set three variables in `frontend/.env.local` (copy from `.env.example`):

```bash
AI_PROVIDER=anthropic       # openai | anthropic | gemini | mistral
AI_API_KEY=sk-...           # the API key for that provider
# AI_MODEL=claude-sonnet-4-6  # optional — overrides the provider's default model
```

If `AI_PROVIDER` is unset or not one of the four supported values, the app falls back to
`anthropic`. If `AI_API_KEY` is missing, `getModel()` throws immediately with a clear error
instead of failing deep inside the provider SDK.

### Per-provider setup

| Provider | `AI_PROVIDER` | Get a key | Default model | Other available models |
|---|---|---|---|---|
| OpenAI | `openai` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) | `gpt-5.6-terra` | `gpt-5.6-sol`, `gpt-5.6-luna` |
| Anthropic | `anthropic` | [console.anthropic.com](https://console.anthropic.com/settings/keys) | `claude-sonnet-4-6` | `claude-opus-5`, `claude-haiku-4-5` |
| Google Gemini | `gemini` | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) | `gemini-2.0-flash` | `gemini-2.0-pro` |
| Mistral | `mistral` | [console.mistral.ai](https://console.mistral.ai/api-keys) | `mistral-large-latest` | `mistral-small-latest` |

Set `AI_MODEL` to switch to any of the "other available models" without touching code — see the
comment block above `AI_MODEL` in `.env.example`.

Only the provider you select needs a key — the other three `@ai-sdk/*` packages are installed
(so switching providers is a one-line env change) but stay unused until you switch to them.

## 2. Use the helpers

```ts
import { generateWithAI } from "@/lib/ai/providers";
// or, if you haven't re-enabled the "@/*" path alias: "../../lib/ai/providers"

const answer = await generateWithAI({
  system: "You are a helpful assistant.",
  prompt: "Explain Strapi's Document Service API in one sentence.",
});
```

Or call one of the ready-made examples directly:

```ts
import { generateMeta } from "../../lib/ai/examples/generate-meta";
import { summarize } from "../../lib/ai/examples/summarize";
import { translate } from "../../lib/ai/examples/translate";
import { generateSlug } from "../../lib/ai/examples/generate-slug";

const meta = await generateMeta({ title: article.title, content: rawText });
const summary = await summarize(rawText);
const frText = await translate("Hello world", "fr");
const slug = await generateSlug("My New Article Title!");
```

`generateMeta` and `generateSlug` use `generateObject()` with a Zod schema, so their return
values are validated and typed — no manual JSON parsing.

## 3. The `/api/ai` route

`app/api/ai/route.ts` exposes all four examples over a single `POST` endpoint, rate-limited to
10 requests/minute per client (in-memory — see the caveat in `rate-limit.ts`).

```bash
# SEO title + description (needs title AND content)
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"action":"meta","title":"My Article","content":"Full article body..."}'

# Summary — streamed back as plain text
curl -N -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"action":"summarize","content":"Full article body..."}'

# Translation
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"action":"translate","content":"Hello world","lang":"fr"}'

# Slug (title goes in "content")
curl -X POST http://localhost:3000/api/ai \
  -H "Content-Type: application/json" \
  -d '{"action":"slug","content":"My New Article Title!"}'
```

| Action | Required fields | Response |
|---|---|---|
| `meta` | `content`, `title` | `{ title, description }` |
| `summarize` | `content` | streamed plain text |
| `translate` | `content`, `lang` (`"fr"` \| `"en"`) | `{ text }` |
| `slug` | `content` (the article title) | `{ slug }` |

Errors are returned as `{ error: string }` with `400` (bad input), `429` (rate limited), or `502`
(the AI provider call failed — e.g. missing/invalid API key).

## 4. Add a new provider

1. `pnpm add @ai-sdk/<provider>` in `frontend/`.
2. In `lib/ai/config.ts`: add the provider's id to the `AIProvider` union and its default model
   to `PROVIDER_DEFAULT_MODELS`.
3. In `lib/ai/providers/index.ts`: import `create<Provider>` and add a `case` to the `switch` in
   `getModel()`. TypeScript will flag the `switch` as non-exhaustive if you forget this step.
4. Document the new provider in the table above and in the root `.env.example`.

## 5. Approximate pricing

Rough per-million-token list prices, for ballpark comparison only — **check each provider's
pricing page for current numbers**, these change often and vary by exact model/context length:

| Provider | Model | Input | Output |
|---|---|---|---|
| OpenAI | gpt-5.6-terra | see [openai.com/api/pricing](https://openai.com/api/pricing) | — |
| Anthropic | claude-sonnet-4-6 | ~$3 | ~$15 |
| Google | gemini-2.0-flash | ~$0.10 | ~$0.40 |
| Mistral | mistral-large-latest | ~$2 | ~$6 |

Gemini Flash and Mistral are the cheaper options for high-volume, low-complexity tasks (slug
generation, short translations); reach for a larger model like GPT-5.6 Terra or Claude Sonnet for
the higher-stakes ones (SEO copy, longer summaries) where output quality matters more than cost.

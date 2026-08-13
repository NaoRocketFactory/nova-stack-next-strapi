import { NextResponse } from "next/server";
import { generateMeta } from "../../../lib/ai/examples/generate-meta";
import { summarizeStream } from "../../../lib/ai/examples/summarize";
import { translate, type TranslateLang } from "../../../lib/ai/examples/translate";
import { generateSlug } from "../../../lib/ai/examples/generate-slug";
import { isRateLimited } from "../../../lib/ai/rate-limit";

type Action = "meta" | "summarize" | "translate" | "slug";

interface AIRequestBody {
  action: Action;
  content: string;
  // Required for "meta" (the article title, in addition to its content).
  title?: string;
  // Required for "translate".
  lang?: TranslateLang;
}

function isAction(value: unknown): value is Action {
  return value === "meta" || value === "summarize" || value === "translate" || value === "slug";
}

function getClientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0]?.trim() || "unknown";
}

/**
 * POST /api/ai — { action, content, title?, lang? }
 *
 * - action "meta"      → { title: string, description: string }   (needs `title` + `content`)
 * - action "summarize" → streamed plain-text response              (needs `content`)
 * - action "translate" → { text: string }                          (needs `content` + `lang`)
 * - action "slug"       → { slug: string }                         (needs `content` = the title)
 */
export async function POST(request: Request) {
  const clientKey = getClientKey(request);
  if (isRateLimited(clientKey)) {
    return NextResponse.json(
      { error: "Too many requests — limit is 10 requests per minute." },
      { status: 429 },
    );
  }

  let body: Partial<AIRequestBody>;
  try {
    body = (await request.json()) as Partial<AIRequestBody>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { action, content, title, lang } = body;

  if (!isAction(action)) {
    return NextResponse.json(
      { error: 'Invalid "action" — expected one of "meta", "summarize", "translate", "slug".' },
      { status: 400 },
    );
  }
  if (typeof content !== "string" || content.trim() === "") {
    return NextResponse.json({ error: '"content" is required.' }, { status: 400 });
  }

  try {
    switch (action) {
      case "meta": {
        if (typeof title !== "string" || title.trim() === "") {
          return NextResponse.json(
            { error: '"title" is required for the "meta" action.' },
            { status: 400 },
          );
        }
        const meta = await generateMeta({ title, content });
        return NextResponse.json(meta);
      }

      case "summarize": {
        const result = summarizeStream(content);
        return result.toTextStreamResponse();
      }

      case "translate": {
        if (lang !== "fr" && lang !== "en") {
          return NextResponse.json(
            { error: '"lang" must be "fr" or "en" for the "translate" action.' },
            { status: 400 },
          );
        }
        const text = await translate(content, lang);
        return NextResponse.json({ text });
      }

      case "slug": {
        const slug = await generateSlug(content);
        return NextResponse.json({ slug });
      }
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown AI error.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

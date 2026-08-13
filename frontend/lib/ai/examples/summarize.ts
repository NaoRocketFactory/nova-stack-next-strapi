import { generateText, streamText } from "ai";
import { getModel } from "../providers";

const SUMMARIZE_SYSTEM =
  "You summarize CMS article content in 2 to 3 sentences. Be factual and neutral, " +
  "preserve the original language of the content, and skip any preamble or markdown.";

/**
 * Summarizes a Strapi article's content into 2-3 sentences.
 */
export async function summarize(content: string): Promise<string> {
  const { text } = await generateText({
    model: getModel(),
    system: SUMMARIZE_SYSTEM,
    prompt: content,
  });
  return text;
}

/**
 * Streaming variant of summarize() — used by app/api/ai/route.ts to stream
 * the summary back to the client as it's generated.
 */
export function summarizeStream(content: string) {
  return streamText({
    model: getModel(),
    system: SUMMARIZE_SYSTEM,
    prompt: content,
  });
}

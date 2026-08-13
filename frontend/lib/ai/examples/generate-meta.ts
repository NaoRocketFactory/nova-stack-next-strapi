import { generateObject } from "ai";
import { z } from "zod";
import { getModel } from "../providers";

export interface ArticleMetaInput {
  title: string;
  content: string;
}

export interface ArticleMetaResult {
  title: string;
  description: string;
}

const articleMetaSchema = z.object({
  title: z.string().max(60).describe("SEO title, under 60 characters"),
  description: z.string().max(160).describe("Meta description, under 160 characters"),
});

/**
 * Generates an SEO-optimized title + meta description from a Strapi
 * article's title and body content.
 */
export async function generateMeta({
  title,
  content,
}: ArticleMetaInput): Promise<ArticleMetaResult> {
  const { object } = await generateObject({
    model: getModel(),
    schema: articleMetaSchema,
    system:
      "You are an SEO copywriter. Write a concise, accurate SEO title and meta " +
      "description for the given article. No clickbait, no emoji, no quotes around the values.",
    prompt: `Article title: ${title}\n\nArticle content:\n${content}`,
  });

  return object;
}

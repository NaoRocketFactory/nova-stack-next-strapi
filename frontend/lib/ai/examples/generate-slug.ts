import { generateObject } from "ai";
import { z } from "zod";
import { getModel } from "../providers";

const slugSchema = z.object({
  slug: z
    .string()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "must be lowercase, hyphen-separated, ASCII only")
    .describe("SEO-friendly URL slug"),
});

/**
 * Generates an SEO-friendly, URL-safe slug from an article title.
 */
export async function generateSlug(title: string): Promise<string> {
  const { object } = await generateObject({
    model: getModel(),
    schema: slugSchema,
    system:
      "You turn article titles into short, SEO-friendly URL slugs: lowercase, ASCII, " +
      "words separated by single hyphens, no stop words when avoidable, no trailing punctuation.",
    prompt: `Title: ${title}`,
  });

  return object.slug;
}

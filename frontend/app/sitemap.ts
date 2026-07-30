import type { MetadataRoute } from "next";
import { fetchCollection } from "../lib/api";
import type { Article } from "../types/strapi";

// Same ISR cadence as the articles pages themselves.
export const revalidate = 3600;

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: APP_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${APP_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
  ];

  let articleRoutes: MetadataRoute.Sitemap = [];
  try {
    // No relations needed for a sitemap entry — skip populate for a lighter fetch.
    const res = await fetchCollection<Article>("articles", { populate: "" });
    articleRoutes = res.data.map((article) => ({
      url: `${APP_URL}/articles/${article.slug}`,
      lastModified: article.updatedAt,
      changeFrequency: "weekly",
      priority: 0.6,
    }));
  } catch {
    // Strapi not reachable — ship the static routes only.
  }

  return [...staticRoutes, ...articleRoutes];
}

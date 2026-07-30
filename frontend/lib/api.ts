import type { StrapiList, StrapiResponse } from "../types/strapi";

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Extended fetch options — standard RequestInit plus a Strapi-specific
 * `populate` field. Defaults to `"*"` (all first-level relations).
 * Pass `""` to disable population entirely.
 */
export interface FetchOptions extends RequestInit {
  populate?: string;
}

function handleApiError(res: Response): never {
  switch (res.status) {
    case 401:
      throw new Error("Unauthorized – check your API token");
    case 403:
      throw new Error(
        "Forbidden – enable public permissions in Strapi Admin → Settings → Roles → Public",
      );
    case 404:
      throw new Error("Not Found – invalid Strapi endpoint");
    case 500:
      throw new Error("Server error – check Strapi logs");
    default:
      throw new Error(`Unexpected error (${res.status})`);
  }
}

/**
 * Base fetch wrapper for Strapi REST API.
 *
 * @param path         - Strapi collection or path (e.g. "articles")
 * @param options      - RequestInit + optional `populate` field
 * @param searchParams - Additional query params (filters, pagination, etc.)
 */
export async function fetchAPI<T = unknown>(
  path: string,
  { populate = "*", ...options }: FetchOptions = {},
  searchParams: Record<string, string> = {},
): Promise<T> {
  const url = new URL(`${API_URL}/api/${path}`);

  if (populate) url.searchParams.set("populate", populate);

  for (const [key, value] of Object.entries(searchParams)) {
    url.searchParams.set(key, value);
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(url.toString(), {
      cache: "no-store",
      signal: controller.signal,
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...(options.headers as Record<string, string>),
      },
    });

    if (!res.ok) handleApiError(res);
    return (await res.json()) as T;
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "AbortError") throw new Error("API request timed out");
      throw error;
    }
    throw new Error("Unknown API error");
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Fetch a collection of entries.
 * @example
 * // All relations (default)
 * const { data } = await fetchCollection<Article>("articles");
 *
 * // Only specific fields
 * const { data } = await fetchCollection<Article>("articles", { populate: "image" });
 *
 * // No populate (faster, no relations)
 * const { data } = await fetchCollection<Article>("articles", { populate: "" });
 */
export async function fetchCollection<T>(
  endpoint: string,
  options: FetchOptions = {},
): Promise<StrapiList<T>> {
  return fetchAPI<StrapiList<T>>(endpoint, options);
}

/**
 * Fetch a single entry by numeric ID.
 * @example
 * const { data } = await fetchSingle<Article>("articles", 3);
 * const { data } = await fetchSingle<Article>("articles", 3, { populate: "image,author" });
 */
export async function fetchSingle<T>(
  endpoint: string,
  id: string | number,
  options: FetchOptions = {},
): Promise<StrapiResponse<T>> {
  return fetchAPI<StrapiResponse<T>>(`${endpoint}/${id}`, options);
}

/**
 * Fetch a single entry by its slug field.
 * Returns null when not found — use with notFound() in page components.
 * @example
 * const article = await fetchBySlug<Article>("articles", "my-slug");
 * const article = await fetchBySlug<Article>("articles", "my-slug", { populate: "image" });
 */
export async function fetchBySlug<T>(
  endpoint: string,
  slug: string,
  options: FetchOptions = {},
): Promise<T | null> {
  const res = await fetchAPI<StrapiList<T>>(endpoint, options, { "filters[slug][$eq]": slug });
  return res.data[0] ?? null;
}

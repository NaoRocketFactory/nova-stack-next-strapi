/**
 * 🌐 Example API helper for Strapi integration.
 * -------------------------------------------------------
 * This file provides a ready-to-use fetch wrapper for
 * connecting your Next.js frontend to a Strapi backend.
 *
 * You can adapt it for your own API routes or models.
 * It's meant as an example to illustrate clean data fetching.
 */

export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

/**
 * Handle common API errors in a consistent way.
 * This makes debugging easier for developers using the starter.
 */
function handleApiError(res: Response) {
  switch (res.status) {
    case 401:
      throw new Error("Unauthorized – check your API token");
    case 404:
      throw new Error("Not Found – invalid Strapi endpoint");
    case 500:
      throw new Error("Server error – check Strapi logs");
    default:
      throw new Error(`Unexpected error (${res.status})`);
  }
}

/**
 * Generic fetch function for Strapi endpoints.
 * Includes:
 *  - Timeout protection (10s)
 *  - Error handling
 *  - Optional Bearer token authorization
 *  - No caching (ideal for dynamic content)
 */
export async function fetchAPI(path: string, options: RequestInit = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const res = await fetch(`${API_URL}/api/${path}?populate=*`, {
      cache: "no-store",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(STRAPI_TOKEN ? { Authorization: `Bearer ${STRAPI_TOKEN}` } : {}),
        ...options.headers,
      },
      ...options,
    });

    if (!res.ok) handleApiError(res);
    return await res.json();
  } catch (error: any) {
    if (error.name === "AbortError") {
      throw new Error("API request timed out");
    }
    throw new Error(error.message || "Unknown API error");
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Example helper to fetch a full collection (e.g., all articles, projects, etc.)
 * @param endpoint - The Strapi collection name
 * @example fetchCollection("articles")
 */
export async function fetchCollection(endpoint: string) {
  return fetchAPI(endpoint);
}

/**
 * Example helper to fetch a single entry by ID.
 * @param endpoint - The Strapi collection name
 * @param id - The entry ID
 * @example fetchSingle("articles", 3)
 */
export async function fetchSingle(endpoint: string, id: string | number) {
  return fetchAPI(`${endpoint}/${id}`);
}

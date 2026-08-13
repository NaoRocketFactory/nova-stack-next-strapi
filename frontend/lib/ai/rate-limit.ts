const WINDOW_MS = 60_000;
const MAX_REQUESTS = 10;

const requestLog = new Map<string, number[]>();

/**
 * Small in-memory fixed-window rate limiter (10 req/min per key) — good
 * enough for a single-instance starter kit deployment. It resets on
 * restart and is not shared across instances; for serverless or
 * multi-instance production deployments, replace with a shared store
 * (e.g. Upstash Redis, Vercel KV).
 */
export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (requestLog.get(key) ?? []).filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    requestLog.set(key, timestamps);
    return true;
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return false;
}

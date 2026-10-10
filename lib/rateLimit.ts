// Simple fixed-window in-memory limiter.
//
// NOTE (serverless): buckets live per runtime instance, so on Vercel/Lambda the
// effective limit is `limit` requests per window *per instance*. For stricter
// global limits, swap this for a platform store (KV / Upstash) keeping the
// same `rateLimit()` signature.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  retryAfterSeconds: number;
};

export type RateLimitOptions = {
  limit?: number;
  windowMs?: number;
  /** Injectable clock for tests. */
  now?: number;
};

export function rateLimit(key: string, options: RateLimitOptions = {}): RateLimitResult {
  const { limit = 5, windowMs = 60_000, now = Date.now() } = options;

  const existing = buckets.get(key);

  if (!existing || existing.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    if (buckets.size > 5_000) {
      for (const [staleKey, bucket] of buckets) {
        if (bucket.resetAt <= now) buckets.delete(staleKey);
      }
    }
    return { ok: true, retryAfterSeconds: Math.ceil(windowMs / 1000) };
  }

  if (existing.count >= limit) {
    return {
      ok: false,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;
  return { ok: true, retryAfterSeconds: Math.ceil((existing.resetAt - now) / 1000) };
}

/** Test helper — clears all buckets. */
export function resetRateLimits(): void {
  buckets.clear();
}

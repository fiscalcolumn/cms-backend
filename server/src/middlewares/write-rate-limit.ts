/**
 * Per-IP limit for public writes. Counters stay in memory on this process.
 * Koa uses the socket address until server.proxy is enabled, so production
 * must trust the proxy or every visitor shares the platform IP.
 */

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

type LimitConfig = {
  name?: string;
  max?: number;
  intervalMs?: number;
};

function pruneExpired(now: number) {
  if (buckets.size < 5000) return;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export default (config: LimitConfig = {}) => {
  const name = config.name || 'write';
  const max = config.max ?? 30;
  const intervalMs = config.intervalMs ?? 60_000;

  return async (ctx, next) => {
    const ip = ctx.request?.ip || ctx.ip || 'unknown';
    const key = `${name}:${ip}`;
    const now = Date.now();
    pruneExpired(now);

    let bucket = buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      bucket = { count: 0, resetAt: now + intervalMs };
      buckets.set(key, bucket);
    }

    bucket.count += 1;
    const remaining = Math.max(max - bucket.count, 0);
    const resetSec = Math.ceil(bucket.resetAt / 1000);
    ctx.set('X-RateLimit-Limit', String(max));
    ctx.set('X-RateLimit-Remaining', String(remaining));
    ctx.set('X-RateLimit-Reset', String(resetSec));

    if (bucket.count > max) {
      ctx.set('Retry-After', String(Math.max(1, Math.ceil((bucket.resetAt - now) / 1000))));
      ctx.status = 429;
      ctx.body = {
        data: null,
        error: {
          status: 429,
          name: 'RateLimitError',
          message: 'Too many requests, please try again later.',
        },
      };
      return;
    }

    await next();
  };
};

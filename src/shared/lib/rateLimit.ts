export interface RateLimiterOptions {
  limit: number;
  windowMs: number;
  now?: () => number;
  maxKeys?: number;
}

interface Window {
  count: number;
  resetAt: number;
}

export const createRateLimiter = ({ limit, windowMs, now = Date.now, maxKeys = 10_000 }: RateLimiterOptions) => {
  const windows = new Map<string, Window>();

  const forgetExpired = (time: number) => {
    for (const [key, window] of windows) if (window.resetAt <= time) windows.delete(key);
  };

  return (key: string) => {
    const time = now();
    if (windows.size >= maxKeys) forgetExpired(time);
    const window = windows.get(key);
    if (!window || window.resetAt <= time) {
      windows.set(key, { count: 1, resetAt: time + windowMs });
      return true;
    }
    window.count += 1;
    return window.count <= limit;
  };
};

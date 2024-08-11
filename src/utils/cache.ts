import NodeCache from "node-cache";

// TTL_MINUTES (15.5 minutes) to avoid "(empty cache) GAP" when the cache is updated every 15.25 minutes
const TTL_MINUTES = 15.5;
export const cache = new NodeCache({ stdTTL: TTL_MINUTES });

export const getFromCache = <T>(key: string): T | null => {
  const value = cache.get<T>(key);
  return value || null;
};

export const setInCache = <T>(key: string, data: T): void => {
  const ttl_minutes = TTL_MINUTES * 60;
  cache.set(key, data, ttl_minutes);
};

export const cacheSize = (): number => {
  return cache.getStats().keys;
};

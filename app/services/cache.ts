import { time, timeouts } from "../constants";

export async function cache<T>(
  kv: KVNamespace,
  value: Promise<T>,
  key: string,
  expireInMinutes = timeouts.cache,
) {
  const cachedValue = await kv.get(key);
  if (cachedValue) {
    console.log("Cache hit for", key);
    return JSON.parse(cachedValue) as T;
  }

  console.log("Cache miss for", key);

  const expirationTtl = time.to.seconds(expireInMinutes);
  const resolvedValue = await value;
  await kv.put(key, JSON.stringify(resolvedValue), { expirationTtl });

  console.log("Cached", key, "for", expirationTtl, "seconds");

  return resolvedValue;
}

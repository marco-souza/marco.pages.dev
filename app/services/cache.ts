import { time } from "../constants";

export async function cache<T>(
  kv: KVNamespace,
  value: Promise<T>,
  key: string,
  expireInMinutes = 1,
) {
  const cachedValue = await kv.get(key);
  if (cachedValue) {
    console.log("Cache hit for", key);
    return JSON.parse(cachedValue) as T;
  }

  console.log("Cache miss for", key);

  const resolvedValue = await value;
  await kv.put(key, JSON.stringify(resolvedValue), {
    expirationTtl: time.to.seconds(time.MINUTE * expireInMinutes),
  });

  console.log("Cached", key, "for", expireInMinutes, "minutes");

  return resolvedValue;
}

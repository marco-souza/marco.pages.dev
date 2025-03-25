import { time } from "../constants";

export async function cache<T>(
  kv: KVNamespace,
  value: Promise<T>,
  key: string,
) {
  const cachedValue = await kv.get(key);
  if (cachedValue) {
    console.log("Cache hit for", key);
    return JSON.parse(cachedValue);
  }

  console.log("Cache miss for", key);

  const resolvedValue = await value;
  await kv.put(key, JSON.stringify(resolvedValue), {
    expirationTtl: time.to.seconds(time.MINUTE * 5),
  });

  console.log("Cached", key);

  return value;
}

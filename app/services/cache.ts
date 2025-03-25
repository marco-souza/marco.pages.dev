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
  await kv.put(key, JSON.stringify(resolvedValue));

  console.log("Cached", key);

  return value;
}

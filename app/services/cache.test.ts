import { beforeEach, expect, test, vi } from "vitest";
import { cache } from "./cache";

const map = new Map<string, string>();

const kvMocked: KVNamespace = {
  // @ts-ignore
  get: vi.fn(
    async (
      key: string,
      options?: Partial<KVNamespaceGetOptions<undefined>>,
    ) => {
      console.log("get", key, options);
      return map.get(key);
    },
  ),
  put: vi.fn(
    async (
      key: string,
      value:
        | string
        | ArrayBuffer
        // biome-ignore lint/suspicious/noExplicitAny: any is required
        | ReadableStream<any>
        | ArrayBufferView<ArrayBufferLike>,
      options?: KVNamespacePutOptions,
    ) => {
      console.log("put", key, value, options);
      map.set(key, value as string);
      return;
    },
  ),
};

beforeEach(() => {
  vi.resetAllMocks();
});

test("cache > should return the same value", async () => {
  const key = "key";
  const value = "value";
  const result = await cache(kvMocked, Promise.resolve(value), key);

  expect(result).toBe(value);

  expect(kvMocked.get).toHaveBeenCalledWith(key);
  expect(kvMocked.put).toHaveBeenCalledWith(key, JSON.stringify(value), {
    expirationTtl: 300,
  });
});

test("cache > should return cached value", async () => {
  const key = "key";
  const value = "value";
  const result = await cache(kvMocked, Promise.resolve(value), key);

  expect(result).toBe(value);

  expect(kvMocked.get).toHaveBeenCalledWith(key);
  expect(kvMocked.put).not.toHaveBeenCalled();
});

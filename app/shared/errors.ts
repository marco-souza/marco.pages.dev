export function raise(
  message = "An error occurred. Please try again later.",
): never {
  throw new Error(message);
}

export async function raiseAsync(
  message = "An error occurred. Please try again later.",
): Promise<never> {
  return raise(message);
}

export function assert(
  condition: unknown,
  message = "Assertion failed",
): asserts condition {
  if (!condition) {
    return raise(message);
  }
}

export function ensure<T>(
  value: T | null | undefined,
  message = "Value is required",
): T {
  if (value == null) {
    return raise(message);
  }
  return value;
}

export async function ensureAsync<T>(
  value: Promise<T | null | undefined>,
  message = "Value is required",
): Promise<T> {
  const v = await value;
  return ensure(v, message);
}

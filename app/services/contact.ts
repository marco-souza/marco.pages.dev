import type { Context } from "hono";
import { cache } from "./cache";

export async function listMessages(c: Context<{ Bindings: Cloudflare.Env }>) {
  const messages = await cache(c.env.CACHE, c.env.EMAIL.list(), "messages");
  return messages;
}

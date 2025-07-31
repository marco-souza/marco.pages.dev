import type { Context } from "hono";
import { cache } from "./cache";

export async function listMusics(c: Context<{ Bindings: Cloudflare.Env }>) {
  const musics = await cache(c.env.CACHE, c.env.PLAYLIST.list(), "musics");
  return musics;
}

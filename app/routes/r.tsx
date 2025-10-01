import { Hono } from "hono";
import { configs } from "../constants";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/gh/:repo?", async (c) => {
  const repo = `/${c.req.param("repo") ?? ""}`;
  console.log({ repo });

  return c.redirect(configs.social.github + repo);
});

app.get("/linkedin", async (c) => {
  return c.redirect(configs.social.linkedin);
});

export default app;

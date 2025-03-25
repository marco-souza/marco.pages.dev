import { getCookie, setCookie } from "hono/cookie";
import { github } from "@/services/github";
import { GitHubProfileView } from "@/components/GitHubProfile";
import { cache } from "@/services/cache";
import { Hono } from "hono";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.post("/", async (c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "";
  const counterNum = Number.parseFloat(counter) || 0;
  setCookie(c, "counter", String(counterNum + 1));

  return c.redirect("/");
});

app.get("/", async (c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "0";
  // TODO: cache profile
  const profile = await cache(
    c.env.CACHE,
    github.fetchProfile(),
    "github-profile",
  );

  return c.render(
    <>
      <GitHubProfileView profile={profile} />
      <button
        type="button"
        class="btn btn-ghost flex mx-auto"
        hx-post="/"
        hx-trigger="click"
        hx-target="body"
        hx-swap="outerHTML"
      >
        Clicked {counter} times
      </button>
    </>,
  );
});

export default app;

import { getCookie, setCookie } from "hono/cookie";
import { createRoute } from "honox/factory";
import { github } from "@/services/github";
import { GitHubProfileView } from "@/components/GitHubProfile";

export const POST = createRoute(async (c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "";
  const counterNum = Number.parseFloat(counter) || 0;
  setCookie(c, "counter", String(counterNum + 1));

  return c.redirect("/");
});

export default createRoute(async (c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "0";
  // TODO: cache profile
  const profile = await github.fetchProfile();

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

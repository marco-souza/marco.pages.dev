import { getCookie, setCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

export const POST = createRoute(async (c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "";
  const counterNum = Number.parseFloat(counter) || 0;
  setCookie(c, "counter", String(counterNum + 1));

  return c.redirect("/");
});

export default createRoute((c) => {
  const counter = getCookie(c, "counter")?.toString() ?? "0";
  return c.render(
    <div>
      <h1 class="text-3xl font-bold underline">Hello world 🚀!</h1>

      <button
        type="button"
        class="btn btn-outline"
        hx-post="/"
        hx-trigger="click"
        hx-target="body"
        hx-swap="outerHTML"
      >
        Button clicked {counter} times
      </button>
    </div>,
  );
});

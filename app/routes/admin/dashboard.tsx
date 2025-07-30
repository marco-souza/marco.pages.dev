import { getCookie, setCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

export const POST = createRoute(async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>();
  setCookie(c, "name", name);
  return c.redirect("/about");
});

export default createRoute((c) => {
  const name = getCookie(c, "name") ?? "no name";

  return c.render(
    <div class="mx-auto justify-center w-xs">
      <h1 class="text-2xl">Hello, {name ?? "people"}!</h1>
      <form method="post">
        <fieldset class="fieldset bg-base-200 border border-base-300 p-4 rounded-box">
          <legend class="fieldset-legend">Name</legend>
          <div class="join">
            <input
              type="text"
              name="name"
              class="input join-item"
              placeholder="Your name"
              value={name}
              autofocus
            />
            <button type="submit" class="btn join-item">
              save
            </button>
          </div>
        </fieldset>
      </form>
    </div>,
  );
});

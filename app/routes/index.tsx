import { createRoute } from "honox/factory";

export default createRoute((c) => {
  return c.render(
    <div>
      <h1 class="text-3xl font-bold underline">Hello world 🚀!</h1>
    </div>,
  );
});

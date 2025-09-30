import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import { LoginPage } from "@/components/LoginPage";
import { configs } from "@/constants";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/", async (c) => {
  const accessToken = getCookie(c, configs.auth.keys.authToken);
  const refreshToken = getCookie(c, configs.auth.keys.refreshToken);

  if (accessToken || refreshToken) {
    console.warn("user already logged in", { accessToken, refreshToken });
    return c.redirect(configs.navigation.private.dashboard);
  }

  const errors = c.req.query("errors") ?? "";
  return c.render(<LoginPage errors={errors} />);
});

export default app;

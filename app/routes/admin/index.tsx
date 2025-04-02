import { Hono } from "hono";
import { LoginPage } from "@/components/LoginPage";
import { configs } from "@/constants";
import { auth, logout, setAuthCookies } from "@/services/auth";
import { raise } from "@/shared/errors";
import { getCookie } from "hono/cookie";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

function removePrefix(url: string, prefix = "/admin") {
  return url.replace(prefix, "");
}

const relativeUrls = {
  signIn: removePrefix(configs.navigation.auth.signIn),
  callback: removePrefix(configs.navigation.auth.callback),
  refresh: removePrefix(configs.navigation.auth.refresh),
  signOut: removePrefix(configs.navigation.auth.signOut),
};

app.get("/", async (c) => {
  const error = c.req.query("error");
  const errors = error ? "Authentication failed" : "";

  return c.render(<LoginPage errors={errors} />);
});

app.get(relativeUrls.signIn, async (c) => {
  const reqUrl = new URL(c.req.url);
  const authUrl = auth.generateAuthUrl(reqUrl.origin);

  console.log("GitHub Auth URL", { authUrl });

  return c.redirect(authUrl);
});

app.get(relativeUrls.callback, async (c) => {
  const reqUrl = new URL(c.req.url);
  const code = reqUrl.searchParams.get("code") ?? raise("Missing code");

  const token = await auth.fetchAccessToken(code);
  console.log("User logged", { token });

  setAuthCookies(c, token);

  return c.redirect(configs.navigation.private.dashboard);
});

app.get(relativeUrls.refresh, async (c) => {
  const refreshToken = getCookie(c, configs.auth.keys.refreshToken);
  if (!refreshToken) {
    return c.redirect(
      `${auth.urls.signOut}?errors=Invalid refresh token, please login again`,
    );
  }

  try {
    const token = await auth.refreshAccessToken(refreshToken);

    setAuthCookies(c, token);

    console.log("Auth token refreshed", { token });
    return c.redirect(configs.navigation.private.dashboard);
  } catch (error) {
    console.error("Error refreshing auth token", { error });
    return c.redirect(
      `${auth.urls.signOut}?errors=Invalid refresh token, please login again`,
    );
  }
});

app.get(relativeUrls.signOut, async (c) => {
  logout(c);

  const url = new URL(c.req.url);
  const redirectUrl = new URL("/admin", url.origin);

  const errors = url.searchParams.get("errors");
  if (errors) redirectUrl.searchParams.set("errors", errors);

  return c.redirect(redirectUrl.toString());
});

export default app;

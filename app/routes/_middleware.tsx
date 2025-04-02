import { configs } from "@/constants";
import { getCookie } from "hono/cookie";
import { createRoute } from "honox/factory";

const middleware = createRoute(async (c, next) => {
  const isPrivateRoute = Object.entries(configs.navigation.private)
    .map(([key, route]) => route)
    .find((route) => c.req.path.startsWith(route));

  if (!isPrivateRoute) {
    return next();
  }

  const authToken = getCookie(c, configs.auth.keys.authToken);
  if (authToken) {
    return next();
  }

  const refreshToken = getCookie(c, configs.auth.keys.refreshToken);
  const refreshUrl = configs.navigation.auth.refresh;

  if (refreshToken && c.req.path !== refreshUrl) {
    return c.redirect(refreshUrl);
  }

  return c.redirect(
    `${configs.navigation.login}?errors=This is private, please login and try again`,
  );
});

export default middleware;

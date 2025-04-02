import { configs } from "@/constants";
import { getCookie } from "hono/cookie";
import { createMiddleware } from "hono/factory";
import { logger } from "hono/logger";
import { secureHeaders } from "hono/secure-headers";
import { createRoute } from "honox/factory";

const authMiddleware = () =>
  createMiddleware(async (c, next) => {
    const isPrivateRoute = Object.values(configs.navigation.private).find(
      (route) => c.req.path.startsWith(route),
    );

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

export default createRoute(
  // logger middleware
  logger(),
  // security headers middleware
  secureHeaders(),
  // auth middleware
  authMiddleware(),
  // other middlewares can be added here
  // ...
);

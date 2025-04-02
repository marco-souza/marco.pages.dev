import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link } from "honox/server";
import { Layout } from "@/components/Layout";
import { getThemeCookie } from "@/shared/theme";
import { getCookie } from "hono/cookie";
import { Meta } from "@/components/Meta";
import { configs } from "../constants";

export default jsxRenderer(({ children }) => {
  const ctx = useRequestContext();
  const theme = getThemeCookie(ctx);
  const isAuthenticated = Boolean(
    getCookie(ctx, configs.auth.keys.authToken) ||
      getCookie(ctx, configs.auth.keys.refreshToken),
  );

  const isPartial = ctx.req.query("partial") === "true";
  if (isPartial) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <head>
        <Meta />

        {/* favicon */}
        <Link rel="icon" href={configs.site.images.icon} type="image/x-icon" />

        {/* styles */}
        <Link href="/app/styles.css" rel="stylesheet" />
      </head>

      <Layout
        theme={theme}
        title="Hello World 🌎"
        navbar={{ theme, isAuthenticated }}
      >
        {children}
      </Layout>

      <script src="/static/js/htmx.min.js" />
    </html>
  );
});

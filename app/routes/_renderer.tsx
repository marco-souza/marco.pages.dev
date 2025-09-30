import { getCookie } from "hono/cookie";
import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import { Link } from "honox/server";
import { z } from "zod";
import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { configs } from "../constants";

export default jsxRenderer(({ children, title }) => {
  const ctx = useRequestContext();
  const isAuthenticated = Boolean(
    getCookie(ctx, configs.auth.keys.authToken) ||
      getCookie(ctx, configs.auth.keys.refreshToken),
  );

  const isPartial = z
    .string()
    .default("false")
    .transform((val) => val === "true")
    .parse(ctx.req.query("partial"));

  if (isPartial) {
    return <>{children}</>;
  }

  return (
    <html lang="en">
      <head>
        <Meta title={title} />

        {/* favicon */}
        <Link rel="icon" href={configs.site.images.icon} type="image/x-icon" />

        {/* styles */}
        <Link href="/app/styles.css" rel="stylesheet" />
      </head>

      <Layout navbar={{ isAuthenticated }}>{children}</Layout>

      <script src="/static/js/htmx.min.js" />
    </html>
  );
});

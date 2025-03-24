import { jsxRenderer } from "hono/jsx-renderer";
import { Link, Script } from "honox/server";
import { configs } from "@/constants";

const { title } = configs.site;

export default jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />

        {title ? <title>{title}</title> : <></>}

        <Link href="/app/styles.css" rel="stylesheet" />
        <script src="/static/js/htmx.min.js" />

        <Link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body>{children}</body>
    </html>
  );
});

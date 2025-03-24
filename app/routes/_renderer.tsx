import { jsxRenderer } from "hono/jsx-renderer";
import { Link } from "honox/server";
import { configs } from "@/constants";

const { title } = configs.site;

export default jsxRenderer(({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {title ? <title>{title}</title> : <></>}

        <Link href="/app/styles.css" rel="stylesheet" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </head>

      <body>{children}</body>
    </html>
  );
});

import pages from "@hono/vite-cloudflare-pages";
import adapter from "@hono/vite-dev-server/cloudflare";
import tailwindcss from "@tailwindcss/vite";
import honox from "honox/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig((c) => {
  console.log(c);
  return {
    plugins: [
      tsconfigPaths(),
      honox({
        client: {
          input: ["/app/styles.css"],
        },
        devServer: { adapter },
      }),
      pages(),
      tailwindcss(),
    ],
  };
});

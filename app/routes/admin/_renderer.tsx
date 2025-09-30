import { jsxRenderer, useRequestContext } from "hono/jsx-renderer";
import z from "zod";
import { listMessages } from "@/services/contact";
import { listMusics } from "@/services/music";

export default jsxRenderer(async ({ children, Layout }) => {
  const ctx = useRequestContext();

  const isPartial = z
    .string()
    .default("false")
    .transform((val) => val === "true")
    .parse(ctx.req.query("partial"));

  if (isPartial) {
    return <>{children}</>;
  }

  const messages = await listMessages(ctx);
  const musics = await listMusics(ctx);

  const menuItems = [
    { name: "Overview", href: "/admin/dashboard", count: null },
    { name: "Playlist", href: "/admin/playlist", count: musics.keys.length },
    { name: "Contacts", href: "/admin/contact", count: messages.keys.length },
  ];

  return (
    <Layout>
      <div class="flex gap-16">
        <div id="adm-sidebar" class="flex flex-col gap-4 p-4 mt-24">
          {/* Sidebar content here */}
          {menuItems.map((item) => (
            <a href={item.href} class="link">
              <p>
                {item.name}
                {item.count !== null && (
                  <span class="badge badge-xs badge-ghost ml-2">
                    {item.count}
                  </span>
                )}
              </p>
            </a>
          ))}
        </div>

        <div id="adm-body" class="p-4 min-h-96 flex-1">
          {/* Page content here */}
          <h1 class="text-3xl font-bold mb-4">Admin Dashboard 🎉</h1>
          <p>Welcome to the admin dashboard!</p>

          <div id="adm-content" class="card shadow-md p-4 mt-8">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
});

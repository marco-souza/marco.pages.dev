import { Hono } from "hono";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/", async (c) => {
  // Placeholder for fetching data from Cloudflare KV
  c.env;
  const playlistCount = 0; // Replace with actual KV fetch
  const contactedByCount = 0; // Replace with actual KV fetch

  const menuItems = [
    { name: "Overview", href: "/admin", count: null },
    { name: "Playlist", href: "/admin/playlist", count: playlistCount },
    { name: "Contacts", href: "/admin/contact", count: contactedByCount },
  ];

  return c.render(
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
          Your content will go here
        </div>
      </div>
    </div>,
  );
});

export default app;

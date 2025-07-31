import { type Context, Hono } from "hono";
import { invalidate } from "@/services/cache";
import { listMusics } from "@/services/music";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/", async (c: Context<{ Bindings: Cloudflare.Env }>) => {
  const musics = await listMusics(c);
  return c.render(<ListMusics musics={musics} />);
});

app.delete("/:key{.+}", async (c: Context<{ Bindings: Cloudflare.Env }>) => {
  const key = c.req.param("key");

  await c.env.PLAYLIST.delete(key);
  await invalidate(c.env.CACHE, "musics");

  const musics = await listMusics(c);
  return c.render(<ListMusics musics={musics} />);
});

export default app;

function MusicCard({ name }: { name: string }) {
  return (
    <div class="relative">
      <button
        className="btn btn-circle btn-error mb-2 top-4 right-8 absolute"
        type="button"
        hx-delete={`/admin/playlist/${encodeURIComponent(name)}?partial=true`}
        hx-target="#list-musics"
      >
        🗑
      </button>

      <iframe title={name} src={parseYoutubeLink(name)} />
    </div>
  );
}

function ListMusics({
  musics,
}: {
  musics: Awaited<ReturnType<typeof listMusics>>;
}) {
  return (
    <div
      id="list-musics"
      className="flex gap-4 text-center justify-center justify-items-center"
    >
      {musics.keys.length > 0 ? (
        musics.keys.map((music) => (
          <MusicCard key={music.name} name={music.name} />
        ))
      ) : (
        <p className="text-gray-500">
          No music found. Please add some music to the playlist.
        </p>
      )}
    </div>
  );
}

// parse youtube link to embed link
function parseYoutubeLink(link: string): string {
  const regex =
    /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/)?([^&\n]{11})/;
  const match = link.match(regex);

  if (match?.at(5)) {
    return `https://www.youtube.com/embed/${match[5]}`;
  }

  return link; // return original link if it doesn't match
}

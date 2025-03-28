import { Hono } from "hono";
import { z } from "zod";
import { MusicForm, MusicFormSuccess } from "#/app/components/MusicForm";
import { getCookie, setCookie } from "hono/cookie";
import { time } from "#/app/constants";
import type { TrackDownloadDTO } from "#/app/domain/dto/track";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

const YOUTUBE_URL_REGEX =
  /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;

const MusicDataValidator = z.object({
  youtubeUrl: z
    .string()
    .url("Invalid URL")
    .regex(YOUTUBE_URL_REGEX, "Invalid YouTube URL"),
});

// receive YouTube URL
app.post("/", async (c) => {
  const body = await c.req.parseBody();
  const data = MusicDataValidator.safeParse(body);

  // get a list of added songs from cookies
  const addedSongs = getCookie(c, "addedSongs");
  const addedSongsList: string[] = addedSongs ? JSON.parse(addedSongs) : [];

  if (!data.success) {
    const errors = {
      youtubeUrl:
        data.error.errors.find((err) => err.path.includes("youtubeUrl"))
          ?.message || "",
    };

    return c.render(
      <MusicForm
        values={body}
        errors={errors}
        addedSongsList={addedSongsList}
      />,
    );
  }

  // add the song if not included
  if (addedSongsList.includes(data.data.youtubeUrl)) {
    return c.render(
      <MusicForm
        values={body}
        errors={{ youtubeUrl: "This song is already in the queue" }}
        addedSongsList={addedSongsList}
      />,
    );
  }

  // Add YouTube URL to download queue
  const trackToDownload: TrackDownloadDTO = {
    youtubeUrl: data.data.youtubeUrl,
    status: "pending",
  };

  // add the song to the download queue
  await c.env.PLAYLIST.put(
    data.data.youtubeUrl,
    JSON.stringify(trackToDownload),
  );

  // add the song if not included
  addedSongsList.push(data.data.youtubeUrl);

  // persist on the cookie
  setCookie(c, "addedSongs", JSON.stringify(addedSongsList), {
    httpOnly: true,
    maxAge: 400 * time.to.seconds(time.DAY), // max 400 days
    secure: true,
    sameSite: "lax",
  });

  return c.redirect("/music/success");
});

app.get("/", async (c) => {
  const values = {};
  const errors = {};

  // get a list of added songs from cookies
  const addedSongs = getCookie(c, "addedSongs");
  const addedSongsList: string[] = addedSongs ? JSON.parse(addedSongs) : [];

  return c.render(
    <MusicForm
      values={values}
      errors={errors}
      addedSongsList={addedSongsList}
    />,
  );
});

app.get("/success", async (c) => {
  const message = "Track added to the download queue!";
  return c.render(<MusicFormSuccess message={message} />);
});

export default app;

import type { FC } from "hono/jsx";
import { configs } from "../constants";

interface MusicFormProps {
  errors: {
    youtubeUrl?: string;
  };
  values: {
    youtubeUrl?: string;
  };
  addedSongsList: string[];
}

export const MusicForm: FC<MusicFormProps> = ({
  errors,
  values,
  addedSongsList,
}) => {
  const addedSongsEmbedableList = addedSongsList.map((song) => {
    return song.replace("/watch?v=", "/embed/");
  });

  return (
    <div class="max-w-lg mx-auto mt-10 p-6 rounded-lg shadow-md grid gap-4">
      <div>
        <h1 class="text-3xl font-bold text-center">
          Add a Track to my DJ Playlist 🎶
        </h1>

        <p class="text-center text-gray-500">
          Found a great track on YouTube? Add it to Marco's playlist!
        </p>
      </div>

      <form method="post">
        <div class="mb-4">
          <label htmlFor="youtubeUrl" class="block text-sm font-medium">
            YouTube URL
          </label>
          <input
            id="youtubeUrl"
            name="youtubeUrl"
            type="url"
            value={values.youtubeUrl}
            class={`input input-bordered w-full ${errors.youtubeUrl ? "input-error" : ""}`}
            placeholder="YouTube URL"
          />
          {errors.youtubeUrl && (
            <p class="text-red-500 text-xs mt-1">{errors.youtubeUrl}</p>
          )}
        </div>

        <button type="submit" class="btn btn-primary w-full">
          Add to Marco's DJ Playlist 🎧
        </button>
      </form>

      {addedSongsEmbedableList.length > 0 && (
        <div class="mt-6 grid gap-4">
          <h2 class="text-xl font-bold text-center mb-2">
            Songs you added to the playlist:
          </h2>
          <div class="flex flex-wrap justify-center gap-4">
            {addedSongsEmbedableList.map((song) => (
              <iframe
                key={song}
                src={song}
                width="200"
                height="113"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

interface SuccessFormProps {
  message: string;
}

export const MusicFormSuccess: FC<SuccessFormProps> = ({ message }) => {
  return (
    <div class="max-w-md mx-auto mt-10 p-6 bg-green-100 rounded-lg ">
      <h2 class="text-2xl font-bold text-center mb-4 text-green-800">
        Track Added! 🎉
      </h2>
      <p class="text-center text-green-700">{message}</p>
      <div class="flex justify-center mt-4">
        <a href={configs.navigation.music} class="btn btn-outline btn-success">
          Go to Playlist
        </a>
      </div>
    </div>
  );
};

import type { FC } from "hono/jsx";
import type { GitHubProfile } from "@/services/github";
import { configs } from "@/constants";

type Props = {
  profile: GitHubProfile;
  sidebar?: boolean;
};

export const GitHubProfileCard: FC<Props> = ({ profile, sidebar = false }) => (
  <>
    <div class={`gap-2 flex flex-col ${sidebar && "sm:mt-8"}`}>
      <img
        alt="It's Me"
        src={profile.avatar_url}
        class="h-40 mx-auto rounded-full"
      />

      <div class="text-3xl font-light">{profile.name}</div>
    </div>

    <p
      class={`opacity-70 font-extralight text-md px-8 ${!sidebar && "sm:px-16"}`}
      // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{ __html: parseBioText(profile.bio) }}
    />
  </>
);

export const GitHubProfileView: FC<Props> = ({ profile }) => {
  return (
    <div class="max-w-2xl mx-auto">
      <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center">
        <GitHubProfileCard profile={profile} />

        <div class="actions grid 2xl:grid-cols-2 gap-8 w-full md:grid-cols-2">
          <a
            href={configs.contact_me}
            class="btn btn-outline text-pink-400 hover:text-white hover:bg-pink-400 hover:animate-zoom-in"
          >
            Let's grab a Coffee ☕️
          </a>
          <a href="/resume" class="btn btn-outline hover:animate-zoom-in">
            Check my Resume 💼
          </a>
        </div>
      </div>
    </div>
  );
};

export const GitHubProfileViewSkeleton = () => (
  <GitHubProfileView
    profile={{ bio: "", name: "", login: "", avatar_url: "" }}
  />
);

export function parseBioText(text: string | undefined): string {
  if (text == null) return "";

  const tagRegex = /\@(\w*)/g;
  const linksMap: Map<string, string> = new Map(Object.entries(configs.links));

  const result = text.replace(tagRegex, (originalText, name: string) => {
    const link = linksMap.get(name);

    if (link) {
      return `<a class="text-pink-900 dark:text-pink-200 hover:text-pink-400 underline" target="blank" href="${link}">${originalText}</a>`;
    }
    return originalText;
  });

  return result;
}

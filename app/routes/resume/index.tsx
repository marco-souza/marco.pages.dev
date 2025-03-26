import { GitHubProfileCard } from "@/components/GitHubProfile";
import { configs } from "@/constants";
import { type GitHubProfile, github } from "@/services/github";
import { Hono } from "hono";
import { cache } from "#/app/services/cache";

const app = new Hono<{ Bindings: Cloudflare.Env }>();

app.get("/", async (c) => {
  const profile = await cache(
    c.env.CACHE,
    github.fetchProfile(),
    "github-profile",
  );
  return c.render(<ResumePage profile={profile} />);
});

app.get("/content", async (c) => {
  const content = await cache(
    c.env.CACHE,
    github.fetchResume(),
    "github-resume",
  );

  // TODO: parse markdown

  return c.render(
    <div class="markdown-body card shadow-md full-printer-page w-full">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation> */}
      <div class="card-body" dangerouslySetInnerHTML={{ __html: content }} />
    </div>,
  );
});

export default app;

type Props = {
  profile: GitHubProfile;
};

const ProfileSideBar = ({ profile }: Props) => (
  <div class="mx-auto w-full skip-printer">
    <div class="flex flex-col gap-10 my-8 xl:my-16 2xl:my-32 items-center text-center sticky top-0">
      <GitHubProfileCard profile={profile} />

      <div class="actions grid 2xl:grid-cols-2 gap-8 w-full">
        <a
          href={configs.contact_me}
          class="btn btn-outline btn-secondary hover:text-white hover:animate-pulse"
        >
          Let's grab a Coffee ☕️
        </a>

        <button
          type="button"
          href={configs.contact_me}
          class="btn btn-outline hover:animate-pulse"
          onClick={() => globalThis.print()}
        >
          Print Resume 🖨️
        </button>
      </div>
    </div>
  </div>
);

function ResumePage({ profile }: Props) {
  return (
    <div class="grid md:grid-cols-3 gap-4">
      <ProfileSideBar profile={profile} />

      <div class="gap-8 grid w-full md:col-span-2">
        <div hx-get="content" hx-trigger="load" hx-swap="outerHTML">
          <img
            alt="Result loading..."
            class="mx-auto"
            width="64"
            src="/images/bars.svg"
          />
        </div>
      </div>
    </div>
  );
}

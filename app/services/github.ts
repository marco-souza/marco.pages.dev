import { z } from "zod";
import { configs } from "@/constants";
// import { markdownToHTML } from "@/services/markdown";

const GitHubProfileSchema = z.object({
  bio: z.string(),
  name: z.string(),
  login: z.string(),
  avatar_url: z.string(),
});

export const GitHubAuthenticatedProfileSchema = GitHubProfileSchema.extend({
  email: z.string(),
});

export type GitHubProfile = z.infer<typeof GitHubProfileSchema>;
export type GitHubAuthenticatedProfile = z.infer<
  typeof GitHubAuthenticatedProfileSchema
>;

class GitHub {
  constructor(private username = configs.username) {}

  async fetchAuthenticatedProfile(token: string) {
    assert(token.trim().length > 0, "Missing token");

    const resp = await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `token ${token}`,
      },
    });

    const body = await resp.json();
    const profile = GitHubAuthenticatedProfileSchema.parse(body);

    return profile;
  }

  async fetchProfile() {
    // fetch
    const resp = await fetch(`https://api.github.com/users/${this.username}`);
    const body = await resp.json();

    // parse
    return GitHubProfileSchema.parse(body);
  }

  async fetchResume() {
    // fetch
    const resp = await fetch(configs.github.resume);
    const body = await resp.text();

    // TODO: parse
    // return markdownToHTML(body);
    return body;
  }
}

export const github = new GitHub();

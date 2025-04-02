import { z } from "zod";
import type { Context } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { GitHubAuth, type AccessToken } from "@m3o/auth";

import { configs } from "@/constants";

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

export type AuthenticatedContext = {
  auth_token: string;
  refresh_token: string;
  profile: GitHubAuthenticatedProfile;
};

export function logout(ctx: Context) {
  deleteCookie(ctx, configs.auth.keys.authToken);
  deleteCookie(ctx, configs.auth.keys.refreshToken);
}

export function setAuthCookies(ctx: Context, token: AccessToken) {
  setCookie(ctx, configs.auth.keys.authToken, token.access_token, {
    maxAge: token.expires_in,
  });

  setCookie(ctx, configs.auth.keys.refreshToken, token.refresh_token, {
    maxAge: token.refresh_token_expires_in,
  });
}

function removePrefix(url: string, prefix = "/admin") {
  return url.replace(prefix, "");
}

export const relativeUrls = {
  signIn: removePrefix(configs.navigation.auth.signIn),
  callback: removePrefix(configs.navigation.auth.callback),
  refresh: removePrefix(configs.navigation.auth.refresh),
  signOut: removePrefix(configs.navigation.auth.signOut),
};

// init auth module

export const auth = new GitHubAuth({
  scope: z.string().parse(process.env.GITHUB_SCOPE),
  client_id: z.string().parse(process.env.GITHUB_CLIENT_ID),
  client_secret: z.string().parse(process.env.GITHUB_CLIENT_SECRET),
});

auth.setUrls(configs.navigation.auth);

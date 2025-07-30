import GithubIcon from "@/components/icons/GitHubIcon";
import { configs } from "@/constants";

export function LoginPage({ errors = "" }) {
  const githubButton = (
    <div class="flex items-center gap-2">
      <GithubIcon />
      <span>Sign in with GitHub</span>
    </div>
  );

  return (
    <div class="card shadow-md max-w-96 mx-auto">
      <div class="card-body gap-8">
        <div className="header text-center">
          <h1 class="text-3xl">
            Sign in to <span class="text-primary">Marco's lab</span>
          </h1>

          <h2 class="text-sm font-light">
            Welcome back! Please sign in to continue
          </h2>
        </div>

        <form
          class="grid gap-4"
          action={configs.navigation.auth.signIn}
          hx-boost="false"
        >
          <button class="btn btn-outline btn-primary w-full" type="submit">
            {githubButton}
          </button>

          {errors && (
            <div role="alert" class="alert alert-error alert-soft">
              <span>{errors}</span>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

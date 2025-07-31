
# Project Handover Document: Marco's Personal Site

This document provides a comprehensive overview of "Marco's Personal Site" project, designed to facilitate a smooth handover to new developers. It covers the project's purpose, technology stack, development workflow, key scripts, and other essential information.

## 1. Project Overview

**Project Name:** Marco's ~overengineered~ Personal Site
**Purpose:** A personal website hosted on Cloudflare Pages, showcasing a modern development stack and unconventional UI approach.
**Repository:** https://github.com/marco-souza/marco.pages.dev.git

## 2. Technology Stack

This project leverages a modern and efficient set of technologies:

- **Frontend Framework:** [Honox](https://honox.dev/) ([Hono](https://hono.dev/) + JSX) with [HTMX](https://htmx.org/) for dynamic UI.
- **Build Tool:** [Vite](https://vitejs.dev/) ⚡ for fast builds and hot module replacement.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 🎨 for utility-first styling with [DaisyUI](https://daisyui.com/).
- **Serverless Platform:** [Cloudflare Pages](https://pages.cloudflare.com/) 🌐 for hosting.
- **Backend/Edge Functions:** [Cloudflare Workers](https://developers.cloudflare.com/workers/) managed by [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 🛠️.
- **Language:** [TypeScript](https://www.typescriptlang.org/) 🦾 for type safety and enhanced developer experience.
- **Validation:** [Zod](https://zod.dev/) for schema validation.
- **Authentication:** [@m3o/auth](https://jsr.io/@m3o/auth) for M3O authentication.

## 3. Development Environment Setup

To set up the development environment, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/marco-souza/marco.pages.dev.git
    cd marco.pages.dev
    ```
2.  **Install dependencies:** This project uses `bun` as the package manager.
    ```bash
    bun install
    ```
    This command will also run `lefthook install` (for Git hooks) and `wrangler types` (to generate types for Wrangler).

## 4. Key Scripts and Commands

The `package.json` includes several scripts for various development tasks:

-   **`bun run dev`**: Starts the local development server with Vite, enabling hot-reloading. This is your primary command for local development.
-   **`bun run tests`**: Runs unit tests using Vitest.
-   **`bun run build`**: Builds the site for production. This creates client-side assets and the Cloudflare Worker script.
-   **`bun run e2e`**: Executes end-to-end tests using Playwright.
-   **`bun run fmt`**: Formats the codebase using Biome. It includes `--fix` to automatically correct formatting issues.
-   **`bun run lint`**: Lints the codebase using Biome and attempts to fix issues with `--fix --unsafe`.
-   **`bun run encrypt`**: Encrypts the `.env` file using GPG.
-   **`bun run decrypt`**: Decrypts the `.env.gpg` file back to `.env` and then runs `w:typegen`.
-   **`bun run postinstall`**: Runs after `bun install`, setting up `lefthook` and generating Wrangler types.
-   **`bun run w`**: Alias for `wrangler` commands.
-   **`bun run w:secret`**: Manages secrets for Cloudflare Pages (e.g., `bun run w:secret put MY_SECRET`).
-   **`bun run w:typegen`**: Generates TypeScript types for Wrangler bindings based on your `.env` file. It copies `.env` to `.dev.vars` if `.env` exists.
-   **`bun run preview`**: Previews the site locally using Wrangler, simulating the Cloudflare Pages environment.
-   **`bun run deploy`**: Builds the project and deploys it to Cloudflare Pages.

## 5. Project Structure

-   **`app/`**: Contains the main application logic, including client-side code (`client.ts`), server-side code (`server.ts`), constants (`constants.ts`), and global styles (`styles.css`).
-   **`public/`**: Static assets like `favicon.ico`.
-   **`e2e/`**: End-to-end tests using Playwright.
-   **`tests/`**: Unit tests using Vitest.
-   **`wrangler.toml`**: Cloudflare Wrangler configuration file.
-   **`vite.config.ts`**: Vite build configuration.
-   **`vitest.config.ts`**: Vitest test configuration.
-   **`playwright.config.ts`**: Playwright configuration.
-   **`biome.json`**: Biome formatter and linter configuration.
-   **`lefthook.yml`**: Git hooks configuration (e.g., pre-commit, pre-push).
-   **`tsconfig.json`**: TypeScript configuration.
-   **`.env` / `.env.gpg`**: Environment variables (encrypted version for secrets).

## 6. Important Considerations

-   **Unconventional UI**: The project uses a combination of JSX and HTMX. Familiarity with HTMX concepts (e.g., `hx-get`, `hx-post`, `hx-swap`) is crucial for understanding how dynamic UI elements are handled without a traditional SPA framework.
-   **Cloudflare Pages & Workers**: The site is deployed to Cloudflare Pages, which uses Cloudflare Workers for server-side logic and API routes. Understanding Wrangler commands and the Cloudflare ecosystem is beneficial.
-   **Environment Variables**: Sensitive information is managed via `.env` and encrypted with GPG (`.env.gpg`). Ensure you understand the `encrypt` and `decrypt` scripts for handling these files securely.
-   **Code Quality**: Biome is strictly enforced for formatting and linting. Ensure your editor is set up to work with Biome, or regularly run `bun run fmt` and `bun run lint`.
-   **Testing**: Comprehensive testing is in place with Vitest for unit tests and Playwright for E2E tests. New features should be accompanied by appropriate tests.

## 7. Next Steps for New Developers

1.  Review the `README.md` for a quick overview.
2.  Set up your development environment using the "Installation" steps.
3.  Familiarize yourself with the "Key Scripts and Commands."
4.  Explore the `app/` directory to understand the core application logic.
5.  Pay close attention to how HTMX is used in conjunction with JSX for UI interactions.
6.  Understand the Cloudflare Pages and Workers deployment model by reviewing `wrangler.toml` and relevant `wrangler` commands.

This handover document should provide a solid foundation for any new developer joining the project.


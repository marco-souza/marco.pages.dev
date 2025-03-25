# Marco's ~overengineered~ Personal Site

Welcome to the repository for my ~overengineered~ overengineered personal site, hosted on Cloudflare Pages. This project is built using a modern development stack to ensure a seamless and efficient development and deployment experience.

## Features 🚀

- **Modern Development Stack**: Built with [Vite](https://vitejs.dev/) ⚡ for fast builds and hot module replacement, [Tailwind CSS](https://tailwindcss.com/) 🎨 for utility-first styling, and [Wrangler](https://developers.cloudflare.com/workers/wrangler/) 🛠️ for managing Cloudflare Workers.
- **Seamless Deployment**: Deploy the site to [Cloudflare Pages](https://pages.cloudflare.com/) effortlessly with a single command. 🌐
- **TypeScript Support**: Full support for [TypeScript](https://www.typescriptlang.org/) 🦾, providing type safety and enhancing the developer experience.
- **Environment Management**: Securely manage environment variables and secrets using Wrangler 🔐.
- **Automated Testing**: Includes a test suite powered by [Vitest](https://vitest.dev/) 🧪 to maintain code quality.
- **Code Quality Tools**: Integrated with [Biome](https://biome.dev/) 🧹 for code formatting and linting to keep the codebase clean.
- **End-to-End Testing**: Utilizes [Playwright](https://playwright.dev/) 🎭 for comprehensive end-to-end testing.
- **Preview and Debugging**: Preview the site locally and debug using Wrangler's preview feature 🔍.
- **Extensible**: Easily extendable with additional plugins and configurations to meet various project needs. 🔧
- **Unconventional Setup**: We're using JSX + [htmx](https://htmx.org/) 💡, an unconventional yet powerful combination for building dynamic UIs.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/marco-souza/marco.pages.dev.git
cd marco.pages.dev
bun install
```

## Usage

### Development

To start the development server, run:

```bash
bun run dev
```

This will start a local development server with hot-reloading enabled.

### Deployment

To deploy the site to Cloudflare Pages, use:

```bash
bun run deploy
```

## Scripts

- `dev`: Starts the Vite development server.
- `tests`: Runs the test suite using Vitest.
- `build`: Builds the site for production.
- `e2e`: Runs end-to-end tests using Playwright.
- `fmt`: Formats the code using Biome.
- `lint`: Lints the codebase and fixes issues.
- `postinstall`: Runs post-installation scripts.
- `w`: Alias for Wrangler commands.
- `w:secret`: Manages secrets for Cloudflare Pages.
- `w:typegen`: Generates types for Wrangler.
- `preview`: Previews the site using Wrangler.
- `deploy`: Builds and deploys the site.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

---

### Reference

This project was initially based on the Honox Cloudflare Template, which provides a robust foundation for deploying applications using modern tools like Vite, Tailwind CSS, and Wrangler.


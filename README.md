# Honox Cloudflare Template

This project is a template for deploying applications using Honox on Cloudflare Pages. It leverages modern tools like Vite, Tailwind CSS, and Wrangler for a seamless development and deployment experience.

## Features

- **Modern Development Stack**: Utilizes Vite for fast builds and hot module replacement, Tailwind CSS for utility-first styling, and Wrangler for managing Cloudflare Workers.
- **Seamless Deployment**: Easily deploy applications to Cloudflare Pages with a single command.
- **TypeScript Support**: Full support for TypeScript, enabling type safety and better developer experience.
- **Environment Management**: Manage environment variables and secrets securely using Wrangler.
- **Automated Testing**: Includes a test suite powered by Vitest for ensuring code quality.
- **Code Quality Tools**: Integrated with Biome for code formatting and linting to maintain a clean codebase.
- **End-to-End Testing**: Includes Playwright for comprehensive end-to-end testing.
- **Preview and Debugging**: Preview applications locally and debug with Wrangler's preview feature.
- **Extensible**: Easily extendable with additional plugins and configurations to suit various project needs.

## Installation

To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/marco-souza/honox-cloudflare-template.git
cd honox-cloudflare-template
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

To deploy the application to Cloudflare Pages, use:

```bash
bun run deploy
```

## Scripts

- `dev`: Starts the Vite development server.
- `tests`: Runs the test suite using Vitest.
- `build`: Builds the application for production.
- `e2e`: Runs end-to-end tests using Playwright.
- `fmt`: Formats the code using Biome.
- `lint`: Lints the codebase and fixes issues.
- `postinstall`: Runs post-installation scripts.
- `w`: Alias for Wrangler commands.
- `w:secret`: Manages secrets for Cloudflare Pages.
- `w:typegen`: Generates types for Wrangler.
- `preview`: Previews the application using Wrangler.
- `deploy`: Builds and deploys the application.

## Dependencies

- **Hono**: ^4.7.5
- **Honox**: ^0.1.38

### DevDependencies

- **@biomejs/biome**: ^1.9.4
- **@hono/vite-build**: ^1.2.0
- **@hono/vite-cloudflare-pages**: ^0.4.2
- **@hono/vite-dev-server**: ^0.18.2
- **@tailwindcss/vite**: ^4.0.15
- **DaisyUI**: ^5.0.9
- **TailwindCSS**: ^4.0.15
- **Vite**: ^6.2.3
- **Vitest**: ^3.0.9
- **Wrangler**: ^4.4.0

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.

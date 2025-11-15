# Bloom

[![License](https://img.shields.io/github/license/FlorexLabs/bloom?color=0aa387)](LICENSE)
[![Issues](https://img.shields.io/github/issues/FlorexLabs/bloom)](https://github.com/FlorexLabs/bloom/issues)
[![Pull Requests](https://img.shields.io/github/issues-pr/FlorexLabs/bloom)](https://github.com/FlorexLabs/bloom/pulls)
[![Last Commit](https://img.shields.io/github/last-commit/FlorexLabs/bloom?color=14b8a6)](https://github.com/FlorexLabs/bloom/commits/main)
[![Code Style – Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io/)
[![Linted with ESLint](https://img.shields.io/badge/lint-eslint-4B32C3.svg)](https://eslint.org/)
[![Built with Vite + Vue 3](https://img.shields.io/badge/Built%20with-Vite%20%2B%20Vue%203-4FC08D.svg)](https://vite.dev/)
[![TailwindCSS v4](https://img.shields.io/badge/TailwindCSS-v4-06B6D4.svg)](https://tailwindcss.com/)
[![Deploys from GitHub Actions](https://img.shields.io/badge/deploys-GitHub%20Actions-2088FF.svg)](https://github.com/features/actions)


---

> **Bloom** is a lightweight, self‑hosted monitoring dashboard built with Vue 3, Vite, and Tailwind CSS v4.  
> It provides a real‑time overview of your services, alert channels, and logs inside a fast, responsive user interface.

---

* [Bloom](#bloom)
    * [Features](#features)
    * [Stack Overview](#stack-overview)
    * [Quick Start](#quick-start)
    * [Project Structure](#project-structure)
    * [Available Commands](#available-commands)
    * [Code Style](#code-style)
    * [Development Environment](#development-environment)
    * [Production Build](#production-build)
    * [Recommended IDE Settings (VS Code)](#recommended-ide-settings-vs-code)
    * [Contributing](#contributing)
    * [License](#license)

## Features

- 📊 Interactive dashboard for multiple services
- 🔔 Alert channel configuration (Email / Slack / Telegram / Mattermost)
- 🌓 Automatic dark / light mode toggle
- ⚡ Built with Vite + Vue 3 for instant hot‑reload
- 🎨 Styled with Tailwind v4 (as a Vite plugin)
- 🧹 Linted with ESLint and formatted by Prettier
- 🐳 Ready for containerization or integration with a Crystal‑based backend

---

## Stack Overview

| Tool                | Purpose                                           |
|---------------------|---------------------------------------------------|
| **Vite + Vue 3**    | Front‑end framework & builder                     |
| **Tailwind CSS v4** | Utility‑first styling (Tailwind as a Vite plugin) |
| **ESLint 9**        | Code linting with Vue rules + flat config         |
| **Prettier 3**      | Automatic code formatting                         |
| **Yarn 4 (Berry)**  | Package manager                                   |
| **Node ≥ 22**       | Runtime for development and build                 |

---

## Quick Start

```bash
# Clone the repository
git clone https://github.com/FlorexLabs/bloom.git
cd bloom

# Install dependencies (Yarn 4 recommended)
corepack enable
yarn install

# Start the development server
yarn dev
```

Then open **http://localhost:5173** in your browser.

---

## Project Structure

```
bloom/
├─ index.html            # entry HTML
├─ vite.config.js        # Vite + Tailwind plugin config
├─ src/
│  ├─ App.vue            # main Vue component (UI template)
│  ├─ main.js            # app entry point
│  ├─ style.css          # Tailwind and custom styles
│  └─ assets/            # images / icons
├─ .eslintrc.cjs / eslint.config.js   # lint configuration
├─ .prettierrc.json      # Prettier rules
├─ README.md             # this file
└─ package.json
```

---

## Available Commands

| Command             | Description                             |
|---------------------|-----------------------------------------|
| `yarn dev`          | Start Vite in development mode          |
| `yarn build`        | Build for production ( `dist/` output ) |
| `yarn preview`      | Preview the production build            |
| `yarn lint`         | Run ESLint checks                       |
| `yarn lint:fix`     | Auto‑fix lint issues                    |
| `yarn format`       | Format all files with Prettier          |
| `yarn format:check` | Verify format without writing           |

---

## Code Style

Prettier and ESLint keep the codebase consistent.  
You can format everything manually:

```bash
yarn lint:fix && yarn format
```

or simply enable "Format on Save" in your editor.

---

## Development Environment

| Tool     | Version recommended |
|----------|--------------------:|
| Node     |            ≥ 22.0.0 |
| Yarn     |        4.x (stable) |
| Vite     |                 7.x |
| Vue      |                 3.x |
| Tailwind |                 4.x |

---

## Production Build

```bash
yarn build
```

The build output appears in `dist/` and can be served by any static server or your Crystal backend.

To preview:

```bash
yarn preview
```

---

## Recommended IDE Settings (VS Code)

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "eslint.validate": [
    "javascript",
    "vue"
  ],
  "files.eol": "\n"
}
```

---

## Contributing

1. Fork the repo and create your feature branch:  
   `git checkout -b feature/amazing-edit`
2. Commit your changes using conventional commits:  
   `git commit -m "feat: add cool feature"`
3. Push to the branch and open a Pull Request.

---

## License

This project is released under the [MIT License](LICENSE).

---

**© 2025 Florex Labs.**  
Built with 💚 for developers who love clear dashboards.

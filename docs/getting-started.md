# 🏁 Getting started

## 📋 Requirements

| Tool              | Version                                                                      |
| ----------------- | ---------------------------------------------------------------------------- |
| 🟢 Node.js        | **24.15 or newer** (`.nvmrc` pins the active LTS line, `24`)                 |
| 📦 npm            | 11 or newer (ships with Node 24)                                             |
| 🔑 OpenWeatherMap | A free account and an [API key](https://home.openweathermap.org/api_keys)    |
| 🌐 Browser        | Chrome, Edge or Firefox 111+, Safari 16.4+ (the Next.js 16 browser baseline) |

If you use a version manager, run `nvm use` (or `fnm use`) in the project root.

## 🔑 The API key

The app reads one environment variable on the server:

| Variable                 | Meaning                                                  |
| ------------------------ | -------------------------------------------------------- |
| `OPENWEATHERMAP_API_KEY` | Your OpenWeatherMap key. It is never sent to the browser |

```bash
cp .env.example .env.local
```

Paste the key into `.env.local`. Next.js loads `.env*` files automatically; every `.env*` file except `.env.example` is ignored by Git.

> [!NOTE]
> A brand-new key can take up to two hours to start working. Until then the app shows **The API key was rejected**. Without any key it shows **The weather service is not set up**.

## 📦 Install and run

```bash
npm ci
npm run dev
```

Open <http://localhost:3000>. Without a city in the address the app opens Lviv; `/?city=Tokyo` and `/?lat=51.51&lon=-0.13` open any other place.

## 📜 npm scripts

| Script                  | What it does                                                                           |
| ----------------------- | -------------------------------------------------------------------------------------- |
| `npm run dev`           | 🔥 Starts the Next.js dev server with Turbopack and hot reload                         |
| `npm run build`         | 📦 Type-checks the project and builds the production bundle into `.next/`              |
| `npm start`             | 👀 Serves the production build                                                         |
| `npm run typecheck`     | 🧠 Generates the route types and runs the TypeScript 7 compiler without emitting       |
| `npm run lint`          | 🧹 Lints with Oxlint, including type-aware, React Compiler, Next.js and a11y rules     |
| `npm run lint:fix`      | 🩹 Applies the automatic Oxlint fixes                                                  |
| `npm run format`        | 🎨 Formats every supported file with Oxfmt                                             |
| `npm run format:check`  | 🔎 Fails if a file is not formatted                                                    |
| `npm test`              | 👁️ Starts Vitest in watch mode                                                         |
| `npm run test:run`      | 🧪 Runs the whole test suite once                                                      |
| `npm run test:coverage` | 📊 Runs the tests with V8 coverage and enforces the coverage thresholds                |
| `npm run icons`         | 🌦️ Copies the Meteocons the app uses from `@meteocons/svg` into `public/icons/weather` |
| `npm run check`         | ✅ Lint, format check, type check and tests in one go, run it before pushing           |

## 🗂️ Project layout

```text
next-weather-app/
├── .github/
│   ├── ISSUE_TEMPLATE/              Bug report and feature request forms
│   ├── workflows/ci.yml             CI: verify, build, dependency review
│   ├── workflows/codeql.yml         CodeQL code scanning
│   ├── dependabot.yml               Weekly dependency and GitHub Actions updates
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── SECURITY.md                  How to report vulnerabilities
├── docs/                            This documentation and its screenshots
├── lint/no-comments.js              Custom Oxlint rule that forbids comments
├── public/icons/weather/            The Meteocons the app shows, served as static files
├── scripts/                         Icon sync and the CI coverage summary
├── src/
│   ├── proxy.ts                     Per-request nonce and Content Security Policy
│   ├── app/                         Routes: layout, page, errors, /api/places, /flags, icons, manifest, global styles
│   ├── widgets/                     Header, Footer and the Forecast dashboard
│   ├── features/
│   │   ├── forecast/                OpenWeatherMap orchestration, normalization, conditions; every forecast card
│   │   ├── places/                  Places, locations in the URL, geocoding, saved and recent places; search, locate, star
│   │   ├── preferences/             Theme, units and language in cookies, the server action; settings and offline notice
│   │   └── i18n/                    Eight message catalogs, locale matching, the translator and its provider
│   ├── shared/
│   │   ├── api/                     The OpenWeatherMap HTTP client (server only)
│   │   ├── lib/                     Formatting, units, time, guards, rate limiting, stored lists, CSP
│   │   ├── ui/                      Icon, IconButton, Card, SegmentedControl, Skeleton, WeatherIcon, Flag
│   │   └── styles/                  Design tokens, skies, mixins and the dashboard grid
│   └── test/                        Test setup, fixtures and render helpers
├── next.config.ts                   React Compiler, security headers and experiments
├── vitest.config.ts                 Test environment, aliases and coverage thresholds
├── .oxlintrc.json                   Lint rules and layer boundaries
└── .oxfmtrc.json                    Formatting rules
```

Every feature has a `model/` folder for data and logic and, when it renders something, a `ui/` folder with one folder per component, for example `features/forecast/ui/WindCard/WindCard.tsx` and `WindCard.module.scss`. Tests sit next to the code they cover as `*.test.ts(x)`. The layers and their rules are explained in [Architecture](./architecture.md#-layers).

## 💻 Editor setup

Editor settings are not committed. For the best experience in VS Code, install:

- 🦀 **Oxc**: inline Oxlint diagnostics and Oxfmt formatting on save
- ⚡ **Vitest**: run and debug tests from the editor
- 📝 **EditorConfig**: consistent whitespace settings (`.editorconfig` is part of the repository)

## 👉 Next steps

- ✨ Learn what the app can do in [Features](./features.md).
- 🏗️ Understand how a request becomes a forecast in [Architecture](./architecture.md).
- 🌦️ See how OpenWeatherMap data is fetched and cleaned up in [Weather data](./weather-data.md).

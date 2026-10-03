# ⛅ Weather App

[![CI](https://github.com/sacrificed666/next-weather-app/actions/workflows/ci.yml/badge.svg)](https://github.com/sacrificed666/next-weather-app/actions/workflows/ci.yml)
[![CodeQL](https://github.com/sacrificed666/next-weather-app/actions/workflows/codeql.yml/badge.svg)](https://github.com/sacrificed666/next-weather-app/actions/workflows/codeql.yml)

The weather for any city in the world on one calm, glassy screen: what it is like outside right now, the
next 24 hours, the coming week, the air you breathe and the sun's path across the sky.

Built with Next.js 16 server components and OpenWeatherMap. The forecast is rendered on the server, your
API key never reaches the browser, and the sky behind the cards changes with the weather.

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="./docs/images/desktop-dark.jpg" />
  <img src="./docs/images/desktop-light.jpg" alt="The forecast for Lviv with saved places, the hourly outlook and the 5-day forecast" />
</picture>

---

## ✨ What it does

### 🌤️ Current weather

Temperature, conditions, today's high and low and the apparent temperature, with the local date and time of
the city ticking along. The background turns into a clear, cloudy, rainy, stormy, snowy or foggy sky, by day
and by night.

### 🕒 Hourly and daily forecast

The next 24 hours in three-hour steps with the chance of rain, and up to seven days with temperature bars on a
shared scale, so a warm week and a cold one look different at a glance.

### 📊 Details

Air quality with PM2.5, PM10, ozone and nitrogen dioxide, sunrise and sunset with the sun's position, wind with a
compass, humidity and dew point, apparent temperature, pressure, visibility, precipitation and cloud cover, each
with a sentence that explains the number.

### 🔎 Search and location

Suggestions while you type in any language (`Lviv`, `Львів` or `Lemberg`), full keyboard control, recent
searches and **Use my location**. Every forecast has its own address, so it can be bookmarked and shared.

### ⭐ Saved places

Star a city to pin it above the forecast and switch between your places in one tap.

### ⚙️ Your way

Light, dark or automatic theme, metric (°C, m/s, hPa) or imperial (°F, mph, inHg) units and eight languages:
English, Ukrainian, German, Spanish, French, Italian, Dutch and Polish, including the weather descriptions.

### 📱 Everywhere

A layout for phones, tablets and wide screens, an offline notice that retries by itself, and accessible markup
with landmarks, a skip link, live regions and support for reduced motion and transparency.

<p align="center">
  <img src="./docs/images/mobile-light.jpg" alt="The forecast on a phone in light mode" width="260" />
  <img src="./docs/images/mobile-dark-uk.jpg" alt="Snow in Reykjavik on a phone in dark mode, in Ukrainian" width="260" />
</p>

![Air quality, the sun, wind, humidity, pressure, visibility, precipitation and cloud cover](./docs/images/desktop-details.jpg)

---

## 🚀 Quick start

Requires **Node.js 24.15** or newer and a free [OpenWeatherMap API key](https://home.openweathermap.org/api_keys).

```bash
npm ci
cp .env.example .env.local   # then paste your key into OPENWEATHERMAP_API_KEY
npm run dev                  # http://localhost:3000
```

```bash
npm run check                # lint, format check, type check and tests in one go
npm run build                # production build
npm start                    # serve the production build
```

---

## 📚 Documentation

Everything else lives in [`docs/`](./docs):

|                                                 |                                                             |
| ----------------------------------------------- | ----------------------------------------------------------- |
| 🏁 [Getting started](./docs/getting-started.md) | Requirements, the API key, scripts and project layout       |
| ✨ [Features](./docs/features.md)               | Everything the app can do, keyboard and accessibility       |
| 🏗️ [Architecture](./docs/architecture.md)       | Layers, rendering, routes, preferences and saved places     |
| 🌦️ [Weather data](./docs/weather-data.md)       | OpenWeatherMap endpoints, caching, normalization and icons  |
| 🎨 [Design system](./docs/design.md)            | Glass surfaces, skies, tokens, layout and motion            |
| 🌍 [Localization](./docs/i18n.md)               | Messages, formatting and adding a language                  |
| 🛡️ [Security](./docs/security.md)               | Content Security Policy, the API key, validation and limits |
| 🧪 [Testing](./docs/testing.md)                 | Test stack, helpers, conventions and coverage               |
| 🚀 [Deployment](./docs/deployment.md)           | CI, CodeQL, Dependabot and hosting                          |
| 🤝 [Contributing](./docs/contributing.md)       | Workflow, code style and commit conventions                 |
| ❓ [FAQ](./docs/faq.md)                         | Common questions                                            |

---

## 🧱 Stack

Next.js 16 (App Router, server components, server actions, Turbopack) with React 19 and the React Compiler,
TypeScript 7, Sass modules and the self-hosted Montserrat variable font. Vitest 5 with Testing Library, Oxlint
and Oxfmt. The interface, the charts and the compass are hand-written SVG and CSS, without a UI library.
Checked by GitHub Actions and scanned by CodeQL.

## 📌 Good to know

- **A free API key is enough.** When the key does not include the daily forecast, the week is built from the
  free 5-day / 3-hour forecast instead.
- **New keys need time.** OpenWeatherMap can take up to two hours to activate a new key.
- **Nothing is tracked.** Preferences are three cookies, saved places stay in your browser, and the browser only
  talks to the app itself.
- **Weather is cached for 10 minutes** on the server, so many visitors of one city cost one request.

## ✍️ Author

**[Illia Movchko](https://github.com/sacrificed666)**

## ✨ Credits

- **[Bas Milius](https://github.com/basmilius)**: _[Meteocons](https://bas.dev/work/meteocons)_ weather icons
- **[OpenWeatherMap](https://openweathermap.org)**: weather, forecast, air quality and geocoding data
- **[country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons)**: country flags
- **[Lucide](https://lucide.dev)**: the shapes behind the interface icons

## 📝 License

Licensed under the **[MIT License](https://choosealicense.com/licenses/mit/)**.

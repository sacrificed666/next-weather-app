# 📜 Changelog

All notable changes to Weather are documented here. The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the project uses [Semantic Versioning](https://semver.org/spec/v2.0.0.html). How versions are cut is described in [docs/releases.md](./docs/releases.md).

## [Unreleased]

## [1.0.0] - 2026-10-05

The first release.

### Added

- 🌤️ Current weather with today's high and low, the apparent temperature and the city's own clock.
- 🕒 The next 24 hours in three-hour steps and up to seven days with temperature bars on one shared scale, built from the free 5-day forecast when the API key has no daily plan.
- 📊 A compact dashboard on one grid without empty corners: the current weather with the apparent temperature, the week beside it, the sun's path, wind and air quality in one row, and six even tiles for humidity, dew point, pressure, visibility, precipitation and cloud cover, each with a word that rates the number and a bar on its scale.
- 🔎 City search with suggestions in any language, recent searches, full keyboard control and **Use my location**.
- ⭐ Up to 12 saved places, named in the language of the page, never saved twice, kept in the browser and in sync between tabs.
- 🌌 A sky behind the cards that follows the weather, the time of day and the theme.
- ⚙️ Light, dark and automatic themes, metric and imperial units, and full or reduced effects (reduced by default outside Apple devices), all rendered by the server without a flash.
- 🌍 Ten languages under their own addresses: English, Ukrainian, Czech, German, Spanish, French, Italian, Dutch, Polish and Portuguese.
- ♿ WCAG 2.2 AA support: landmarks, a skip link, live regions, a real combobox, reflow down to 320 px, and support for reduced motion, reduced transparency, more contrast and forced colours.
- 🔎 Canonical and `hreflang` links, a share card per language, a sitemap, robots rules and JSON-LD for every forecast.
- 🛡️ A nonce-based Content Security Policy, a server-only API key, validated input and a rate-limited search endpoint.
- 🧪 Unit tests, end-to-end tests against a mock OpenWeatherMap API, axe checks and a Lighthouse budget in CI.
- 🐳 Docker images for development, staging and production: a multi-stage Dockerfile, a Compose overlay per environment, a non-root standalone server and environment files passed to the build as secrets.

[Unreleased]: https://github.com/sacrificed666/weather/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/sacrificed666/weather/releases/tag/v1.0.0

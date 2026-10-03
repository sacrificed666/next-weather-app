# 🏗️ Architecture

## 🧱 Technology stack

| Area         | Choice                                                                                               |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| ⚛️ UI        | React 19.3 with the React Compiler (automatic memoization)                                           |
| 🧭 Framework | Next.js 16 App Router: server components, server actions, route handlers, `proxy.ts`, Turbopack      |
| 🌦️ Data      | OpenWeatherMap current weather, 5-day / 3-hour forecast, daily forecast, air pollution and geocoding |
| 🌍 i18n      | Eight hand-written message catalogs on top of `Intl` for numbers, units, dates and country names     |
| 🎨 Styling   | Sass modules, CSS custom properties, `color-mix()`, `:has()`, `@starting-style`, native popovers     |
| 🔷 Language  | TypeScript 7 in strict mode with `noUncheckedIndexedAccess`, `verbatimModuleSyntax` and route types  |
| ✅ Quality   | Oxlint (type-aware, React Compiler, Next.js, a11y and layer rules), Oxfmt, Vitest 5, Testing Library |

## 🧭 Layers

The source is organised by **feature**, in four layers. A layer may only import from the layers below it, and Oxlint's `no-restricted-imports` rule enforces this in `.oxlintrc.json`.

```mermaid
flowchart TB
  app["🚀 app<br/>routes, layout, errors, API, flags, icons, manifest, proxy"]
  widgets["🧩 widgets<br/>Header, Footer, Forecast"]
  features["✨ features<br/>forecast, places, preferences, i18n"]
  shared["🧰 shared<br/>api client, lib, ui primitives, styles"]

  app --> widgets
  app --> features
  app --> shared
  widgets --> features
  widgets --> shared
  features --> shared
```

| Layer       | Folder                    | Contains                                                       | May import             |
| ----------- | ------------------------- | -------------------------------------------------------------- | ---------------------- |
| 🚀 App      | `src/app`, `src/proxy.ts` | Next.js routes and special files                               | everything             |
| 🧩 Widgets  | `src/widgets`             | Page regions that compose several features                     | features, shared       |
| ✨ Features | `src/features`            | One folder per capability with a `model/` and a `ui/`          | other features, shared |
| 🧰 Shared   | `src/shared`              | Domain-agnostic HTTP client, helpers, UI primitives and styles | shared only            |

| Feature          | Model                                                                                                   | UI                                                                                                              |
| ---------------- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| 🌦️ `forecast`    | `getForecast()`, response parsers, daily aggregation, condition icons and skies, insights, domain types | `CurrentConditions`, `HourlyForecast`, `DailyForecast`, nine detail cards, `Sky`, `LocalClock`, skeleton, error |
| 📍 `places`      | `Place`, URL locations, geocoding, saved and recent places                                              | `CitySearch`, `LocateButton`, `SavePlaceButton`, `SavedPlaces`                                                  |
| ⚙️ `preferences` | Theme, units and language, cookie reading, the `savePreference` server action, `getLocalization()`      | `SettingsMenu`, `OfflineNotice`                                                                                 |
| 🌍 `i18n`        | Locales, `matchLocale()`, message catalogs, `createTranslator()`, `useI18n()`                           | `I18nProvider`                                                                                                  |

## 🔀 Request flow

```mermaid
sequenceDiagram
  actor Browser
  participant Proxy as proxy.ts
  participant Layout as app/layout.tsx
  participant Page as app/page.tsx
  participant Forecast as widgets/Forecast
  participant Model as getForecast()
  participant OWM as OpenWeatherMap

  Browser->>Proxy: GET /?city=Kyiv
  Proxy->>Proxy: fresh nonce, Content-Security-Policy
  Proxy->>Layout: request with the nonce
  Layout->>Layout: getLocalization(): cookies, Accept-Language
  Layout-->>Browser: shell: header, search, settings, footer
  Page->>Page: parseLocation(searchParams)
  Page-->>Browser: <Suspense key="city:kyiv"> skeleton
  Page->>Forecast: render the query
  Forecast->>Model: getForecast(query, locale)
  Model->>OWM: geocoding, then weather, forecast, daily, air in parallel
  OWM-->>Model: JSON (cached for 10 minutes)
  Model-->>Forecast: normalized Forecast or a failure
  Forecast-->>Browser: streamed dashboard over its sky
```

- 🧊 **Server components by default.** The forecast cards are synchronous server components that receive `{ forecast, t, format }` as props; they ship no JavaScript. Only interactive parts are client components: search, location, the star, saved places, settings, the clock, the retry button and the offline notice.
- 🌊 **Streaming.** The layout and the page shell render at once; the forecast streams into a `Suspense` boundary. The boundary is keyed by the location (`locationKey()`), so opening another city shows the skeleton, while changing a setting keeps the current dashboard on screen until the new one is ready.
- 🔗 **The URL is the state.** The place lives in the address (`?city=` or `?lat=&lon=`), so the back button, bookmarks and sharing work without client state. Search and location only call `router.push()` inside a transition.
- 🏷️ **Metadata.** `generateMetadata()` names the tab after the city and its weather (`Kyiv 17° · Clear sky · Weather`). It calls `getForecast()` with the same arguments as the page, and Next.js deduplicates the identical `fetch` calls within the request.

## 🗺️ Routes

| Route                                          | Kind                       | Purpose                                                                |
| ---------------------------------------------- | -------------------------- | ---------------------------------------------------------------------- |
| `/`                                            | Dynamic page               | The forecast for `?city=`, `?lat=&lon=` or the default city            |
| `/api/places?q=`                               | Route handler              | Search suggestions for the combobox, rate-limited, same-origin only    |
| `/flags/[code]`                                | Static route handler (SSG) | 265 country flags from `country-flag-icons`, prerendered at build time |
| `/icons/weather/*.svg`                         | Static files               | The Meteocons the app uses                                             |
| `/icon.svg`, `/apple-icon`, `/opengraph-image` | Metadata files             | App icons and the social preview, generated with `next/og`             |
| `/manifest.webmanifest`                        | Metadata file              | Name, colours and icons for installing the app                         |
| Anything else                                  | `not-found.tsx`            | **Page not found** in the visitor's language                           |

`error.tsx` catches unexpected rendering errors below the layout and offers **Try again** (`retry()`); `global-error.tsx` covers the root layout itself.

## 🗂️ Domain model

```mermaid
classDiagram
  class Forecast {
    Place place
    number generatedAt
    number timezoneOffset
    CurrentWeather current
    HourlyForecast[] hourly
    DailyForecast[] daily
    AirQuality airQuality
  }
  class Place {
    string name
    string region
    string country
    number latitude
    number longitude
  }
  class CurrentWeather {
    number time
    Condition condition
    number temperature
    number feelsLike
    number humidity
    number pressure
    number visibility
    number cloudiness
    number precipitation
    Wind wind
    number sunrise
    number sunset
  }
  class Condition {
    number code
    string description
    boolean daytime
  }
  Forecast --> Place
  Forecast --> CurrentWeather
  Forecast --> "0..8" HourlyForecast
  Forecast --> "0..7" DailyForecast
  Forecast --> "0..1" AirQuality
  CurrentWeather --> Condition
```

- 📏 **Metric inside.** Every value is stored in metric units (°C, m/s, hPa, m, mm) and converted only when it is formatted, so one cached response serves every unit system.
- 🕰️ **Unix seconds and an offset.** Times are UTC seconds; `timezoneOffset` is the city's offset in seconds. `toLocalDate()` shifts a timestamp and formatting always uses `timeZone: "UTC"`, so the server, the browser and the tests agree regardless of their own time zone.
- 🧭 **Codes, not words.** A `Condition` keeps the OpenWeatherMap code; icons and skies are derived from it, never from the localized description.

The full path from OpenWeatherMap JSON to these types is described in [Weather data](./weather-data.md).

## ⚙️ Preferences

```mermaid
sequenceDiagram
  actor User
  participant Menu as SettingsMenu (client)
  participant Action as savePreference (server action)
  participant Next as Next.js
  User->>Menu: chooses Dark
  Menu->>Menu: document.documentElement.dataset.theme = "dark"
  Menu->>Menu: useOptimistic marks Dark as selected
  Menu->>Action: savePreference("theme", "dark")
  Action->>Action: validate name and value
  Action->>Next: cookies().set("weather-theme", "dark")
  Next-->>Menu: re-rendered layout and page in one round trip
```

| Cookie           | Values                                         | Default                              |
| ---------------- | ---------------------------------------------- | ------------------------------------ |
| `weather-theme`  | `system`, `light`, `dark`                      | `system`                             |
| `weather-units`  | `metric`, `imperial`                           | `metric`                             |
| `weather-locale` | `en`, `uk`, `de`, `es`, `fr`, `it`, `nl`, `pl` | The best match for `Accept-Language` |

- 🍪 Cookies are `HttpOnly`, `SameSite=Lax`, `Secure` in production and live for a year. Unknown names and values are ignored, so a crafted request cannot store anything else.
- 🖥️ `getPreferences()` and `getLocalization()` are wrapped in React's `cache()`, so the layout, the page and the metadata read the cookies once per request.
- 🎨 Because the server knows the theme, `<html data-theme>` is correct in the first byte: there is no inline theme script and no flash.

## ⭐ Saved and recent places

Saved and recent places are browser-only state in `localStorage` (`next-weather-app/saved-places`, up to 12, and `next-weather-app/recent-places`, up to 5). `createStoredList()` in `shared/lib/storedList.ts` turns a key into an external store for `useSyncExternalStore`:

- 🛡️ every read goes through `parsePlace()`, so broken or edited storage falls back to an empty list;
- 🔄 the `storage` event keeps tabs in sync;
- 🖥️ the server snapshot is always empty, so hydration never mismatches and the chips appear right after it;
- 🚫 blocked storage (private modes) simply disables the feature.

## 🕰️ The live clock

`LocalClock` subscribes to a 15-second interval through `useSyncExternalStore` and re-renders only when the minute changes. The server passes `generatedAt` as the initial snapshot, and `suppressHydrationWarning` absorbs the rare case where the minute changes between the server render and hydration.

## 🗺️ Component map

```text
RootLayout
├── I18nProvider             The messages of the current language for client components
├── Header
│   ├── CitySearch           Combobox with suggestions from /api/places and recent places
│   ├── LocateButton         Geolocation → /?lat=&lon=
│   └── SettingsMenu         Popover with theme, units and language
├── main
│   └── Page
│       ├── SavedPlaces      Chips from localStorage
│       └── Suspense         Keyed by the location, ForecastSkeleton as fallback
│           └── Forecast     Async server widget
│               ├── Sky                  Fixed background for the condition
│               ├── CurrentConditions    Place, LocalClock, SavePlaceButton, temperature
│               ├── HourlyForecast
│               ├── DailyForecast        TemperatureRange per day
│               └── Details              AirQuality, Sun, Wind, Humidity, FeelsLike, Pressure,
│                                        Visibility, Precipitation, CloudCover
├── Footer                   Credits and links
└── OfflineNotice            next/offline
```

## 🛠️ Tooling decisions

- ⚛️ **React Compiler** is enabled with `reactCompiler: true`, so components are written without `useMemo` or `useCallback`. Oxlint enables the matching rules (`purity`, `refs`, `immutability`, `set-state-in-effect` and others).
- 🔷 **TypeScript 7** checks the project with the native compiler; `next build` runs the project's own `tsc`, and Oxlint's type-aware rules use `oxlint-tsgolint`.
- 🧩 **Sass modules** keep styles next to their component. Turbopack resolves the `@/` alias inside `@use`, so every module imports tokens with `@use "@/shared/styles/mixins" as *`.
- 🤖 **Agent files.** `agentRules: false` stops `next dev` from rewriting `AGENTS.md`, which is maintained by hand and points to the documentation bundled with Next.js.
- 📴 **Offline detection** uses the experimental `useOffline` flag of Next.js 16.3, which also retries navigations and server actions once the connection is back.

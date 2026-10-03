# ❓ FAQ

### 🔑 Do I need a paid OpenWeatherMap plan?

No. The free plan covers current weather, the 5-day / 3-hour forecast, air pollution and geocoding. The 7-day daily forecast is part of paid plans; without it the app builds the week from the three-hour forecast and shows five or six days. See [Weather data](./weather-data.md#️-daily-forecast-on-a-free-key).

### ⏳ The app says "The API key was rejected". What now?

Check that `OPENWEATHERMAP_API_KEY` is set without quotes or spaces and restart the server. A key created in the last couple of hours may simply not be active yet.

### 🌡️ How do I switch to Fahrenheit?

Open **Settings** (the sliders button) and choose **°F, mph**. Pressure switches to inHg, distances to miles and precipitation to inches. The choice is remembered in a cookie.

### 🗣️ Why are some descriptions or city names not translated?

Descriptions come from OpenWeatherMap in the language you choose, and place names from its geocoding database, which has local names for many but not all places. The region (for example "Lviv Oblast") is only available in English.

### 📍 Why does "Use my location" not work?

The browser must allow the page to read your location, and only does so over HTTPS or on `localhost`. If you blocked it once, allow it again in the site settings next to the address bar.

### ⭐ Where are my saved places?

In your browser's `localStorage`, on this device only. They sync between tabs but not between browsers or devices. Clearing the site data removes them.

### 🔗 Can I link to a city?

Yes. Every forecast has its own address, for example `/?city=Tokyo` or `/?lat=49.84&lon=24.03`. The theme, units and language of the person who opens it are their own.

### 🕰️ Which time zone are the times in?

Always the city's own: the clock, the hourly forecast, sunrise, sunset and "Updated at" use the offset reported by OpenWeatherMap, wherever you are.

### 🔄 How fresh is the data?

OpenWeatherMap updates current conditions about every ten minutes, and the app caches each response for ten minutes (air quality for thirty). "Updated at" shows the time of the observation.

### 📴 What happens offline?

A notice appears at the bottom of the page. The forecast you already see stays on screen, and Next.js retries navigations and saved settings automatically when the connection returns.

### 🌍 Can I add a language?

Yes: add a message file and a few lines in `locales.ts`. See [Localization](./i18n.md#-adding-a-language).

### 🖼️ Where do the icons come from?

Weather icons are [Meteocons](https://bas.dev/work/meteocons) by Bas Milius, served by the app itself. Interface icons are based on [Lucide](https://lucide.dev) and flags come from [country-flag-icons](https://gitlab.com/catamphetamine/country-flag-icons).

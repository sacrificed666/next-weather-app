export const site = {
  keywords: [
    "weather",
    "forecast",
    "hourly forecast",
    "7-day forecast",
    "air quality",
    "sunrise",
    "sunset",
    "wind",
    "OpenWeatherMap",
  ],
  author: { name: "Illia Movchko", url: "https://github.com/sacrificed666" },
  repository: "https://github.com/sacrificed666/next-weather-app",
  themeColor: { light: "#dbe5f1", dark: "#0a1020" },
} as const;

type Environment = Readonly<Partial<Record<string, string>>>;

export const siteUrl = (env: Environment = process.env): URL => {
  const explicit = env.SITE_URL?.trim();
  if (explicit) return new URL(explicit);
  const vercel = env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  if (vercel) return new URL(`https://${vercel}`);
  return new URL(`http://localhost:${env.PORT ?? "3000"}`);
};

export const isIndexable = (env: Environment = process.env) =>
  env.VERCEL_ENV === undefined || env.VERCEL_ENV === "production";

import "server-only";

export type OpenWeatherFailure = "missing-key" | "invalid-key" | "not-found" | "rate-limited" | "unavailable";

export type OpenWeatherResult = { ok: true; data: unknown } | { ok: false; failure: OpenWeatherFailure };

export type OpenWeatherParams = Readonly<Record<string, string | number>>;

const DEFAULT_BASE_URL = "https://api.openweathermap.org";
const TIMEOUT_MS = 8000;

// The OpenWeather address, which tests point to the mock API
const baseUrl = () => {
  const configured = process.env.OPENWEATHERMAP_API_URL?.trim();
  return configured === undefined || configured === "" ? DEFAULT_BASE_URL : configured;
};

// The failure for an HTTP status
const failureForStatus = (status: number): OpenWeatherFailure => {
  if (status === 401) return "invalid-key";
  if (status === 404) return "not-found";
  if (status === 429) return "rate-limited";
  return "unavailable";
};

// A cached OpenWeather request that never throws
export const fetchOpenWeather = async (
  path: string,
  params: OpenWeatherParams,
  revalidateSeconds: number,
): Promise<OpenWeatherResult> => {
  const apiKey = process.env.OPENWEATHERMAP_API_KEY?.trim();
  if (!apiKey) return { ok: false, failure: "missing-key" };

  const url = new URL(path, baseUrl());
  for (const [name, value] of Object.entries(params)) url.searchParams.set(name, String(value));
  url.searchParams.set("appid", apiKey);

  try {
    const response = await fetch(url, {
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    });
    if (!response.ok) return { ok: false, failure: failureForStatus(response.status) };
    return { ok: true, data: await response.json() };
  } catch {
    return { ok: false, failure: "unavailable" };
  }
};

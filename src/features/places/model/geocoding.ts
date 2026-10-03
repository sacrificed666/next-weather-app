import "server-only";
import type { Locale } from "@/features/i18n/model/locales";
import { fetchOpenWeather, type OpenWeatherFailure } from "@/shared/api/openWeather";
import { readNumber, readRecord, readString } from "@/shared/lib/guards";

import { parsePlace, placeKey, type Place } from "./place";

const GEOCODING_REVALIDATE_SECONDS = 60 * 60 * 24 * 7;

export type PlacesResult = { ok: true; places: Place[] } | { ok: false; failure: OpenWeatherFailure };

export const toPlace = (entry: unknown, locale: Locale): Place | null =>
  parsePlace({
    name: readString(readRecord(entry, "local_names"), locale) ?? readString(entry, "name"),
    region: readString(entry, "state"),
    country: readString(entry, "country")?.toUpperCase(),
    latitude: readNumber(entry, "lat"),
    longitude: readNumber(entry, "lon"),
  });

const toPlaces = (data: unknown, locale: Locale): Place[] => {
  if (!Array.isArray(data)) return [];
  const places = new Map<string, Place>();
  for (const entry of data) {
    const place = toPlace(entry, locale);
    if (place && !places.has(placeKey(place))) places.set(placeKey(place), place);
  }
  return [...places.values()];
};

export const searchPlaces = async (query: string, locale: Locale, limit = 5): Promise<PlacesResult> => {
  const result = await fetchOpenWeather("/geo/1.0/direct", { q: query, limit }, GEOCODING_REVALIDATE_SECONDS);
  if (!result.ok) return result;
  return { ok: true, places: toPlaces(result.data, locale) };
};

export const findPlace = async (latitude: number, longitude: number, locale: Locale): Promise<Place | null> => {
  const result = await fetchOpenWeather(
    "/geo/1.0/reverse",
    { lat: latitude, lon: longitude, limit: 1 },
    GEOCODING_REVALIDATE_SECONDS,
  );
  if (!result.ok) return null;
  const [place] = toPlaces(result.data, locale);
  return place ? { ...place, latitude, longitude } : null;
};

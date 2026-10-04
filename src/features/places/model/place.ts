import type { Locale } from "@/features/i18n/model/locales";
import { isRecord } from "@/shared/lib/guards";

export interface Place {
  name: string;
  region: string | null;
  country: string | null;
  latitude: number;
  longitude: number;
}

export const MAX_NAME_LENGTH = 80;

export const roundCoordinate = (value: number) => Math.round(value * 100) / 100;

export const isLatitude = (value: number) => Number.isFinite(value) && value >= -90 && value <= 90;

export const isLongitude = (value: number) => Number.isFinite(value) && value >= -180 && value <= 180;

export const placeKey = ({ latitude, longitude }: Pick<Place, "latitude" | "longitude">) =>
  `${roundCoordinate(latitude).toFixed(2)},${roundCoordinate(longitude).toFixed(2)}`;

export const placeSearch = (place: Pick<Place, "latitude" | "longitude">) => {
  const [latitude, longitude] = placeKey(place).split(",");
  return `?lat=${latitude}&lon=${longitude}`;
};

export const placeHref = (locale: Locale, place: Pick<Place, "latitude" | "longitude">) =>
  `/${locale}${placeSearch(place)}`;

export const parsePlace = (value: unknown): Place | null => {
  if (!isRecord(value)) return null;
  const { name, region, country, latitude, longitude } = value;
  if (typeof name !== "string" || name.trim() === "" || name.length > MAX_NAME_LENGTH) return null;
  if (typeof latitude !== "number" || !isLatitude(latitude)) return null;
  if (typeof longitude !== "number" || !isLongitude(longitude)) return null;
  return {
    name: name.trim(),
    region: typeof region === "string" && region.trim() !== "" ? region.trim().slice(0, MAX_NAME_LENGTH) : null,
    country: typeof country === "string" && /^[A-Z]{2}$/u.test(country) ? country : null,
    latitude: roundCoordinate(latitude),
    longitude: roundCoordinate(longitude),
  };
};

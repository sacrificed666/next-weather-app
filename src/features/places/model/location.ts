import { isLatitude, isLongitude, MAX_NAME_LENGTH, placeKey, roundCoordinate } from "./place";

export type LocationQuery =
  | { kind: "coordinates"; latitude: number; longitude: number }
  | { kind: "city"; name: string };

export type SearchParams = Readonly<Record<string, string | string[] | undefined>>;

export const DEFAULT_LOCATION: LocationQuery = { kind: "coordinates", latitude: 49.84, longitude: 24.03 };

const single = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value)?.trim() ?? "";

export const parseLocation = (params: SearchParams): LocationQuery | null => {
  const city = single(params.city);
  const latitude = single(params.lat);
  const longitude = single(params.lon);

  if (latitude !== "" || longitude !== "") {
    const lat = Number(latitude);
    const lon = Number(longitude);
    if (latitude === "" || longitude === "" || !isLatitude(lat) || !isLongitude(lon)) return null;
    return { kind: "coordinates", latitude: roundCoordinate(lat), longitude: roundCoordinate(lon) };
  }

  if (city !== "") return city.length > MAX_NAME_LENGTH ? null : { kind: "city", name: city };

  return DEFAULT_LOCATION;
};

export const locationKey = (query: LocationQuery | null) => {
  if (!query) return "invalid";
  return query.kind === "city" ? `city:${query.name.toLocaleLowerCase()}` : placeKey(query);
};

export const cityHref = (name: string) => `/?city=${encodeURIComponent(name.trim())}`;

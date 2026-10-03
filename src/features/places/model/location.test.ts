import { describe, expect, it } from "vitest";

import { cityHref, DEFAULT_LOCATION, locationKey, parseLocation } from "./location";

describe("parseLocation", () => {
  it("opens the default city without parameters", () => {
    expect(parseLocation({})).toBe(DEFAULT_LOCATION);
  });

  it("reads rounded coordinates", () => {
    expect(parseLocation({ lat: "50.4501", lon: "30.5234" })).toEqual({
      kind: "coordinates",
      latitude: 50.45,
      longitude: 30.52,
    });
    expect(parseLocation({ lat: ["1", "2"], lon: "3" })).toEqual({ kind: "coordinates", latitude: 1, longitude: 3 });
  });

  it("reads a city name", () => {
    expect(parseLocation({ city: "  Kyiv " })).toEqual({ kind: "city", name: "Kyiv" });
  });

  it.each([
    { lat: "50" },
    { lon: "30" },
    { lat: "abc", lon: "30" },
    { lat: "91", lon: "30" },
    { lat: "50", lon: "181" },
    { city: "x".repeat(81) },
  ])("rejects %j", (params) => {
    expect(parseLocation(params)).toBeNull();
  });

  it("prefers coordinates over a city name", () => {
    expect(parseLocation({ city: "Kyiv", lat: "1", lon: "2" })).toMatchObject({ kind: "coordinates" });
  });
});

describe("locationKey", () => {
  it("identifies queries", () => {
    expect(locationKey(null)).toBe("invalid");
    expect(locationKey({ kind: "city", name: "KYIV" })).toBe("city:kyiv");
    expect(locationKey({ kind: "coordinates", latitude: 1, longitude: 2 })).toBe("1.00,2.00");
  });
});

describe("cityHref", () => {
  it("encodes the name", () => {
    expect(cityHref(" São Paulo ")).toBe("/?city=S%C3%A3o%20Paulo");
  });
});

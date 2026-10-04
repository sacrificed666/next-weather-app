import { describe, expect, it } from "vitest";

import { isLatitude, isLongitude, parsePlace, placeHref, placeKey, placeSearch, roundCoordinate } from "./place";

const lviv = { name: "Lviv", region: "Lviv Oblast", country: "UA", latitude: 49.8419, longitude: 24.0315 };

describe("place", () => {
  it("rounds coordinates to about a kilometre", () => {
    expect(roundCoordinate(49.8419)).toBe(49.84);
    expect(roundCoordinate(-0.1276)).toBe(-0.13);
  });

  it("validates coordinate ranges", () => {
    expect(isLatitude(90)).toBe(true);
    expect(isLatitude(90.1)).toBe(false);
    expect(isLongitude(-180)).toBe(true);
    expect(isLongitude(Number.NaN)).toBe(false);
  });

  it("builds stable keys and links", () => {
    expect(placeKey(lviv)).toBe("49.84,24.03");
    expect(placeSearch({ latitude: 50, longitude: -0.1276 })).toBe("?lat=50.00&lon=-0.13");
    expect(placeHref("uk", { latitude: 50, longitude: -0.1276 })).toBe("/uk?lat=50.00&lon=-0.13");
  });

  it("parses stored places field by field", () => {
    expect(parsePlace({ ...lviv, extra: true })).toEqual({ ...lviv, latitude: 49.84, longitude: 24.03 });
    expect(parsePlace({ ...lviv, region: " ", country: "ukraine" })).toEqual({
      ...lviv,
      region: null,
      country: null,
      latitude: 49.84,
      longitude: 24.03,
    });
  });

  it.each([
    null,
    [],
    { ...lviv, name: "" },
    { ...lviv, name: "x".repeat(81) },
    { ...lviv, latitude: 91 },
    { ...lviv, longitude: "24" },
  ])("rejects %j", (value) => {
    expect(parsePlace(value)).toBeNull();
  });
});

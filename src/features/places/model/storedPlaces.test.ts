import { describe, expect, it } from "vitest";

import type { Place } from "./place";
import {
  clearRecentPlaces,
  isSaved,
  recentPlaces,
  rememberPlace,
  removeSavedPlace,
  savedPlaces,
  toggleSavedPlace,
} from "./storedPlaces";

const place = (name: string, latitude: number): Place => ({
  name,
  region: null,
  country: "UA",
  latitude,
  longitude: 30,
});

describe("stored places", () => {
  it("saves, unsaves and removes places", () => {
    const kyiv = place("Kyiv", 50.45);
    toggleSavedPlace(kyiv);
    expect(isSaved(savedPlaces.getSnapshot(), kyiv)).toBe(true);
    toggleSavedPlace({ ...kyiv, name: "Київ" });
    expect(savedPlaces.getSnapshot()).toEqual([]);
    toggleSavedPlace(kyiv);
    removeSavedPlace(kyiv);
    expect(savedPlaces.getSnapshot()).toEqual([]);
  });

  it("keeps the five most recent places, newest first and without duplicates", () => {
    for (let index = 0; index < 7; index += 1) rememberPlace(place(`City ${index}`, index));
    rememberPlace(place("City 4", 4));
    expect(recentPlaces.getSnapshot().map((entry) => entry.name)).toEqual([
      "City 4",
      "City 6",
      "City 5",
      "City 3",
      "City 2",
    ]);
    clearRecentPlaces();
    expect(recentPlaces.getSnapshot()).toEqual([]);
  });
});

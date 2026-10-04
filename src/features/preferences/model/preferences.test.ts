import { describe, expect, it } from "vitest";

import { isPreferenceValue, isTheme } from "./preferences";

describe("preferences", () => {
  it("recognises themes", () => {
    expect(isTheme("dark")).toBe(true);
    expect(isTheme("sepia")).toBe(false);
  });

  it("validates values per preference", () => {
    expect(isPreferenceValue("theme", "light")).toBe(true);
    expect(isPreferenceValue("theme", "metric")).toBe(false);
    expect(isPreferenceValue("units", "imperial")).toBe(true);
    expect(isPreferenceValue("units", "dark")).toBe(false);
  });
});

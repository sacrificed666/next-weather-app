import { describe, expect, it } from "vitest";

import { isLocale, localeDetails, locales, matchLocale } from "./locales";

describe("locales", () => {
  it("recognises supported locales", () => {
    expect(isLocale("uk")).toBe(true);
    expect(isLocale("ru")).toBe(false);
    expect(isLocale(42)).toBe(false);
  });

  it("describes every locale", () => {
    for (const locale of locales) {
      expect(localeDetails[locale].intl.startsWith(locale)).toBe(true);
      expect(localeDetails[locale].flag).toMatch(/^[A-Z]{2}$/u);
    }
  });

  it.each([
    [null, "en"],
    ["", "en"],
    ["uk-UA,uk;q=0.9,en;q=0.8", "uk"],
    ["ru-RU,ru;q=0.9,de;q=0.7,en;q=0.5", "de"],
    ["en;q=0.2, pl;q=0.9", "pl"],
    ["fr-CA;q=0, it", "it"],
    ["ja, zh", "en"],
    ["*", "en"],
  ])("matches %j to %s", (header, locale) => {
    expect(matchLocale(header)).toBe(locale);
  });
});

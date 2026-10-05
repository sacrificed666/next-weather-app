import { afterEach, describe, expect, it, vi } from "vitest";

import { LOCALES } from "@/features/i18n/model/locales";

import sitemap from "./sitemap";

describe("sitemap.xml", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("lists the forecast in every language with its alternates", () => {
    vi.stubEnv("SITE_URL", "https://weather.example");
    const entries = sitemap();
    expect(entries.map((entry) => entry.url)).toEqual(LOCALES.map((locale) => `https://weather.example/${locale}`));
    expect(entries[0]?.alternates?.languages).toMatchObject({
      uk: "https://weather.example/uk",
      "x-default": "https://weather.example/",
    });
  });
});

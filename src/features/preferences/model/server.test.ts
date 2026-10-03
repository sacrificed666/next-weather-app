import { beforeEach, describe, expect, it, vi } from "vitest";

const request = vi.hoisted(() => ({ cookies: new Map<string, string>(), acceptLanguage: "" }));

vi.mock("next/headers", () => ({
  cookies: () =>
    Promise.resolve({
      get: (name: string) => (request.cookies.has(name) ? { value: request.cookies.get(name) } : undefined),
    }),
  headers: () => Promise.resolve(new Headers({ "accept-language": request.acceptLanguage })),
}));

const { getLocalization, getPreferences } = await import("./server");

describe("getPreferences", () => {
  beforeEach(() => {
    request.cookies.clear();
    request.acceptLanguage = "";
  });

  it("uses defaults and the browser language", async () => {
    request.acceptLanguage = "pl-PL,pl;q=0.9";
    await expect(getPreferences()).resolves.toEqual({ theme: "system", units: "metric", locale: "pl" });
  });

  it("reads saved preferences and ignores invalid ones", async () => {
    request.cookies.set("weather-theme", "dark");
    request.cookies.set("weather-units", "kelvin");
    request.cookies.set("weather-locale", "uk");
    await expect(getPreferences()).resolves.toEqual({ theme: "dark", units: "metric", locale: "uk" });
  });

  it("prepares translations and formatting", async () => {
    request.cookies.set("weather-locale", "uk");
    request.cookies.set("weather-units", "imperial");
    const { t, format, messages } = await getLocalization();
    expect(t("app.name")).toBe("Погода");
    expect(messages["app.name"]).toBe("Погода");
    expect(format.temperature(0)).toBe("32°");
  });
});

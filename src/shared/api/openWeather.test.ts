import { afterEach, describe, expect, it, vi } from "vitest";

import { jsonResponse } from "@/test/fixtures";

import { fetchOpenWeather } from "./openWeather";

describe("fetchOpenWeather", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("reports a missing API key without calling the service", async () => {
    vi.stubEnv("OPENWEATHERMAP_API_KEY", " ");
    const fetchMock = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchOpenWeather("/data/2.5/weather", {}, 60)).resolves.toEqual({ ok: false, failure: "missing-key" });
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends the parameters and key and caches the response", async () => {
    vi.stubEnv("OPENWEATHERMAP_API_KEY", "secret");
    const fetchMock = vi
      .fn<(input: URL, init: RequestInit) => Promise<Response>>()
      .mockResolvedValue(jsonResponse({ ok: 1 }));
    vi.stubGlobal("fetch", fetchMock);
    await expect(fetchOpenWeather("/data/2.5/weather", { lat: 1.5, units: "metric" }, 600)).resolves.toEqual({
      ok: true,
      data: { ok: 1 },
    });
    const [url, init] = fetchMock.mock.calls[0] ?? [];
    expect(url?.toString()).toBe("https://api.openweathermap.org/data/2.5/weather?lat=1.5&units=metric&appid=secret");
    expect(init?.next?.revalidate).toBe(600);
  });

  it.each([
    [401, "invalid-key"],
    [404, "not-found"],
    [429, "rate-limited"],
    [500, "unavailable"],
  ])("maps status %i to %s", async (status, failure) => {
    vi.stubEnv("OPENWEATHERMAP_API_KEY", "secret");
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(jsonResponse({}, status)));
    await expect(fetchOpenWeather("/x", {}, 60)).resolves.toEqual({ ok: false, failure });
  });

  it("treats network errors as an unavailable service", async () => {
    vi.stubEnv("OPENWEATHERMAP_API_KEY", "secret");
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new TypeError("offline")));
    await expect(fetchOpenWeather("/x", {}, 60)).resolves.toEqual({ ok: false, failure: "unavailable" });
  });
});

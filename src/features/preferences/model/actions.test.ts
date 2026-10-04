import { beforeEach, describe, expect, it, vi } from "vitest";

const set = vi.hoisted(() => vi.fn<(name: string, value: string, options: object) => void>());

vi.mock("next/headers", () => ({ cookies: () => Promise.resolve({ set }) }));

const { savePreference } = await import("./actions");

describe("savePreference", () => {
  beforeEach(() => {
    set.mockClear();
  });

  it("stores a valid preference in a long-lived, http-only cookie", async () => {
    await savePreference("theme", "dark");
    expect(set).toHaveBeenCalledWith("weather-theme", "dark", {
      path: "/",
      maxAge: 31_536_000,
      sameSite: "lax",
      httpOnly: true,
      secure: false,
    });
  });

  it("ignores unknown preferences and values", async () => {
    await savePreference("theme", "neon");
    await savePreference("units", "dark");
    await Reflect.apply(savePreference, undefined, ["toString", "dark"]);
    await Reflect.apply(savePreference, undefined, ["locale", "uk"]);
    expect(set).not.toHaveBeenCalled();
  });
});

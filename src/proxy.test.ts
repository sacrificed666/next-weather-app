import { NextRequest } from "next/server";
import { describe, expect, it } from "vitest";

import { config, proxy } from "./proxy";

describe("proxy", () => {
  it("adds a fresh nonce-based Content Security Policy to every page", () => {
    const first = proxy(new NextRequest("http://localhost/"));
    const second = proxy(new NextRequest("http://localhost/"));
    const policy = first.headers.get("content-security-policy") ?? "";
    expect(policy).toMatch(/script-src 'self' 'nonce-[A-Za-z0-9+/=]+' 'strict-dynamic'/u);
    expect(policy).not.toBe(second.headers.get("content-security-policy"));
  });

  it("skips API routes, static files and images", () => {
    const [matcher] = config.matcher;
    const pattern = new RegExp(`^${matcher?.source ?? ""}$`, "u");
    expect(pattern.test("/")).toBe(true);
    const skipped = ["/api/places", "/_next/static/x.js", "/icons/weather/rain.svg", "/flags/UA"];
    expect(skipped.filter((path) => pattern.test(path))).toEqual([]);
  });
});

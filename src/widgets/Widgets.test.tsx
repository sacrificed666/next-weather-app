import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { forecast, t, view } from "@/test/fixtures";
import { renderWithI18n } from "@/test/render";

import Footer from "./Footer/Footer";
import Forecast from "./Forecast/Forecast";
import Header from "./Header/Header";

const getForecast = vi.hoisted(() => vi.fn<(...args: unknown[]) => Promise<unknown>>());

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: vi.fn<(href: string) => void>(), refresh: vi.fn<() => void>() }),
  usePathname: () => "/en",
  useSearchParams: () => new URLSearchParams(),
}));
vi.mock("@/features/forecast/model/getForecast", () => ({ getForecast }));
vi.mock("@/features/preferences/model/server", async () => {
  const { view: createView } = await import("@/test/fixtures");
  const { t: translate, format } = createView();
  return {
    getLocalization: () =>
      Promise.resolve({
        locale: "en",
        preferences: { theme: "system", units: "metric", effects: "auto" },
        t: translate,
        format,
      }),
    getEffects: () => Promise.resolve({ level: "full", device: "full" }),
  };
});

describe("Header", () => {
  it("links home and offers search, location and settings", () => {
    renderWithI18n(
      <Header
        locale="en"
        preferences={{ theme: "system", units: "metric", effects: "auto" }}
        effects={{ level: "reduced", device: "reduced" }}
        t={t}
      />,
    );
    expect(screen.getByRole("link", { name: "Weather" })).toHaveAttribute("href", "/en");
    expect(document.querySelector('search form[action="/en"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Use my location" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(document.querySelector("header img")).toHaveAttribute("src", "/icons/weather-static/partly-cloudy-day.svg");
  });
});

describe("Footer", () => {
  it("credits the data, the icons and the author", () => {
    renderWithI18n(<Footer t={t} />);
    expect(screen.getByRole("link", { name: "OpenWeatherMap" })).toHaveAttribute("href", "https://openweathermap.org");
    expect(screen.getByRole("link", { name: "Meteocons" })).toHaveAttribute("rel", "noreferrer");
    expect(screen.getByRole("link", { name: "Source code" })).toHaveAttribute(
      "href",
      "https://github.com/sacrificed666/next-weather-app",
    );
    expect(screen.getAllByRole("link")).toHaveLength(3);
    expect(screen.getByText(`© ${new Date().getFullYear()} Illia Movchko`)).toBeInTheDocument();
  });
});

describe("Forecast", () => {
  beforeEach(() => {
    getForecast.mockReset();
  });

  it("renders every section of the forecast over a matching sky", async () => {
    getForecast.mockResolvedValue({ ok: true, forecast });
    const { container } = renderWithI18n(await Forecast({ query: { kind: "city", name: "Lviv" } }));
    expect(getForecast).toHaveBeenCalledWith({ kind: "city", name: "Lviv" }, "en");
    const schema: unknown = JSON.parse(
      container.querySelector('script[type="application/ld+json"]')?.textContent ?? "",
    );
    expect(schema).toHaveProperty(["@graph", "1", "@type"], "WebPage");
    expect(schema).toHaveProperty(["@graph", "1", "url"], "http://localhost:3000/en?lat=49.84&lon=24.03");
    expect(schema).toHaveProperty(["@graph", "1", "about", "name"], "Lviv");
    expect(container.querySelector("[data-sky]")).toHaveAttribute("data-sky", "rain");
    for (const name of [
      "Hourly forecast",
      "2-day forecast",
      "Air quality",
      "Sun",
      "Wind",
      "Humidity",
      "Pressure",
      "Cloud cover",
    ]) {
      expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    }
  });

  it("shows the failure reported by the service", async () => {
    getForecast.mockResolvedValue({ ok: false, failure: "rate-limited" });
    renderWithI18n(await Forecast({ query: { kind: "city", name: "Lviv" } }));
    expect(screen.getByRole("heading", { name: "Too many requests" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to the forecast" })).toHaveAttribute("href", "/en");
  });

  it("treats an invalid query as an unknown city", async () => {
    renderWithI18n(await Forecast({ query: null }));
    expect(getForecast).not.toHaveBeenCalled();
    expect(screen.getByRole("heading", { name: "City not found" })).toBeInTheDocument();
    expect(view().forecast.place.name).toBe("Lviv");
  });
});

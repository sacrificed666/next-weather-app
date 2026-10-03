import { act, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { NOW, view } from "@/test/fixtures";
import { renderWithI18n } from "@/test/render";

import AirQualityCard from "./AirQualityCard/AirQualityCard";
import CloudCoverCard from "./CloudCoverCard/CloudCoverCard";
import CurrentConditions from "./CurrentConditions/CurrentConditions";
import DailyForecast from "./DailyForecast/DailyForecast";
import FeelsLikeCard from "./FeelsLikeCard/FeelsLikeCard";
import HourlyForecast from "./HourlyForecast/HourlyForecast";
import HumidityCard from "./HumidityCard/HumidityCard";
import LocalClock from "./LocalClock/LocalClock";
import PrecipitationCard from "./PrecipitationCard/PrecipitationCard";
import PressureCard from "./PressureCard/PressureCard";
import Sky from "./Sky/Sky";
import SunCard from "./SunCard/SunCard";
import VisibilityCard from "./VisibilityCard/VisibilityCard";
import WindCard from "./WindCard/WindCard";

describe("CurrentConditions", () => {
  it("shows the place, the temperature and today's range", () => {
    renderWithI18n(<CurrentConditions {...view()} />);
    expect(screen.getByRole("heading", { level: 1, name: "Lviv" })).toBeInTheDocument();
    expect(screen.getByText("Lviv Oblast, Ukraine")).toBeInTheDocument();
    expect(screen.getByText("13°")).toBeInTheDocument();
    expect(screen.getByText("Light rain")).toBeInTheDocument();
    expect(screen.getByText("H: 18°")).toBeInTheDocument();
    expect(screen.getByText("L: 6°")).toBeInTheDocument();
    expect(screen.getByText("Feels like 11°")).toBeInTheDocument();
    expect(screen.getByText("Updated at 17:00")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Save Lviv" })).toBeInTheDocument();
  });

  it("works for places without a region, country or daily forecast", () => {
    renderWithI18n(
      <CurrentConditions
        {...view({ place: { name: "Ocean", region: null, country: null, latitude: 0, longitude: 0 }, daily: [] })}
      />,
    );
    expect(screen.getByRole("heading", { level: 1, name: "Ocean" })).toBeInTheDocument();
    expect(screen.queryByText(/^H:/u)).not.toBeInTheDocument();
  });
});

describe("LocalClock", () => {
  it("shows the date and time of the place and keeps ticking", () => {
    vi.useFakeTimers({ now: (NOW + 60) * 1000 });
    renderWithI18n(<LocalClock timezoneOffset={10_800} renderedAt={NOW + 60} />);
    expect(screen.getByText("Friday 3 October, 17:01")).toBeInTheDocument();
    act(() => {
      vi.advanceTimersByTime(60_000);
    });
    expect(screen.getByText("Friday 3 October, 17:02")).toBeInTheDocument();
    vi.useRealTimers();
  });
});

describe("HourlyForecast", () => {
  it("starts with now and lists the next hours with their chance of rain", () => {
    renderWithI18n(<HourlyForecast {...view()} />);
    const items = within(screen.getByRole("list")).getAllByRole("listitem");
    expect(items).toHaveLength(3);
    expect(within(items[0]!).getByText("Now")).toBeInTheDocument();
    expect(within(items[1]!).getByText("18:00")).toBeInTheDocument();
    expect(within(items[1]!).getByText("40% chance of precipitation")).toBeInTheDocument();
    expect(within(items[2]!).queryByText(/chance/u)).not.toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Broken clouds" })).toBeInTheDocument();
  });
});

describe("DailyForecast", () => {
  it("lists the days with readable ranges", () => {
    renderWithI18n(<DailyForecast {...view()} />);
    expect(screen.getByRole("heading", { name: "2-day forecast" })).toBeInTheDocument();
    expect(screen.getByText("Today")).toBeInTheDocument();
    expect(screen.getByText("Sat")).toBeInTheDocument();
    expect(screen.getByText("from 6° to 18°")).toBeInTheDocument();
    expect(screen.getByText("80% chance of precipitation")).toBeInTheDocument();
  });
});

describe("detail cards", () => {
  it("describes the wind", () => {
    renderWithI18n(<WindCard {...view()} />);
    expect(screen.getByText("5 m/s")).toBeInTheDocument();
    expect(screen.getByText("9 m/s")).toBeInTheDocument();
    expect(screen.getByText("235° SW")).toBeInTheDocument();
  });

  it("calls a still day calm and hides missing wind details", () => {
    const { forecast } = view();
    renderWithI18n(
      <WindCard {...view({ current: { ...forecast.current, wind: { speed: 0.2, gust: null, direction: null } } })} />,
    );
    expect(screen.getByText("Calm")).toBeInTheDocument();
    expect(screen.queryByText("Gusts")).not.toBeInTheDocument();
    expect(screen.queryByText("Direction")).not.toBeInTheDocument();
  });

  it("shows humidity with the dew point, the apparent temperature and cloud cover", () => {
    renderWithI18n(
      <>
        <HumidityCard {...view()} />
        <FeelsLikeCard {...view()} />
        <CloudCoverCard {...view()} />
        <PrecipitationCard {...view()} />
      </>,
    );
    expect(screen.getByText("78%")).toBeInTheDocument();
    expect(screen.getByText("The dew point is 9° right now.")).toBeInTheDocument();
    expect(screen.getByText("The wind makes it feel colder.")).toBeInTheDocument();
    expect(screen.getByText("75%")).toBeInTheDocument();
    expect(screen.getByText("Mostly cloudy.")).toBeInTheDocument();
    expect(screen.getByText("0.4 mm")).toBeInTheDocument();
  });

  it("shows pressure in the selected units", () => {
    const imperial = { ...view(), format: { ...view().format, units: "imperial" as const, pressure: () => "29.8" } };
    renderWithI18n(<PressureCard {...view()} />);
    expect(screen.getByText("1,009")).toBeInTheDocument();
    expect(screen.getByText("hPa")).toBeInTheDocument();
    expect(screen.getByText("Normal")).toBeInTheDocument();
    renderWithI18n(<PressureCard {...imperial} />);
    expect(screen.getByText("inHg")).toBeInTheDocument();
  });

  it("shows visibility only when it is known", () => {
    const { forecast } = view();
    const { container } = renderWithI18n(
      <VisibilityCard {...view({ current: { ...forecast.current, visibility: null } })} />,
    );
    expect(container).toBeEmptyDOMElement();
    renderWithI18n(<VisibilityCard {...view()} />);
    expect(screen.getByText("10 km")).toBeInTheDocument();
    expect(screen.getByText("Perfectly clear view.")).toBeInTheDocument();
  });

  it("shows sunrise, sunset and the length of the day", () => {
    renderWithI18n(<SunCard {...view()} />);
    expect(screen.getByText("07:32")).toBeInTheDocument();
    expect(screen.getByText("19:01")).toBeInTheDocument();
    expect(screen.getByText("11 hrs 29 mins of daylight")).toBeInTheDocument();
  });

  it("explains polar days and nights", () => {
    const { forecast } = view();
    renderWithI18n(<SunCard {...view({ current: { ...forecast.current, sunrise: null, sunset: null } })} />);
    expect(screen.getByText("The sun does not rise or set today.")).toBeInTheDocument();
  });

  it("does not draw the sun at night", () => {
    const { container } = renderWithI18n(<SunCard {...view({ generatedAt: NOW + 10 * 3600 })} />);
    expect(container.querySelector("circle")).toBeNull();
  });

  it("rates the air quality and lists known pollutants", () => {
    renderWithI18n(<AirQualityCard {...view()} />);
    expect(screen.getByText("Fair")).toBeInTheDocument();
    expect(screen.getByText("Acceptable for most people.")).toBeInTheDocument();
    expect(screen.getByText("Index 2 of 5")).toBeInTheDocument();
    expect(screen.getByText("PM2.5")).toBeInTheDocument();
    expect(screen.queryByText("NO₂")).not.toBeInTheDocument();
  });

  it("explains missing air quality data", () => {
    renderWithI18n(<AirQualityCard {...view({ airQuality: null })} />);
    expect(screen.getByText("No air quality data for this place.")).toBeInTheDocument();
  });
});

describe("Sky", () => {
  it("exposes the sky to the styles and hides it from assistive technology", () => {
    const { container } = renderWithI18n(<Sky sky="clear-night" />);
    const sky = container.querySelector("[data-sky]");
    expect(sky).toHaveAttribute("data-sky", "clear-night");
    expect(sky).toHaveAttribute("aria-hidden", "true");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import Card from "./Card/Card";
import Flag from "./Flag/Flag";
import Icon from "./Icon/Icon";
import IconButton from "./IconButton/IconButton";
import SegmentedControl from "./SegmentedControl/SegmentedControl";
import WeatherIcon from "./WeatherIcon/WeatherIcon";

describe("shared UI", () => {
  it("draws decorative outlined icons in the requested size", () => {
    const { container } = render(<Icon name="search" size={32} />);
    const icon = container.querySelector("svg");
    expect(icon).toHaveAttribute("aria-hidden", "true");
    expect(icon).toHaveAttribute("fill", "none");
    expect(icon).toHaveAttribute("stroke", "currentColor");
    expect(icon).toHaveAttribute("width", "32");
  });

  it("labels icon buttons and shows a spinner while busy", async () => {
    const onClick = vi.fn<() => void>();
    const { rerender } = render(<IconButton icon="locate" label="Locate" onClick={onClick} />);
    await userEvent.click(screen.getByRole("button", { name: "Locate" }));
    expect(onClick).toHaveBeenCalledTimes(1);
    rerender(<IconButton icon="locate" label="Locate" busy />);
    expect(screen.getByRole("button", { name: "Locate" })).toHaveAttribute("aria-busy", "true");
  });

  it("names cards after their heading", () => {
    render(
      <Card title="Wind" icon="wind">
        <p>Calm</p>
      </Card>,
    );
    expect(screen.getByRole("region", { name: "Wind" })).toHaveTextContent("Calm");
  });

  it("switches segments like radio buttons", async () => {
    const onChange = vi.fn<(value: string) => void>();
    render(
      <SegmentedControl
        legend="Units"
        name="units"
        value="metric"
        onChange={onChange}
        options={[
          { value: "metric", label: "Metric" },
          { value: "imperial", label: "Imperial", icon: "ruler" },
        ]}
      />,
    );
    expect(screen.getByRole("group", { name: "Units" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { name: "Metric" })).toBeChecked();
    await userEvent.click(screen.getByRole("radio", { name: "Imperial" }));
    expect(onChange).toHaveBeenCalledWith("imperial");
  });

  it("shows still icons when the effects are reduced", () => {
    render(<WeatherIcon name="snow" size={40} label="Snow" animated={false} />);
    const weather = screen.getByRole("img", { name: "Snow" });
    expect(weather).toHaveAttribute("src", "/icons/weather-static/snow.svg");
    expect(weather.closest("picture")).toBeNull();
  });

  it("loads weather icons and flags from the app itself", () => {
    render(
      <>
        <WeatherIcon name="rain" size={48} label="Rain" priority />
        <Flag country="UA" />
      </>,
    );
    const weather = screen.getByRole("img", { name: "Rain" });
    expect(weather).toHaveAttribute("src", "/icons/weather/rain.svg");
    expect(weather).toHaveAttribute("loading", "eager");
    expect(weather.parentElement?.querySelector("source")).toHaveAttribute("srcset", "/icons/weather-static/rain.svg");
    expect(weather.parentElement?.querySelector("source")).toHaveAttribute("media", "(prefers-reduced-motion: reduce)");
    const flag = document.querySelector("img[src='/flags/UA']");
    expect(flag).toHaveAttribute("width", "24");
    expect(flag).toHaveAttribute("alt", "");
  });
});

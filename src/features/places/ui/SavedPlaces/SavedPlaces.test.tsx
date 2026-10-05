import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithI18n } from "@/test/render";

import type { Place } from "../../model/place";
import { toggleSavedPlace } from "../../model/storedPlaces";
import SavedPlaces from "./SavedPlaces";

const push = vi.hoisted(() => vi.fn<(href: string) => void>());

vi.mock("next/navigation", () => ({ useRouter: () => ({ push }) }));

const kyiv: Place = { name: "Kyiv", region: "Kyiv City", country: "UA", latitude: 50.45, longitude: 30.52 };
const lviv: Place = { name: "Lviv", region: "Lviv Oblast", country: "UA", latitude: 49.84, longitude: 24.03 };

beforeEach(() => {
  push.mockReset();
});

describe("SavedPlaces", () => {
  it("lists saved places, marks the open one and removes them", async () => {
    toggleSavedPlace(lviv);
    toggleSavedPlace(kyiv);
    const { user } = renderWithI18n(<SavedPlaces activeKey="49.84,24.03" />);
    const navigation = screen.getByRole("navigation", { name: "Saved places" });
    expect(navigation).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Lviv" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Kyiv" })).toHaveAttribute("href", "/en?lat=50.45&lon=30.52");
    await user.click(screen.getByRole("button", { name: "Remove Kyiv from saved places" }));
    expect(screen.queryByRole("link", { name: "Kyiv" })).not.toBeInTheDocument();
  });

  it("renders nothing without saved places", () => {
    const { container } = renderWithI18n(<SavedPlaces activeKey={null} />);
    expect(container).toBeEmptyDOMElement();
  });
});

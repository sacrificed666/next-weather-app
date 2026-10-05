import { screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithI18n } from "@/test/render";

import SettingsMenu from "./SettingsMenu";

const savePreference = vi.hoisted(() => vi.fn<(name: string, value: string) => Promise<void>>(() => Promise.resolve()));
const offline = vi.hoisted(() => ({ value: false }));

const location = vi.hoisted(() => ({ pathname: "/en", search: "city=Kyiv" }));

vi.mock("../../model/actions", () => ({ savePreference }));
vi.mock("next/navigation", () => ({
  usePathname: () => location.pathname,
  useSearchParams: () => new URLSearchParams(location.search),
}));
vi.mock("next/offline", () => ({ useOffline: () => offline.value }));

const effects = () => screen.getByRole("group", { hidden: true, name: "Effects" });

describe("SettingsMenu", () => {
  beforeEach(() => {
    savePreference.mockClear();
    document.documentElement.removeAttribute("data-theme");
    document.documentElement.removeAttribute("data-effects");
  });

  it("opens the settings panel from the toolbar button", () => {
    renderWithI18n(
      <SettingsMenu preferences={{ theme: "system", units: "metric", effects: "auto" }} deviceEffects="reduced" />,
    );
    const button = screen.getByRole("button", { name: "Settings" });
    const panel = document.getElementById(button.getAttribute("popovertarget") ?? "");
    expect(panel?.tagName).toBe("DIALOG");
    expect(panel).toHaveAttribute("popover", "auto");
    expect(document.getElementById(panel?.getAttribute("aria-labelledby") ?? "")).toHaveTextContent("Settings");
  });

  it("applies the theme at once and saves it", async () => {
    const { user } = renderWithI18n(
      <SettingsMenu preferences={{ theme: "system", units: "metric", effects: "auto" }} deviceEffects="reduced" />,
    );
    const appearance = within(screen.getByRole("group", { hidden: true, name: "Appearance" }));
    expect(appearance.getByRole("radio", { hidden: true, name: "Auto" })).toBeChecked();
    await user.click(appearance.getByRole("radio", { hidden: true, name: "Dark" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(savePreference).toHaveBeenCalledWith("theme", "dark");
  });

  it("switches the effects at once, explains Auto and saves the choice", async () => {
    const { user, rerender } = renderWithI18n(
      <SettingsMenu preferences={{ theme: "system", units: "metric", effects: "auto" }} deviceEffects="reduced" />,
    );
    expect(effects()).toHaveAccessibleDescription("On this device: Reduced");
    await user.click(within(effects()).getByRole("radio", { hidden: true, name: "Full" }));
    expect(document.documentElement.dataset.effects).toBe("full");
    expect(savePreference).toHaveBeenCalledWith("effects", "full");

    rerender(
      <SettingsMenu preferences={{ theme: "system", units: "metric", effects: "full" }} deviceEffects="reduced" />,
    );
    expect(effects()).not.toHaveAccessibleDescription();
    await user.click(within(effects()).getByRole("radio", { hidden: true, name: "Auto" }));
    expect(document.documentElement.dataset.effects).toBe("reduced");
  });

  it("saves units without touching the theme", async () => {
    const { user } = renderWithI18n(
      <SettingsMenu preferences={{ theme: "light", units: "metric", effects: "auto" }} deviceEffects="reduced" />,
    );
    await user.click(screen.getByRole("radio", { hidden: true, name: "°F, mph" }));
    expect(savePreference).toHaveBeenCalledWith("units", "imperial");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("links every language to the same place and remembers the choice", async () => {
    location.pathname = "/en";
    location.search = "city=Kyiv";
    const { user } = renderWithI18n(
      <SettingsMenu preferences={{ theme: "light", units: "metric", effects: "auto" }} deviceEffects="reduced" />,
    );
    const ukrainian = screen.getByRole("link", { hidden: true, name: "Українська" });
    expect(ukrainian).toHaveAttribute("href", "/uk?city=Kyiv");
    expect(ukrainian).toHaveAttribute("hreflang", "uk");
    expect(screen.getByRole("link", { hidden: true, name: "English" })).toHaveAttribute("aria-current", "true");
    ukrainian.addEventListener("click", (event) => event.preventDefault());
    await user.click(ukrainian);
    expect(document.cookie).toContain("weather-locale=uk");
  });

  it("speaks the current language", () => {
    location.pathname = "/uk/nowhere";
    location.search = "";
    renderWithI18n(
      <SettingsMenu preferences={{ theme: "system", units: "imperial", effects: "auto" }} deviceEffects="reduced" />,
      "uk",
    );
    expect(screen.getByRole("button", { name: "Налаштування" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { hidden: true, name: "°F, mph" })).toBeChecked();
    expect(screen.getByRole("link", { hidden: true, name: "Українська" })).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("link", { hidden: true, name: "Polski" })).toHaveAttribute("href", "/pl/nowhere");
  });
});

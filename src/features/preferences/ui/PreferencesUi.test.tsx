import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { renderWithI18n } from "@/test/render";

import OfflineNotice from "./OfflineNotice/OfflineNotice";
import SettingsMenu from "./SettingsMenu/SettingsMenu";

const savePreference = vi.hoisted(() => vi.fn<(name: string, value: string) => Promise<void>>(() => Promise.resolve()));
const offline = vi.hoisted(() => ({ value: false }));

vi.mock("../model/actions", () => ({ savePreference }));
vi.mock("next/offline", () => ({ useOffline: () => offline.value }));

describe("SettingsMenu", () => {
  beforeEach(() => {
    savePreference.mockClear();
    document.documentElement.removeAttribute("data-theme");
  });

  it("opens the settings panel from the toolbar button", () => {
    renderWithI18n(<SettingsMenu preferences={{ theme: "system", units: "metric", locale: "en" }} />);
    const button = screen.getByRole("button", { name: "Settings" });
    const panel = document.getElementById(button.getAttribute("popovertarget") ?? "");
    expect(panel?.tagName).toBe("DIALOG");
    expect(panel).toHaveAttribute("popover", "auto");
    expect(document.getElementById(panel?.getAttribute("aria-labelledby") ?? "")).toHaveTextContent("Settings");
  });

  it("applies the theme at once and saves it", async () => {
    const { user } = renderWithI18n(<SettingsMenu preferences={{ theme: "system", units: "metric", locale: "en" }} />);
    expect(screen.getByRole("radio", { hidden: true, name: "Auto" })).toBeChecked();
    await user.click(screen.getByRole("radio", { hidden: true, name: "Dark" }));
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(savePreference).toHaveBeenCalledWith("theme", "dark");
  });

  it("saves units and language", async () => {
    const { user } = renderWithI18n(<SettingsMenu preferences={{ theme: "light", units: "metric", locale: "en" }} />);
    await user.click(screen.getByRole("radio", { hidden: true, name: "°F, mph" }));
    await user.click(screen.getByRole("radio", { hidden: true, name: "Українська" }));
    expect(savePreference).toHaveBeenNthCalledWith(1, "units", "imperial");
    expect(savePreference).toHaveBeenNthCalledWith(2, "locale", "uk");
    expect(document.documentElement).not.toHaveAttribute("data-theme");
  });

  it("speaks the current language", () => {
    renderWithI18n(<SettingsMenu preferences={{ theme: "system", units: "imperial", locale: "uk" }} />, "uk");
    expect(screen.getByRole("button", { name: "Налаштування" })).toBeInTheDocument();
    expect(screen.getByRole("radio", { hidden: true, name: "°F, mph" })).toBeChecked();
    expect(screen.getByRole("radio", { hidden: true, name: "Українська" })).toBeChecked();
  });
});

describe("OfflineNotice", () => {
  it("appears only while offline", () => {
    offline.value = false;
    const { rerender } = renderWithI18n(<OfflineNotice />);
    expect(screen.getByRole("status", { hidden: true })).not.toBeVisible();
    offline.value = true;
    rerender(<OfflineNotice />);
    expect(screen.getByRole("status", { hidden: true })).toHaveTextContent("You are offline");
  });
});

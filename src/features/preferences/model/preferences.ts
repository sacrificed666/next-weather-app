import { isLocale, type Locale } from "@/features/i18n/model/locales";
import { isUnitSystem, type UnitSystem } from "@/shared/lib/units";

export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && (themes as readonly string[]).includes(value);

export interface Preferences {
  theme: Theme;
  units: UnitSystem;
  locale: Locale;
}

export type PreferenceName = keyof Preferences;

export const preferenceCookies: Record<PreferenceName, string> = {
  theme: "weather-theme",
  units: "weather-units",
  locale: "weather-locale",
};

export const defaultPreferences: Omit<Preferences, "locale"> = { theme: "system", units: "metric" };

export const isPreferenceValue = <Name extends PreferenceName>(
  name: Name,
  value: unknown,
): value is Preferences[Name] => {
  if (name === "theme") return isTheme(value);
  if (name === "units") return isUnitSystem(value);
  return isLocale(value);
};

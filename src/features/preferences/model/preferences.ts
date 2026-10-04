import { isUnitSystem, type UnitSystem } from "@/shared/lib/units";

export const themes = ["system", "light", "dark"] as const;

export type Theme = (typeof themes)[number];

export const isTheme = (value: unknown): value is Theme =>
  typeof value === "string" && (themes as readonly string[]).includes(value);

export const effectsChoices = ["auto", "full", "reduced"] as const;

export type Effects = (typeof effectsChoices)[number];

export type EffectsLevel = Exclude<Effects, "auto">;

export const isEffects = (value: unknown): value is Effects =>
  typeof value === "string" && (effectsChoices as readonly string[]).includes(value);

const RICH_EFFECTS_DEVICES = /Mac|iPhone|iPad|iPod/u;

export const resolveEffects = (effects: Effects, userAgent: string | null): EffectsLevel => {
  if (effects !== "auto") return effects;
  return RICH_EFFECTS_DEVICES.test(userAgent ?? "") ? "full" : "reduced";
};

export interface EffectsState {
  level: EffectsLevel;
  device: EffectsLevel;
}

export interface Preferences {
  theme: Theme;
  units: UnitSystem;
  effects: Effects;
}

export type PreferenceName = keyof Preferences;

export const preferenceCookies: Record<PreferenceName, string> = {
  theme: "weather-theme",
  units: "weather-units",
  effects: "weather-effects",
};

export const defaultPreferences: Preferences = { theme: "system", units: "metric", effects: "auto" };

export const isPreferenceValue = <Name extends PreferenceName>(
  name: Name,
  value: unknown,
): value is Preferences[Name] => {
  if (name === "theme") return isTheme(value);
  if (name === "units") return isUnitSystem(value);
  return isEffects(value);
};

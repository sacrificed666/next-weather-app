import { clamp } from "@/shared/lib/guards";

export const COMPASS_POINTS = ["n", "ne", "e", "se", "s", "sw", "w", "nw"] as const;

export type CompassPoint = (typeof COMPASS_POINTS)[number];

export const compassPoint = (degrees: number): CompassPoint =>
  COMPASS_POINTS[Math.round((((degrees % 360) + 360) % 360) / 45) % COMPASS_POINTS.length] ?? "n";

export type FeelsLike = "similar" | "colder" | "warmer";

export const feelsLike = (actual: number, apparent: number): FeelsLike => {
  if (Math.abs(apparent - actual) < 2) return "similar";
  return apparent < actual ? "colder" : "warmer";
};

export type PressureLevel = "low" | "normal" | "high";

export const PRESSURE_SCALE = { min: 960, max: 1060 } as const;

export const pressureLevel = (hectopascals: number): PressureLevel => {
  if (hectopascals < 1006) return "low";
  if (hectopascals > 1020) return "high";
  return "normal";
};

export type VisibilityLevel = "clear" | "hazy" | "poor";

export const visibilityLevel = (meters: number): VisibilityLevel => {
  if (meters >= 10_000) return "clear";
  if (meters >= 4000) return "hazy";
  return "poor";
};

export type CloudLevel = "clear" | "partly" | "mostly" | "overcast";

export const cloudLevel = (percent: number): CloudLevel => {
  if (percent < 20) return "clear";
  if (percent < 60) return "partly";
  if (percent < 90) return "mostly";
  return "overcast";
};

export const progress = (value: number, min: number, max: number) =>
  max === min ? 0.5 : clamp((value - min) / (max - min), 0, 1);

export const daylightProgress = (now: number, sunrise: number, sunset: number) =>
  now < sunrise || now > sunset ? null : progress(now, sunrise, sunset);

export const TEMPERATURE_SCALE = { min: -10, max: 35 } as const;

export const TEMPERATURE_STOPS = [
  { celsius: -10, color: "#5aa7ff" },
  { celsius: 5, color: "#5ed3c4" },
  { celsius: 15, color: "#9ad66b" },
  { celsius: 25, color: "#ffc145" },
  { celsius: 35, color: "#ff7a45" },
] as const;

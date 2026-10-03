export const unitSystems = ["metric", "imperial"] as const;

export type UnitSystem = (typeof unitSystems)[number];

export const isUnitSystem = (value: unknown): value is UnitSystem =>
  typeof value === "string" && (unitSystems as readonly string[]).includes(value);

export const celsiusToFahrenheit = (celsius: number) => (celsius * 9) / 5 + 32;

export const metersPerSecondToMilesPerHour = (speed: number) => speed * 2.236_936;

export const hectopascalsToInchesOfMercury = (pressure: number) => pressure * 0.029_53;

export const metersToMiles = (meters: number) => meters / 1609.344;

export const millimetersToInches = (millimeters: number) => millimeters / 25.4;

export const dewPoint = (celsius: number, humidity: number) => {
  const a = 17.62;
  const b = 243.12;
  const gamma = Math.log(Math.max(humidity, 1) / 100) + (a * celsius) / (b + celsius);
  return (b * gamma) / (a - gamma);
};

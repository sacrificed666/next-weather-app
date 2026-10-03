export type UnknownRecord = Readonly<Record<string, unknown>>;

export const isRecord = (value: unknown): value is UnknownRecord =>
  typeof value === "object" && value !== null && !Array.isArray(value);

export const readRecord = (source: unknown, key: string): UnknownRecord | null => {
  const value = isRecord(source) ? source[key] : undefined;
  return isRecord(value) ? value : null;
};

export const readNumber = (source: unknown, key: string): number | null => {
  const value = isRecord(source) ? source[key] : undefined;
  return typeof value === "number" && Number.isFinite(value) ? value : null;
};

export const readString = (source: unknown, key: string): string | null => {
  const value = isRecord(source) ? source[key] : undefined;
  return typeof value === "string" && value.trim() !== "" ? value.trim() : null;
};

export const readArray = (source: unknown, key: string): readonly unknown[] => {
  const value = isRecord(source) ? source[key] : undefined;
  return Array.isArray(value) ? value : [];
};

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

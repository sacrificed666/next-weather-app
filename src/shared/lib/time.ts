export const toLocalDate = (unixSeconds: number, offsetSeconds: number) =>
  new Date((unixSeconds + offsetSeconds) * 1000);

export const localDayKey = (unixSeconds: number, offsetSeconds: number) =>
  toLocalDate(unixSeconds, offsetSeconds).toISOString().slice(0, 10);

export const localHour = (unixSeconds: number, offsetSeconds: number) =>
  toLocalDate(unixSeconds, offsetSeconds).getUTCHours();

export const currentYear = () => new Date().getFullYear();

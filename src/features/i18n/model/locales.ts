export const locales = ["en", "uk", "de", "es", "fr", "it", "nl", "pl"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeCookie = "weather-locale";

export const localeHeader = "x-weather-locale";

export interface LocaleDetails {
  name: string;
  intl: string;
  flag: string;
  openGraph: string;
}

export const localeDetails: Record<Locale, LocaleDetails> = {
  en: { name: "English", intl: "en-GB", flag: "GB", openGraph: "en_GB" },
  uk: { name: "Українська", intl: "uk-UA", flag: "UA", openGraph: "uk_UA" },
  de: { name: "Deutsch", intl: "de-DE", flag: "DE", openGraph: "de_DE" },
  es: { name: "Español", intl: "es-ES", flag: "ES", openGraph: "es_ES" },
  fr: { name: "Français", intl: "fr-FR", flag: "FR", openGraph: "fr_FR" },
  it: { name: "Italiano", intl: "it-IT", flag: "IT", openGraph: "it_IT" },
  nl: { name: "Nederlands", intl: "nl-NL", flag: "NL", openGraph: "nl_NL" },
  pl: { name: "Polski", intl: "pl-PL", flag: "PL", openGraph: "pl_PL" },
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (locales as readonly string[]).includes(value);

export const homeHref = (locale: Locale): `/${Locale}` => `/${locale}`;

export const switchLocale = (pathname: string, locale: Locale) => {
  const [, first = "", ...rest] = pathname.split("/");
  const tail = isLocale(first) ? rest : [first, ...rest];
  return ["", locale, ...tail.filter(Boolean)].join("/");
};

interface WeightedLanguage {
  language: string;
  weight: number;
}

const parseAcceptLanguage = (header: string): WeightedLanguage[] =>
  header
    .split(",")
    .map((part) => {
      const [tag = "", ...parameters] = part.trim().split(";");
      const quality = parameters.map((parameter) => parameter.trim()).find((parameter) => parameter.startsWith("q="));
      const weight = quality ? Number.parseFloat(quality.slice(2)) : 1;
      return { language: tag.trim().toLowerCase().split("-")[0] ?? "", weight: Number.isFinite(weight) ? weight : 0 };
    })
    .filter((entry) => entry.language !== "" && entry.weight > 0)
    .toSorted((a, b) => b.weight - a.weight);

export const matchLocale = (acceptLanguage: string | null | undefined): Locale => {
  if (!acceptLanguage) return defaultLocale;
  const match = parseAcceptLanguage(acceptLanguage).find((entry) => isLocale(entry.language));
  return match && isLocale(match.language) ? match.language : defaultLocale;
};

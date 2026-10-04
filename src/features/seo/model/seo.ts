import type { Metadata } from "next";

import type { Forecast } from "@/features/forecast/model/types";
import { homeHref, localeDetails, locales, type Locale } from "@/features/i18n/model/locales";
import type { Translate } from "@/features/i18n/model/translate";
import type { Formatter } from "@/shared/lib/format";
import { site } from "@/shared/lib/site";

export type Schema = Readonly<Record<string, unknown>>;

export interface Alternates {
  canonical: string;
  languages: Record<string, string>;
}

export interface SocialPage {
  title: string;
  description: string;
  url?: string;
}

export interface PageDescription {
  title: string;
  description: string;
}

export const documentTitle = (title: string, t: Translate) => ({ absolute: `${title} · ${t("app.name")}` });

export const alternates = (locale: Locale, search = ""): Alternates => ({
  canonical: `${homeHref(locale)}${search}`,
  languages: {
    ...Object.fromEntries(locales.map((entry) => [entry, `${homeHref(entry)}${search}`])),
    "x-default": `/${search}`,
  },
});

export const social = (locale: Locale, t: Translate, page: SocialPage): Pick<Metadata, "openGraph" | "twitter"> => ({
  openGraph: {
    type: "website",
    siteName: t("app.name"),
    locale: localeDetails[locale].openGraph,
    alternateLocale: locales.filter((entry) => entry !== locale).map((entry) => localeDetails[entry].openGraph),
    title: page.title,
    description: page.description,
    ...(page.url === undefined ? {} : { url: page.url }),
  },
  twitter: { card: "summary_large_image", title: page.title, description: page.description },
});

export const describeForecast = ({ place, current }: Forecast, t: Translate, format: Formatter): PageDescription => {
  const summary = `${format.temperature(current.temperature)} · ${format.sentence(current.condition.description)}`;
  return { title: `${place.name} ${summary}`, description: `${place.name}: ${summary}. ${t("app.description")}` };
};

export const serializeJsonLd = (data: Schema) => JSON.stringify(data).replaceAll("<", "\\u003c");

const websiteId = (base: URL, locale: Locale) => new URL(`${homeHref(locale)}#website`, base).href;

const website = (base: URL, locale: Locale, t: Translate): Schema => {
  const home = new URL(homeHref(locale), base).href;
  return {
    "@type": "WebSite",
    "@id": websiteId(base, locale),
    name: t("app.name"),
    url: home,
    description: t("app.description"),
    inLanguage: locale,
    author: { "@type": "Person", name: site.author.name, url: site.author.url },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${home}?city={city}` },
      "query-input": "required name=city",
    },
  };
};

const place = ({ name, region, country, latitude, longitude }: Forecast["place"]): Schema => ({
  "@type": "Place",
  name,
  ...(country === null
    ? {}
    : {
        address: {
          "@type": "PostalAddress",
          addressCountry: country,
          ...(region === null ? {} : { addressRegion: region }),
        },
      }),
  geo: { "@type": "GeoCoordinates", latitude, longitude },
});

export const forecastSchema = (
  forecast: Forecast,
  page: PageDescription & { path: string },
  base: URL,
  locale: Locale,
  t: Translate,
): Schema => {
  const url = new URL(page.path, base).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      website(base, locale, t),
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: page.title,
        description: page.description,
        inLanguage: locale,
        dateModified: new Date(forecast.generatedAt * 1000).toISOString(),
        isPartOf: { "@id": websiteId(base, locale) },
        about: place(forecast.place),
      },
    ],
  };
};

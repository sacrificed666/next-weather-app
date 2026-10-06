import type { MetadataRoute } from "next";

import { homeHref, LOCALES } from "@/features/i18n/model/locales";
import { alternates } from "@/features/seo/model/seo";
import { siteUrl } from "@/shared/lib/site";

// Sitemap with the home page of every language
const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteUrl();
  const languages = Object.fromEntries(
    Object.entries(alternates("en").languages).map(([language, href]) => [language, new URL(href, base).href]),
  );
  return LOCALES.map((locale) => ({
    url: new URL(homeHref(locale), base).href,
    changeFrequency: "hourly",
    priority: 1,
    alternates: { languages },
  }));
};

export default sitemap;

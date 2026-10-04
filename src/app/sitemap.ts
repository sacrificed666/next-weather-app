import type { MetadataRoute } from "next";

import { homeHref, locales } from "@/features/i18n/model/locales";
import { alternates } from "@/features/seo/model/seo";
import { siteUrl } from "@/shared/lib/site";

const sitemap = (): MetadataRoute.Sitemap => {
  const base = siteUrl();
  const languages = Object.fromEntries(
    Object.entries(alternates("en").languages).map(([language, href]) => [language, new URL(href, base).href]),
  );
  return locales.map((locale) => ({
    url: new URL(homeHref(locale), base).href,
    changeFrequency: "hourly",
    priority: 1,
    alternates: { languages },
  }));
};

export default sitemap;

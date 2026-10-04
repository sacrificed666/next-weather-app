import type { MetadataRoute } from "next";

import { isIndexable, siteUrl } from "@/shared/lib/site";

const robots = (): MetadataRoute.Robots => {
  const base = siteUrl();
  if (!isIndexable()) return { rules: { userAgent: "*", disallow: "/" } };
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/api/" },
    sitemap: new URL("/sitemap.xml", base).href,
    host: base.origin,
  };
};

export default robots;

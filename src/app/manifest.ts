import type { MetadataRoute } from "next";

import { en } from "@/features/i18n/model/messages/en";
import { site } from "@/shared/lib/site";

const manifest = (): MetadataRoute.Manifest => ({
  id: "/",
  name: en["app.name"],
  short_name: en["app.name"],
  description: en["app.description"],
  lang: "en",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: site.themeColor.dark,
  theme_color: site.themeColor.dark,
  categories: ["weather", "utilities"],
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    { src: "/apple-icon", sizes: "180x180", type: "image/png" },
  ],
});

export default manifest;

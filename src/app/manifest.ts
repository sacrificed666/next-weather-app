import type { MetadataRoute } from "next";

import { en } from "@/features/i18n/model/messages/en";
import { SITE } from "@/shared/lib/site";

// Web app manifest with the name, colours and icons
const manifest = (): MetadataRoute.Manifest => ({
  id: "/",
  name: en["app.name"],
  short_name: en["app.name"],
  description: en["app.description"],
  lang: "en",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: SITE.themeColor.dark,
  theme_color: SITE.themeColor.dark,
  categories: ["weather", "utilities"],
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    { src: "/apple-icon", sizes: "180x180", type: "image/png" },
  ],
});

export default manifest;

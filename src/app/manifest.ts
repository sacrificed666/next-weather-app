import type { MetadataRoute } from "next";

import { en } from "@/features/i18n/model/messages/en";

const manifest = (): MetadataRoute.Manifest => ({
  name: en["app.name"],
  short_name: en["app.name"],
  description: en["app.description"],
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#0a1020",
  theme_color: "#0a1020",
  categories: ["weather", "utilities"],
  icons: [
    { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
    { src: "/apple-icon", sizes: "180x180", type: "image/png" },
  ],
});

export default manifest;

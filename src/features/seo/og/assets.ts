import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 };

const fontDirectory = join(process.cwd(), "src/shared/assets/fonts");

const subsets = ["latin", "latin-ext", "cyrillic"] as const;
const weights = [600, 800] as const;

export const OG_FONTS = await Promise.all(
  subsets.flatMap((subset) =>
    weights.map(async (weight) => ({
      name: "Montserrat",
      data: await readFile(join(fontDirectory, `montserrat-${subset}-${weight}.woff`)),
      weight,
      style: "normal" as const,
    })),
  ),
);

// The app icon as a data URL for share cards
export const readAppIcon = async () => {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
};

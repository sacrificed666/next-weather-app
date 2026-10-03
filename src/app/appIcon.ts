import "server-only";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const readAppIcon = async () => {
  const svg = await readFile(join(process.cwd(), "src/app/icon.svg"));
  return `data:image/svg+xml;base64,${svg.toString("base64")}`;
};

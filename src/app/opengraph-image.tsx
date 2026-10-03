import { ImageResponse } from "next/og";

import { en } from "@/features/i18n/model/messages/en";

import { readAppIcon } from "./appIcon";

export const alt = en["app.description"];

export const size = { width: 1200, height: 630 };

export const contentType = "image/png";

const OpenGraphImage = async () =>
  new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 56,
        width: "100%",
        height: "100%",
        padding: "0 96px",
        color: "#ffffff",
        background: "linear-gradient(160deg, #0a2a5e 0%, #164e93 55%, #2f73bd 100%)",
      }}
    >
      <img src={await readAppIcon()} width={260} height={260} alt="" />
      <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 700 }}>
        <div style={{ fontSize: 96, fontWeight: 700, letterSpacing: -2 }}>{en["app.name"]}</div>
        <div style={{ fontSize: 36, lineHeight: 1.35, color: "rgba(255, 255, 255, 0.82)" }}>
          {en["app.description"]}
        </div>
      </div>
    </div>,
    size,
  );

export default OpenGraphImage;

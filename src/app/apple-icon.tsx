import { ImageResponse } from "next/og";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/components/ui/logo";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// iOS applies its own corner mask, so the tile is a plain square.
export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#121210",
      }}
    >
      <svg viewBox={MONOGRAM_VIEWBOX} width={112} height={51} fill="#f5f4f0">
        <path d={MONOGRAM_PATH} />
      </svg>
    </div>,
    size,
  );
}

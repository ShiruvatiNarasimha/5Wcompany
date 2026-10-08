import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { MONOGRAM_PATH, MONOGRAM_VIEWBOX } from "@/components/ui/logo";
import { questions, site } from "@/content/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fonts = join(process.cwd(), "assets/fonts");
const [serif, mono] = await Promise.all([
  readFile(join(fonts, "Newsreader-72-500.ttf")),
  readFile(join(fonts, "GeistMono-400.ttf")),
]);

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "#10100e",
        color: "#f2f0ea",
      }}
    >
      <svg viewBox={MONOGRAM_VIEWBOX} width={96} height={44} fill="#f2f0ea">
        <path d={MONOGRAM_PATH} />
      </svg>

      <div
        style={{
          display: "flex",
          fontFamily: "Newsreader",
          fontSize: 92,
          lineHeight: 1,
          letterSpacing: "-0.028em",
          maxWidth: 900,
        }}
      >
        {site.hero.headline}
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #2d2c28",
          paddingTop: 28,
          fontFamily: "Geist Mono",
          fontSize: 20,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          color: "#9b988f",
        }}
      >
        <div style={{ display: "flex", gap: 28 }}>
          {questions.map((q) => (
            <span key={q.id}>{q.word}</span>
          ))}
        </div>
        <span>{new URL(site.url).hostname.replace(/^www\./, "")}</span>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Newsreader", data: serif, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

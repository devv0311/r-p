import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Dynamic social-share card (docs/technical-architecture.md B5). */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "radial-gradient(120% 80% at 18% 92%, rgba(201,162,75,0.20), transparent 58%), radial-gradient(100% 70% at 85% 6%, rgba(46,58,82,0.5), transparent 60%), #0a0a0a",
          color: "#f4f2ed",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {site.name}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              display: "flex",
              fontSize: 24,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#e0bc6a",
            }}
          >
            {site.role}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 76,
              lineHeight: 1.05,
              fontWeight: 600,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            {site.positioning}
          </div>
          <div style={{ display: "flex", fontSize: 30, color: "#a8a6a0" }}>
            {site.proofLine}
          </div>
        </div>
      </div>
    ),
    size,
  );
}

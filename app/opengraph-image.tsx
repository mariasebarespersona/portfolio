import { ImageResponse } from "next/og";

export const alt = "María Sebares, AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/* The link preview used to be an indigo gradient from a different brand. It is
   the same paper, ink and terracotta as the site now. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "#e9e6de",
          padding: "88px 96px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "#5e605b",
          }}
        >
          AI Engineer and Founder
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 104,
            lineHeight: 1.02,
            letterSpacing: -4,
            fontWeight: 700,
            color: "#b5451f",
          }}
        >
          Hi, this is María
        </div>
        <div
          style={{
            marginTop: 30,
            fontSize: 34,
            lineHeight: 1.35,
            color: "#191a18",
            maxWidth: 880,
          }}
        >
          I build AI agents that run real operations, with paying customers in
          production across the US and Spain.
        </div>
        <div style={{ marginTop: 54, display: "flex", gap: 18 }}>
          {["#b5451f", "#786c58", "#786c58"].map((c, i) => (
            <div
              key={i}
              style={{
                width: 76,
                height: 44,
                borderRadius: 10,
                background: "#fffefb",
                borderBottom: `5px solid ${c}`,
              }}
            />
          ))}
        </div>
      </div>
    ),
    size
  );
}

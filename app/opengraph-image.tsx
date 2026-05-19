import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MarIA — Founder of Tumai · AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          padding: "80px",
          background:
            "linear-gradient(135deg, #0a0a0a 0%, #18181b 60%, #1e1b4b 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#22c55e",
            }}
          />
          <span
            style={{
              fontSize: 22,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#22c55e",
              fontWeight: 600,
            }}
          >
            Open for client projects
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: -2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Founder building</span>
            <span>
              <span style={{ color: "#60a5fa" }}>Agentic AI</span> for the
            </span>
            <span>US & Spain.</span>
          </div>
          <div
            style={{
              fontSize: 28,
              color: "#a3a3a3",
              maxWidth: 900,
            }}
          >
            MarIA · Founder of Tumai · Ex-IBM AI Engineer
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#737373",
          }}
        >
          <span>tumai.tech</span>
          <span>Real Estate AI · WhatsApp Agents · CRM Automation</span>
        </div>
      </div>
    ),
    { ...size }
  );
}

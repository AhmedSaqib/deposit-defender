import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "MoveProof.ai — AI Property Inspection & Deposit Dispute";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #1d4ed8 55%, #2563eb 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 100px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Brand name */}
        <div style={{ display: "flex", alignItems: "baseline", lineHeight: 1 }}>
          <span style={{ fontSize: 88, fontWeight: 900, color: "white", letterSpacing: "-3px" }}>
            MoveProof
          </span>
          <span style={{ fontSize: 88, fontWeight: 900, color: "#93c5fd", letterSpacing: "-3px" }}>
            .ai
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            marginTop: 28,
            fontSize: 38,
            color: "rgba(255,255,255,0.85)",
            fontWeight: 400,
            letterSpacing: "-0.5px",
          }}
        >
          Your property. Your proof.
        </div>

        {/* Description */}
        <div
          style={{
            marginTop: 16,
            fontSize: 24,
            color: "rgba(255,255,255,0.5)",
          }}
        >
          AI-powered deposit dispute analysis and property inspection — worldwide
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 14, marginTop: 52 }}>
          {[
            "Tenant Disputes",
            "Landlord Reports",
            "Deadline Calculator",
            "Demand Letters",
          ].map((label) => (
            <div
              key={label}
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: 100,
                padding: "10px 22px",
                fontSize: 19,
                color: "rgba(255,255,255,0.8)",
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}

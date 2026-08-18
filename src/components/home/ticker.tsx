"use client";

import { useTranslations } from "next-intl";

const SEPARATOR = (
  <span
    aria-hidden="true"
    style={{
      display: "inline-block",
      width: "5px",
      height: "5px",
      borderRadius: "50%",
      background: "linear-gradient(135deg, #00d4aa, #6c63ff)",
      margin: "0 2.25rem",
      verticalAlign: "middle",
      flexShrink: 0,
    }}
  />
);

export default function Ticker() {
  const t = useTranslations("home.ticker");
  const items = t.raw("items") as string[];
  // Duplicate 3× for seamless looping
  const repeated = [...items, ...items, ...items];

  return (
    <div
      aria-label={t("ariaLabel")}
      style={{
        position: "relative",
        overflow: "hidden",
        borderTop: "1px solid rgba(0,212,170,0.12)",
        borderBottom: "1px solid rgba(0,212,170,0.12)",
        background:
          "linear-gradient(90deg, rgba(10,15,28,0) 0%, rgba(0,212,170,0.04) 50%, rgba(10,15,28,0) 100%)," +
          "var(--labo-bg)",
        padding: "1.25rem 0",
      }}
    >
      {/* Left fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to right, var(--labo-bg), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      {/* Scrolling track */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          animation: "ticker-scroll 55s linear infinite",
          willChange: "transform",
        }}
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            style={{
              display: "inline-flex",
              alignItems: "center",
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              fontWeight: 500,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color:
                i % items.length < 2
                  ? "var(--labo-accent-teal)"       // first 2 items teal
                  : i % items.length % 5 === 0
                  ? "var(--labo-accent-violet)"      // every 5th violet
                  : "rgba(136,146,176,0.65)",        // rest muted
              flexShrink: 0,
            }}
          >
            {item}
            {SEPARATOR}
          </span>
        ))}
      </div>

      {/* Right fade mask */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: "120px",
          background: "linear-gradient(to left, var(--labo-bg), transparent)",
          zIndex: 10,
          pointerEvents: "none",
        }}
      />

      <style>{`
        @keyframes ticker-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.333%); }
        }
        @media (prefers-reduced-motion: reduce) {
          [style*="ticker-scroll"] {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

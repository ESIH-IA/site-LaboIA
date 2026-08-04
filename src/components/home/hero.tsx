"use client";

import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import NeuralHeroBackground from "@/components/shared/neural-hero-background";
import type { Locale } from "@/lib/i18n";

type HeroAction = {
  label: string;
  href: string;
  variant?: string;
};

type HeroProps = {
  badge?: string;
  subtitle?: string;
  actions?: HeroAction[];
  locale?: Locale;
};

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero({ badge, subtitle, actions, locale = "fr" }: HeroProps) {
  const t = useTranslations("home.hero");
  const primary   = actions?.find((a) => a.variant === "primary")   ?? actions?.[0];
  const secondary = actions?.find((a) => a.variant === "secondary") ?? actions?.[1];

  const isFr = locale === "fr";

  return (
    <section
      className="relative overflow-hidden hero-neural hero-section"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--labo-bg)",
      }}
    >
      {/* Full-bleed neural network — the hero's background, not a side panel */}
      <NeuralHeroBackground />

      {/* Radial glow — teal bottom-left + violet top-right, over the whole section */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse 60% 55% at 88% 15%, rgba(108,99,255,0.20) 0%, transparent 65%)," +
            "radial-gradient(ellipse 50% 45% at 75% 85%, rgba(0,212,170,0.14) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      {/* Legibility scrim — solid where the text sits, fading out toward the
          open network on the right. This is what turns the canvas into a
          true background instead of competing with the copy. */}
      <div
        aria-hidden="true"
        className="hero-scrim"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(90deg, var(--labo-bg) 0%, var(--labo-bg) 32%, rgba(10,15,28,0.86) 46%, rgba(10,15,28,0.32) 66%, transparent 84%)",
          pointerEvents: "none",
        }}
      />

      {/* ── Content — overlaid on the network, not boxed beside it ─── */}
      <div
        className="relative hero-content"
        style={{
          padding: "clamp(7rem,10vw,9rem) clamp(2rem,6vw,6rem)",
          maxWidth: "760px",
          zIndex: 10,
        }}
      >
        {/* Badge */}
        <div
          className="badge-teal"
          style={{ display: "inline-flex", marginBottom: "2.25rem" }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              backgroundColor: "var(--labo-accent-teal)",
              flexShrink: 0,
            }}
          />
          {badge ?? t("badge")}
        </div>

        {/* Stacked title — Syne 900. Font sizes are overridden with !important
            on narrow viewports (see <style> below): clamp() alone can't keep
            the longest line ("into intelligence." / "en intelligence.") from
            overflowing a ~360px phone at a sane minimum, so small screens get
            an explicit, visually-verified size instead of a computed guess. */}
        <h1
          className="hero-h1"
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 900,
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            margin: "0 0 2rem",
          }}
        >
          {/* Line 1 */}
          <span
            className="hero-line"
            style={{
              display: "block",
              fontSize: "clamp(3rem, 6vw, 5.75rem)",
              color: "var(--labo-text)",
            }}
          >
            {t("titleLine1")}
          </span>

          {/* Line 2 */}
          <span
            className="hero-line"
            style={{
              display: "block",
              fontSize: "clamp(3rem, 6vw, 5.75rem)",
              color: "var(--labo-text)",
            }}
          >
            {t("titleLine2")}
          </span>

          {/* Line 3 — "caraïbéenne" / "data" — italic + gradient */}
          <span
            className="hero-line hero-line-accent"
            style={{
              display: "inline-block",
              fontSize: isFr
                ? "clamp(2.15rem, 4.4vw, 4.25rem)"
                : "clamp(3rem, 6vw, 5.75rem)",
              fontStyle: "italic",
              background: "linear-gradient(120deg, var(--labo-accent-teal) 0%, var(--labo-accent-violet) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              lineHeight: 1.05,
              // Italic glyphs slant past the text's own box, which cuts them
              // off when the background gradient is clipped to that box —
              // the extra right padding gives the slant room so the last
              // letters stay painted instead of vanishing.
              paddingRight: "0.2em",
            }}
          >
            {t("titleLine3")}
          </span>

          {/* Line 4 */}
          <span
            className="hero-line"
            style={{
              display: "block",
              fontSize: "clamp(3rem, 6vw, 5.75rem)",
              color: "var(--labo-text)",
              opacity: 0.85,
            }}
          >
            {t("titleLine4")}
          </span>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: "clamp(0.95rem, 1.3vw, 1.15rem)",
            color: "var(--labo-text-muted)",
            lineHeight: 1.75,
            maxWidth: "480px",
            marginBottom: "2.75rem",
          }}
        >
          {subtitle ?? t("subtitle")}
        </p>

        {/* CTAs */}
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            href={primary?.href ?? "/contact"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "9999px",
              background: "linear-gradient(135deg, #00d4aa, #00b893)",
              color: "#0a0f1c",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.02em",
              textDecoration: "none",
              boxShadow: "0 0 32px rgba(0,212,170,0.35)",
              transition: "all 0.22s ease",
              whiteSpace: "nowrap",
            }}
          >
            {primary?.label ?? t("primaryLabel")}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>

          <Link
            href={secondary?.href ?? "/solutions#projets"}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "13px 24px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.05)",
              backdropFilter: "blur(8px)",
              color: "#f0f4ff",
              fontSize: "0.88rem",
              fontWeight: 500,
              letterSpacing: "0.01em",
              textDecoration: "none",
              border: "1px solid rgba(255,255,255,0.13)",
              transition: "all 0.22s ease",
              whiteSpace: "nowrap",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
              <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
              <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
              <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8" />
            </svg>
            {secondary?.label ?? t("secondaryLabel")}
          </Link>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginTop: "3.5rem",
          }}
        >
          <div
            style={{
              width: "32px",
              height: "1px",
              background: "linear-gradient(to right, transparent, var(--labo-accent-teal))",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(136,146,176,0.45)",
            }}
          >
            {t("scrollHint")}
          </span>
        </div>
      </div>

      {/* Floating caption — bottom-right, over the open network */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2rem",
          fontFamily: "var(--font-mono)",
          fontSize: "0.6rem",
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "rgba(0,212,170,0.45)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        <span
          style={{
            width: 6,
            height: 6,
            borderRadius: "50%",
            backgroundColor: "rgba(0,212,170,0.5)",
            boxShadow: "0 0 8px rgba(0,212,170,0.5)",
            animation: "pulse-dot 2.4s ease-in-out infinite",
          }}
        />
        {t("canvasLabel")}
      </div>

      {/* Bottom fade — full width */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "120px",
          pointerEvents: "none",
          background: "linear-gradient(to top, var(--labo-bg), transparent)",
          zIndex: 5,
        }}
      />

      <style>{`
        /* minHeight: 100vh (inline, above) is the fallback for browsers
           without dvh support. On mobile, 100vh includes the area behind
           the address bar, which can clip content until the user scrolls —
           100dvh (dynamic viewport height) tracks the *visible* viewport
           instead. @supports keeps old browsers on the safe 100vh fallback. */
        @supports (height: 100dvh) {
          .hero-section { min-height: 100dvh !important; }
        }
        @media (max-width: 760px) {
          .hero-scrim {
            background: linear-gradient(
              180deg,
              var(--labo-bg) 0%,
              var(--labo-bg) 55%,
              rgba(10,15,28,0.9) 72%,
              rgba(10,15,28,0.55) 100%
            ) !important;
          }
          .hero-content { max-width: 100% !important; }
          .hero-h1 .hero-line { font-size: 2.5rem !important; }
          .hero-h1 .hero-line-accent { font-size: 2.15rem !important; }
        }
        @media (max-width: 400px) {
          .hero-h1 .hero-line { font-size: 2.05rem !important; }
          .hero-h1 .hero-line-accent { font-size: 1.8rem !important; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-neural [style*="pulse-dot"] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}

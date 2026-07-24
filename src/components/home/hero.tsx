"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import type { Locale } from "@/lib/i18n";

type HeroAction = {
  label: string;
  href: string;
  variant?: string;
};

type HeroProps = {
  badge?: string;
  actions?: HeroAction[];
  banner?: unknown;
  locale?: Locale;
};

/* ─── Grain overlay (SVG turbulence) ─────────────────────── */
function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        zIndex: 2,
        opacity: 0.038,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundRepeat: "repeat",
        backgroundSize: "128px 128px",
      }}
    />
  );
}

/* ─── Caribbean Neural Network Canvas ─────────────────────── */
function NeuralCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let W = 0, H = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      W = canvas.width  = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Caribbean palette: teal, violet, warm coral hint
    const PALETTE = ["#00d4aa", "#6c63ff", "#00d4aa", "#00b4e4", "#6c63ff"];

    type Node = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      alpha: number;
      pulse: number;
      pulseSpeed: number;
    };

    const N = 80;
    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.38,
      vy: (Math.random() - 0.5) * 0.38,
      r: Math.random() * 2.2 + 0.8,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: Math.random() * 0.55 + 0.2,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.012 + Math.random() * 0.018,
    }));

    const CONNECT_DIST = 140;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < N; i++) {
        const p = nodes[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x <= 0 || p.x >= W) p.vx *= -1;
        if (p.y <= 0 || p.y >= H) p.vy *= -1;
        p.pulse += p.pulseSpeed;

        // Connect nearby nodes
        for (let j = i + 1; j < N; j++) {
          const q = nodes[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < CONNECT_DIST) {
            const strength = (1 - d / CONNECT_DIST);
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            // gradient line: teal → violet
            const grad = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
            grad.addColorStop(0, "#00d4aa");
            grad.addColorStop(1, "#6c63ff");
            ctx.strokeStyle = grad;
            ctx.globalAlpha = strength * 0.18;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }

        // Node dot with pulse
        const pulseR = p.r * (1 + Math.sin(p.pulse) * 0.25);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();

        // Glow halo on brighter nodes
        if (p.alpha > 0.55) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.06;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    // Respect reduced-motion
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
    />
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero({ badge, actions, locale = "fr" }: HeroProps) {
  const t = useTranslations("home.hero");
  const primary   = actions?.find((a) => a.variant === "primary")   ?? actions?.[0];
  const secondary = actions?.find((a) => a.variant === "secondary") ?? actions?.[1];

  const isFr = locale === "fr";

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        backgroundColor: "var(--labo-bg)",
      }}
    >
      <GrainOverlay />

      {/* ── LEFT PANEL — Text content ───────────────────── */}
      <div
        className="relative"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(6rem,10vw,10rem) clamp(2rem,5vw,5rem) clamp(4rem,8vw,8rem)",
          zIndex: 10,
        }}
      >
        {/* Subtle left-panel glow */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 80% 60% at 20% 40%, rgba(108,99,255,0.10) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />

        {/* Micro grid */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative" }}>
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

          {/* Stacked title — Syne 900 */}
          <h1
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
              style={{
                display: "block",
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                color: "var(--labo-text)",
              }}
            >
              {t("titleLine1")}
            </span>

            {/* Line 2 */}
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
                color: "var(--labo-text)",
              }}
            >
              {t("titleLine2")}
            </span>

            {/* Line 3 — "caraïbéenne" / "data" — italic + gradient */}
            <span
              style={{
                display: "block",
                fontSize: isFr
                  ? "clamp(2.25rem, 4.8vw, 4.8rem)"
                  : "clamp(3rem, 6.5vw, 6.5rem)",
                fontStyle: "italic",
                background: "linear-gradient(120deg, var(--labo-accent-teal) 0%, var(--labo-accent-violet) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                lineHeight: 1.05,
              }}
            >
              {t("titleLine3")}
            </span>

            {/* Line 4 */}
            <span
              style={{
                display: "block",
                fontSize: "clamp(3rem, 6.5vw, 6.5rem)",
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
            {t("subtitle")}
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
              scroll
            </span>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL — Neural canvas ─────────────────── */}
      <div
        className="relative"
        style={{ position: "relative", overflow: "hidden" }}
        role="img"
        aria-label={t("canvasLabel")}
      >
        {/* Deep background tint */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(135deg, rgba(10,15,28,0.95) 0%, rgba(17,24,39,0.85) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Radial glow — teal bottom-left + violet top-right */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 70% 60% at 80% 20%, rgba(108,99,255,0.22) 0%, transparent 65%)," +
              "radial-gradient(ellipse 55% 50% at 20% 80%, rgba(0,212,170,0.18) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />

        {/* Vertical separator line */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "15%",
            bottom: "15%",
            left: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(0,212,170,0.35), transparent)",
          }}
        />

        {/* Neural network canvas */}
        <NeuralCanvas />

        {/* Floating label badge — bottom right */}
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
            color: "rgba(0,212,170,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
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
          zIndex: 20,
        }}
      />

      <style>{`
        @media (max-width: 900px) {
          section[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
          section[style*="grid-template-columns: 1fr 1fr"] > div:last-child {
            display: none !important;
          }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </section>
  );
}

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

/* ─── Caribbean Neural Network Canvas — full-bleed background ──
   Node density scales with the actual rendered area (this now covers
   the whole hero, not a narrow side panel), and nodes near the pointer
   brighten and link to it — the network reacts to the visitor, echoing
   "data becomes intelligence through interaction". Respects
   prefers-reduced-motion by rendering a single static frame. ────── */
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
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const mouse = { x: -9999, y: -9999, active: false };
    const handleMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = mouse.x >= 0 && mouse.x <= W && mouse.y >= 0 && mouse.y <= H;
    };
    const handleLeave = () => { mouse.active = false; };
    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerleave", handleLeave);

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

    // Density scales with area: a full-width hero needs meaningfully more
    // nodes than the old half-width panel to avoid feeling sparse.
    const N = Math.max(60, Math.min(170, Math.round((W * H) / 11000)));
    const nodes: Node[] = Array.from({ length: N }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.32,
      vy: (Math.random() - 0.5) * 0.32,
      r: Math.random() * 2.1 + 0.7,
      color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
      alpha: Math.random() * 0.5 + 0.16,
      pulse: Math.random() * Math.PI * 2,
      pulseSpeed: 0.01 + Math.random() * 0.016,
    }));

    const CONNECT_DIST = 140;
    const MOUSE_RADIUS = 190;

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      for (let i = 0; i < nodes.length; i++) {
        const p = nodes[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x <= 0 || p.x >= W) p.vx *= -1;
        if (p.y <= 0 || p.y >= H) p.vy *= -1;
        p.pulse += p.pulseSpeed;

        let boost = 0;
        if (mouse.active) {
          const mdx = p.x - mouse.x, mdy = p.y - mouse.y;
          const md = Math.sqrt(mdx * mdx + mdy * mdy);
          if (md < MOUSE_RADIUS) boost = 1 - md / MOUSE_RADIUS;
        }

        // Connect nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
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
            ctx.globalAlpha = strength * (0.16 + boost * 0.3);
            ctx.lineWidth = 0.7 + boost * 0.5;
            ctx.stroke();
          }
        }

        // Thread to the pointer when a node is close enough
        if (boost > 0) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = p.color;
          ctx.globalAlpha = boost * 0.35;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }

        // Node dot with pulse (+ pointer boost)
        const pulseR = p.r * (1 + Math.sin(p.pulse) * 0.25) * (1 + boost * 0.85);
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.min(1, p.alpha + boost * 0.5);
        ctx.fill();

        // Glow halo on brighter / boosted nodes
        if (p.alpha > 0.5 || boost > 0.25) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, pulseR * 3.4, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = 0.06 + boost * 0.09;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    // Respect reduced-motion: render one still frame, no rAF loop, no pointer reactivity
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!mq.matches) {
      draw();
    } else {
      ctx.clearRect(0, 0, W, H);
      for (const p of nodes) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerleave", handleLeave);
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
      className="relative overflow-hidden hero-neural"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: "var(--labo-bg)",
      }}
    >
      {/* Full-bleed neural network — the hero's background, not a side panel */}
      <NeuralCanvas />

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

      <GrainOverlay />

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

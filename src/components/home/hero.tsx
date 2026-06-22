"use client";

import { Link } from "@/i18n/navigation";
import { useEffect, useRef } from "react";
import type { SiteAsset } from "@/lib/sanity/types";

type HeroAction = {
  label: string;
  href: string;
  variant?: string;
};

type HeroProps = {
  badge?: string;
  actions?: HeroAction[];
  banner?: SiteAsset | null;
};

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    // Use parent size for proper full-section fill
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.offsetWidth;
      canvas.height = parent.offsetHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      r: number;
      color: string;
      alpha: number;
    };

    const COLORS = ["#00d4aa", "#6c63ff"];
    const particles: Particle[] = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.45,
      vy: (Math.random() - 0.5) * 0.45,
      r: Math.random() * 1.8 + 0.6,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      alpha: Math.random() * 0.5 + 0.25,
    }));

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Move — bounce off edges
        p.x += p.vx;
        p.y += p.vy;
        if (p.x <= 0 || p.x >= canvas.width)  p.vx *= -1;
        if (p.y <= 0 || p.y >= canvas.height) p.vy *= -1;

        // Lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = "#00d4aa";
            ctx.globalAlpha = (1 - dist / 130) * 0.14;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }

        // Dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(draw);
    }

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    />
  );
}

export default function Hero({ badge, actions }: HeroProps) {
  const primary   = actions?.find((a) => a.variant === "primary")   ?? actions?.[0];
  const secondary = actions?.find((a) => a.variant === "secondary") ?? actions?.[1];

  return (
    <section
      className="relative overflow-hidden"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "var(--labo-bg)",
      }}
    >
      {/* Particle network — fills parent via resize() */}
      <ParticleCanvas />

      {/* Radial violet/teal glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background:
            "radial-gradient(ellipse 65% 55% at 55% 35%, rgba(108,99,255,0.13) 0%, transparent 65%)," +
            "radial-gradient(ellipse 45% 35% at 80% 75%, rgba(0,212,170,0.09) 0%, transparent 55%)",
        }}
      />

      {/* Micro grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.18,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)," +
            "linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Content — left aligned */}
      <div
        className="container"
        style={{ position: "relative", zIndex: 10, paddingTop: "8rem", paddingBottom: "10rem" }}
      >
        <div style={{ maxWidth: "min(760px, 100%)" }}>

          {/* Eyebrow */}
          <div className="badge-teal" style={{ display: "inline-flex", marginBottom: "2rem" }}>
            <span
              style={{
                display: "inline-block",
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--labo-accent-teal)",
                flexShrink: 0,
              }}
            />
            {badge ?? "Intelligence Artificielle · Recherche · Innovation"}
          </div>

          {/* Title */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 5.5rem)",
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              color: "var(--labo-text)",
              marginBottom: "1.75rem",
            }}
          >
            Transformer
            <br />
            <span
              style={{
                background: "linear-gradient(120deg, var(--labo-accent-teal), var(--labo-accent-violet))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              la donnée caraïbéenne
            </span>
            <br />
            en intelligence.
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "1.125rem",
              color: "var(--labo-text-muted)",
              lineHeight: "1.75",
              maxWidth: "560px",
              marginBottom: "2.5rem",
            }}
          >
            LaCDIA est un laboratoire de recherche appliquée en IA et science des données,
            au service des communautés caribéennes.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", alignItems: "center" }}>
            {/* Bouton primaire — teal plein avec flèche */}
            <Link
              href={primary?.href ?? "/collaborer"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "14px 28px",
                borderRadius: "9999px",
                background: "linear-gradient(135deg, #00d4aa, #00b893)",
                color: "#0a0f1c",
                fontSize: "0.9rem",
                fontWeight: 700,
                letterSpacing: "0.01em",
                textDecoration: "none",
                boxShadow: "0 0 28px rgba(0,212,170,0.35)",
                transition: "all 0.22s ease",
                border: "none",
                whiteSpace: "nowrap",
              }}
            >
              {primary?.label ?? "Collaborer avec le laboratoire"}
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>

            {/* Bouton secondaire — glass discret */}
            <Link
              href={secondary?.href ?? "/projets"}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "10px",
                padding: "13px 26px",
                borderRadius: "9999px",
                background: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(8px)",
                color: "#f0f4ff",
                fontSize: "0.9rem",
                fontWeight: 500,
                letterSpacing: "0.01em",
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.14)",
                transition: "all 0.22s ease",
                whiteSpace: "nowrap",
              }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="3" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="3" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
                <rect x="14" y="14" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.8"/>
              </svg>
              {secondary?.label ?? "Explorer nos projets"}
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator — absolute bottom, no layout impact */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            width: "1px",
            height: "48px",
            background: "linear-gradient(to bottom, transparent, var(--labo-accent-teal))",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-mono, monospace)",
            fontSize: "0.6rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(136,146,176,0.5)",
          }}
        >
          scroll
        </span>
      </div>

      {/* Bottom gradient fade */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "160px",
          pointerEvents: "none",
          background: "linear-gradient(to top, var(--labo-bg), transparent)",
        }}
      />
    </section>
  );
}

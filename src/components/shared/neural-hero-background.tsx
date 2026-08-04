"use client";

import { useEffect, useRef } from "react";

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
   Node density scales with the actual rendered area of its parent, so it
   adapts on its own between the full-viewport homepage hero and the more
   compact heroes on other pages. Nodes near the pointer brighten and link
   to it. Respects prefers-reduced-motion by rendering a single static
   frame. ────── */
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
    // nodes than a compact one to avoid feeling sparse, and vice versa.
    const N = Math.max(40, Math.min(170, Math.round((W * H) / 11000)));
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

/* ─── NeuralHeroBackground ───────────────────────────────────
   Drop-in animated background for any hero-style section: fills the
   nearest positioned ancestor (that ancestor needs position: relative
   and overflow: hidden). Bundles the neural canvas and the grain overlay
   used across the site's dark heroes. ────────────────────── */
export default function NeuralHeroBackground() {
  return (
    <>
      <NeuralCanvas />
      <GrainOverlay />
    </>
  );
}

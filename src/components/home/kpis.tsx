"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import type { KpiItem, KpiSettings } from "@/lib/sanity/types";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
};

// Position/style of each visible slot in the 6-col bento grid, in display order.
// Only as many slots as available items are rendered, so the grid degrades
// gracefully instead of dereferencing a missing item when the CMS has fewer
// (or more) than 4 KPIs.
const SLOTS: { gridColumn: string; gridRow: string; featured?: boolean }[] = [
  { gridColumn: "1 / span 3", gridRow: "1", featured: true },
  { gridColumn: "4 / span 2", gridRow: "1" },
  { gridColumn: "6 / span 1", gridRow: "1" },
  { gridColumn: "2 / span 5", gridRow: "2", featured: true },
];

type ArcMeta = { color: string; progress: number; border: string; glow: string; gradEnd: string };

const CARD_META: ArcMeta[] = [
  { color: "#00d4aa", progress: 0.83, border: "rgba(0,212,170,0.18)",  glow: "rgba(0,212,170,0.10)",  gradEnd: "#6c63ff" },
  { color: "#6c63ff", progress: 0.12, border: "rgba(108,99,255,0.18)", glow: "rgba(108,99,255,0.08)", gradEnd: "#00d4aa" },
  { color: "#00b4e4", progress: 0.25, border: "rgba(0,180,228,0.18)",  glow: "rgba(0,180,228,0.08)",  gradEnd: "#6c63ff" },
  { color: "#6c63ff", progress: 1.0,  border: "rgba(108,99,255,0.18)", glow: "rgba(108,99,255,0.10)", gradEnd: "#00d4aa" },
];

function ArcRing({ progress = 0.75, color = "#00d4aa", size = 72 }: { progress?: number; color?: string; size?: number }) {
  const R = (size - 8) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const toRad = (deg: number) => deg * (Math.PI / 180);
  const px = (a: number) => cx + R * Math.cos(a);
  const py = (a: number) => cy + R * Math.sin(a);
  const start = toRad(135);
  const sweep = toRad(270) * Math.min(1, Math.max(0, progress));
  const end = start + sweep;
  const trackEnd = start + toRad(270);
  const large = sweep > Math.PI ? 1 : 0;
  const filterStr = "drop-shadow(0 0 5px " + color + "80)";
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true" style={{ flexShrink: 0 }}>
      <path
        d={`M ${px(start)} ${py(start)} A ${R} ${R} 0 1 1 ${px(trackEnd)} ${py(trackEnd)}`}
        fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="4" strokeLinecap="round"
      />
      {sweep > 0.01 && (
        <path
          d={`M ${px(start)} ${py(start)} A ${R} ${R} 0 ${large} 1 ${px(end)} ${py(end)}`}
          fill="none" stroke={color} strokeWidth="4" strokeLinecap="round"
          style={{ filter: filterStr }}
        />
      )}
    </svg>
  );
}

function parseNum(val: string): number | null {
  const n = parseInt(val.replace(/\D/g, ""), 10);
  return isNaN(n) ? null : n;
}

function useCounter(target: number, active: boolean, duration = 1300) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    let raf: number;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);
  return count;
}

function KpiCard({ item, index, active, featured }: { item: KpiItem; index: number; active: boolean; featured?: boolean }) {
  const m = CARD_META[index % CARD_META.length];
  const num = parseNum(item.value);
  const hasSuffix = item.value.includes("+");
  const count = useCounter(num ?? 0, active && num !== null, 1200 + index * 150);
  const display = num !== null ? String(count) + (hasSuffix ? "+" : "") : item.value;
  const glowBox = "0 8px 32px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)";
  const glowBoxHover = "0 20px 52px rgba(0,0,0,0.38), 0 0 0 1px " + m.border;

  return (
    <article
      style={{
        position: "relative", borderRadius: 20,
        padding: featured ? "2.5rem 2.25rem" : "2rem 1.75rem",
        background: "rgba(17,24,39,0.85)",
        border: "1px solid " + m.border,
        backdropFilter: "blur(16px)", overflow: "hidden",
        transition: "transform 0.28s ease, box-shadow 0.28s ease",
        boxShadow: glowBox,
        display: "flex", flexDirection: "column",
        justifyContent: "space-between", gap: "1.5rem",
        minHeight: featured ? 220 : 185, height: "100%",
      }}
      onMouseEnter={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(-5px)"; el.style.boxShadow = glowBoxHover; }}
      onMouseLeave={(e) => { const el = e.currentTarget as HTMLElement; el.style.transform = "translateY(0)"; el.style.boxShadow = glowBox; }}
    >
      <div aria-hidden="true" style={{ position: "absolute", top: "-40%", right: "-15%", width: 180, height: 180, borderRadius: "50%", background: "radial-gradient(circle, " + m.glow + " 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
        <div style={{ fontFamily: "var(--font-display)", fontSize: featured ? "clamp(3rem,5vw,4.5rem)" : "clamp(2.25rem,3.5vw,3.25rem)", fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em", background: "linear-gradient(135deg, " + m.color + ", " + m.gradEnd + ")", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
          {display}
        </div>
        <ArcRing progress={m.progress} color={m.color} size={featured ? 76 : 62} />
      </div>
      <div>
        <div style={{ fontFamily: "var(--font-display)", fontSize: featured ? "1rem" : "0.9rem", fontWeight: 700, color: "var(--labo-text)", marginBottom: "0.35rem", lineHeight: 1.25 }}>
          {item.label}
        </div>
        {item.note && (
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.06em", color: "rgba(136,146,176,0.55)", margin: 0, lineHeight: 1.5 }}>
            {item.note}
          </p>
        )}
      </div>
    </article>
  );
}

export default function Kpis({ title, intro, items, meta }: KpisProps) {
  const t = useTranslations("home.kpis");
  const list = items.length ? items : (t.raw("fallbackItems") as KpiItem[]);
  const sectionLabel = t("sectionLabel");
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(false);
  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (entries[0]?.isIntersecting) setActive(true);
  }, []);
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(onIntersect, { threshold: 0.2 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onIntersect]);
  const four = list.slice(0, 4);

  return (
    <section ref={sectionRef} style={{ background: "var(--labo-bg)", padding: "clamp(5rem,9vw,8rem) 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "end", marginBottom: "3.5rem" }}>
          <div>
            <div className="badge-teal" style={{ display: "inline-flex", marginBottom: "1.25rem" }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--labo-accent-teal)", flexShrink: 0 }} />
              {sectionLabel}
            </div>
            {title && (
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3vw,2.75rem)", fontWeight: 900, color: "var(--labo-text)", letterSpacing: "-0.03em", lineHeight: 1.05, margin: 0 }}>
                {title}
              </h2>
            )}
          </div>
          {intro && (
            <p style={{ fontSize: "0.95rem", color: "var(--labo-text-muted)", lineHeight: 1.75, margin: 0 }}>
              {intro}
            </p>
          )}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.25rem" }}>
          {four.map((item, i) => {
            const slot = SLOTS[i];
            if (!slot) return null;
            return (
              <div key={item._id ?? i} style={{ gridColumn: slot.gridColumn, gridRow: slot.gridRow }}>
                <KpiCard item={item} index={i} active={active} featured={slot.featured} />
              </div>
            );
          })}
        </div>
        {(meta?.lastUpdated || meta?.disclaimer) && (
          <div style={{ marginTop: "1.75rem", display: "flex", flexWrap: "wrap", justifyContent: "flex-end", gap: "1rem", fontFamily: "var(--font-mono)", fontSize: "0.63rem", letterSpacing: "0.07em", color: "rgba(136,146,176,0.38)" }}>
            {meta.lastUpdated && <span>{t("updated")} {meta.lastUpdated}</span>}
            {meta.disclaimer && <span>{meta.disclaimer}</span>}
          </div>
        )}
      </div>
      <style>{`
        @media (max-width: 900px) {
          .kpis-bento { grid-template-columns: 1fr 1fr !important; }
          .kpis-bento > div { grid-column: span 1 !important; grid-row: auto !important; }
        }
        @media (max-width: 540px) { .kpis-bento { grid-template-columns: 1fr !important; } }
        @media (prefers-reduced-motion: reduce) { article { transition: none !important; } }
      `}</style>
    </section>
  );
}

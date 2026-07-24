"use client";

import { useTranslations } from "next-intl";
import { Brain, Eye, ShieldCheck, HeartPulse, Leaf, BarChart3 } from "lucide-react";
import type { CSSProperties, ComponentType } from "react";

type HighlightItem = { title: string; description: string };
type HighlightsProps = { title?: string; intro?: string; items?: HighlightItem[] };

// Named type so typeof Array[n] is never used in TSX position
type AxeMeta = { icon: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>; num: string; color: string; bg: string; border: string };

const AXES_META: AxeMeta[] = [
  { icon: Brain,       num: "01", color: "#00d4aa", bg: "rgba(0,212,170,0.12)",   border: "rgba(0,212,170,0.22)" },
  { icon: Eye,         num: "02", color: "#6c63ff", bg: "rgba(108,99,255,0.12)",  border: "rgba(108,99,255,0.22)" },
  { icon: ShieldCheck, num: "03", color: "#00d4aa", bg: "rgba(0,212,170,0.12)",   border: "rgba(0,212,170,0.22)" },
  { icon: HeartPulse,  num: "04", color: "#6c63ff", bg: "rgba(108,99,255,0.12)",  border: "rgba(108,99,255,0.22)" },
  { icon: Leaf,        num: "05", color: "#00d4aa", bg: "rgba(0,212,170,0.12)",   border: "rgba(0,212,170,0.22)" },
  { icon: BarChart3,   num: "06", color: "#6c63ff", bg: "rgba(108,99,255,0.12)",  border: "rgba(108,99,255,0.22)" },
];

const cardBase: CSSProperties = {
  position: "relative",
  background: "rgba(17,24,39,0.82)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  padding: "2rem",
  overflow: "hidden",
  backdropFilter: "blur(12px)",
  transition: "transform 0.26s ease, border-color 0.26s ease, box-shadow 0.26s ease",
  height: "100%",
};

// --- Featured wide card (axe 01 — 4/6 cols) ---
function FeaturedCard({ item, ax }: { item: HighlightItem; ax: AxeMeta }) {
  const Icon = ax.icon;
  return (
    <article
      style={{ ...cardBase, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 260, borderColor: ax.border, boxShadow: "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-4px)";
        el.style.borderColor = ax.color + "55";
        el.style.boxShadow = "0 24px 56px rgba(0,0,0,0.4), 0 0 0 1px " + ax.color + "33";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = ax.border;
        el.style.boxShadow = "0 12px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)";
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", bottom: "-0.5rem", right: "1.5rem", fontFamily: "var(--font-display)", fontSize: "9rem", fontWeight: 900, lineHeight: 1, letterSpacing: "-0.06em", color: ax.color, opacity: 0.055, userSelect: "none", pointerEvents: "none" }}>
        {ax.num}
      </span>
      <div aria-hidden="true" style={{ position: "absolute", top: "-30%", right: "-10%", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, " + ax.bg + " 0%, transparent 65%)", pointerEvents: "none" }} />
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1.5rem" }}>
        <div style={{ width: 52, height: 52, borderRadius: 14, background: ax.bg, border: "1px solid " + ax.border, display: "flex", alignItems: "center", justifyContent: "center", color: ax.color }}>
          <Icon size={24} strokeWidth={1.6} aria-hidden />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.14em", color: ax.color, opacity: 0.7 }}>
          AXE {ax.num}
        </span>
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem", fontWeight: 800, color: "var(--labo-text)", marginBottom: "0.75rem", lineHeight: 1.25, letterSpacing: "-0.02em" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.875rem", color: "var(--labo-text-muted)", lineHeight: 1.7, margin: 0, maxWidth: 520 }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

// --- Compact card (axes 02-06) ---
function CompactCard({ item, ax }: { item: HighlightItem; ax: AxeMeta }) {
  const Icon = ax.icon;
  return (
    <article
      style={{ ...cardBase, display: "flex", flexDirection: "column", gap: "1rem", minHeight: 190 }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-3px)";
        el.style.borderColor = ax.color + "40";
        el.style.boxShadow = "0 16px 40px rgba(0,0,0,0.35), 0 0 0 1px " + ax.color + "28";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "none";
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", bottom: "-0.25rem", right: "1rem", fontFamily: "var(--font-display)", fontSize: "5.5rem", fontWeight: 900, lineHeight: 1, color: ax.color, opacity: 0.05, userSelect: "none", pointerEvents: "none" }}>
        {ax.num}
      </span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: ax.bg, border: "1px solid " + ax.border, display: "flex", alignItems: "center", justifyContent: "center", color: ax.color }}>
          <Icon size={19} strokeWidth={1.6} aria-hidden />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.6rem", letterSpacing: "0.14em", color: ax.color, opacity: 0.55 }}>
          {ax.num}
        </span>
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "0.92rem", fontWeight: 700, color: "var(--labo-text)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.8rem", color: "var(--labo-text-muted)", lineHeight: 1.65, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </article>
  );
}

// Position of each visible slot in the 6-col bento grid, in display order.
// The first slot is the wide featured card, the rest are compact cards.
const SLOTS: { gridColumn: string; featured?: boolean }[] = [
  { gridColumn: "1 / span 4", featured: true },
  { gridColumn: "5 / span 2" },
  { gridColumn: "1 / span 2" },
  { gridColumn: "3 / span 2" },
  { gridColumn: "5 / span 2" },
  { gridColumn: "3 / span 4" },
];

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const t = useTranslations("home.highlights");
  // Any non-empty CMS list is honoured (up to 6 slots); only an empty/missing
  // list falls back to the hardcoded axes, so editors adding/removing an axe
  // in Sanity always see their change reflected instead of it being silently
  // discarded when the count isn't exactly 6.
  const list = items?.length ? items.slice(0, 6) : (t.raw("axes") as HighlightItem[]);

  return (
    <section id="axes-de-recherche" style={{ background: "var(--labo-bg)", padding: "clamp(5rem,9vw,8rem) 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "end", marginBottom: "3rem" }}>
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--labo-accent-teal)", marginBottom: "0.85rem" }}>
              {t("sectionLabel")}
            </p>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.75rem,3.2vw,2.75rem)", fontWeight: 900, letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--labo-text)", margin: 0 }}>
              {title ?? t("sectionTitle")}
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--labo-text-muted)", lineHeight: 1.75, margin: 0 }}>
            {intro ?? t("sectionIntro")}
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: "1.25rem" }}>
          {list.map((item, i) => {
            const slot = SLOTS[i];
            if (!slot) return null;
            const ax = AXES_META[i % AXES_META.length];
            return (
              <div key={item.title ?? i} style={{ gridColumn: slot.gridColumn }}>
                {slot.featured ? <FeaturedCard item={item} ax={ax} /> : <CompactCard item={item} ax={ax} />}
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: "2rem", background: "rgba(17,24,39,0.7)", border: "1px solid rgba(0,212,170,0.18)", borderRadius: 16, padding: "1.5rem 2rem", display: "flex", alignItems: "center", gap: "1.5rem", backdropFilter: "blur(8px)" }}>
          <div style={{ width: 4, height: 44, borderRadius: 2, background: "linear-gradient(180deg, #00d4aa, #6c63ff)", flexShrink: 0 }} />
          <div>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--labo-accent-teal)", marginBottom: "0.3rem" }}>
              {t("transversalLabel")}
            </p>
            <p style={{ color: "rgba(240,244,255,0.75)", fontSize: "0.9rem", fontWeight: 500, margin: 0, lineHeight: 1.5 }}>
              {t("transversalText")}
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #axes-de-recherche [style*="repeat(6"] { grid-template-columns: 1fr 1fr !important; }
          #axes-de-recherche [style*="span 4"], #axes-de-recherche [style*="span 2"],
          #axes-de-recherche [style*="3 / span 4"], #axes-de-recherche [style*="5 / span 2"],
          #axes-de-recherche [style*="3 / span 2"] { grid-column: span 2 !important; }
        }
        @media (max-width: 560px) {
          #axes-de-recherche [style*="repeat(6"], #axes-de-recherche [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
          #axes-de-recherche [style*="span 2"] { grid-column: span 1 !important; }
        }
        @media (prefers-reduced-motion: reduce) { article { transition: none !important; } }
      `}</style>
    </section>
  );
}

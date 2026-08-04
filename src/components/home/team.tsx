"use client";

import { useTranslations } from "next-intl";
import { GraduationCap, Globe, Users, Database, Building2, Sparkles } from "lucide-react";
import type { ComponentType } from "react";

type TeamCategory = { badge: string; title: string; description: string };
type TeamStat = { value: string; label: string };

type CategoryMeta = {
  icon: ComponentType<{ size?: number; strokeWidth?: number; "aria-hidden"?: boolean }>;
  color: string;
  border: string;
};

// Order matches src/messages/{fr,en}.json home.team.categories.
const CATEGORY_META: CategoryMeta[] = [
  { icon: GraduationCap, color: "#00d4aa", border: "rgba(0,212,170,0.22)" },
  { icon: Globe, color: "#6c63ff", border: "rgba(108,99,255,0.22)" },
  { icon: Users, color: "#00d4aa", border: "rgba(0,212,170,0.22)" },
  { icon: Database, color: "#6c63ff", border: "rgba(108,99,255,0.22)" },
  { icon: Building2, color: "#00d4aa", border: "rgba(0,212,170,0.22)" },
  { icon: Sparkles, color: "#6c63ff", border: "rgba(108,99,255,0.22)" },
];

function TeamCard({ item, meta }: { item: TeamCategory; meta: CategoryMeta }) {
  const Icon = meta.icon;
  return (
    <div
      className="glass-labo-hover team-card"
      style={{ borderRadius: 20, padding: "1.75rem", display: "flex", gap: "1.25rem", alignItems: "flex-start" }}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            background: `radial-gradient(circle at 30% 30%, ${meta.color}33, ${meta.color}11)`,
            border: "1px solid " + meta.border,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: meta.color,
          }}
        >
          <Icon size={22} strokeWidth={1.7} aria-hidden />
        </div>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.06em",
            padding: "0.2rem 0.55rem",
            borderRadius: 999,
            background: meta.color + "1a",
            border: "1px solid " + meta.border,
            color: meta.color,
            whiteSpace: "nowrap",
          }}
        >
          {item.badge}
        </span>
      </div>
      <div>
        <h3
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1rem",
            fontWeight: 700,
            color: "var(--labo-text)",
            marginBottom: "0.5rem",
            lineHeight: 1.3,
          }}
        >
          {item.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--labo-text-muted)", lineHeight: 1.65, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
  const t = useTranslations("home.team");
  const categories = t.raw("categories") as TeamCategory[];
  const stats = t.raw("stats") as TeamStat[];

  return (
    <section id="notre-equipe" style={{ background: "var(--labo-bg)", padding: "clamp(5rem,9vw,8rem) 0" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2.5rem", alignItems: "end", marginBottom: "3rem" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "var(--labo-accent-violet)",
                marginBottom: "0.85rem",
              }}
            >
              {t("sectionLabel")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(1.75rem,3.2vw,2.75rem)",
                fontWeight: 900,
                letterSpacing: "-0.03em",
                lineHeight: 1.05,
                color: "var(--labo-text)",
                margin: 0,
              }}
            >
              {t("sectionTitle")}
            </h2>
          </div>
          <p style={{ fontSize: "0.95rem", color: "var(--labo-text-muted)", lineHeight: 1.75, margin: 0 }}>
            {t("sectionIntro")}
          </p>
        </div>

        <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem", marginBottom: "2.5rem" }}>
          {categories.map((item, i) => (
            <TeamCard key={item.title} item={item} meta={CATEGORY_META[i % CATEGORY_META.length]} />
          ))}
        </div>

        <div
          className="team-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            overflow: "hidden",
            borderRadius: 16,
            border: "1px solid rgba(255,255,255,0.08)",
            gap: 1,
            background: "rgba(255,255,255,0.06)",
          }}
        >
          {stats.map((s) => (
            <div key={s.label} style={{ background: "rgba(17,24,39,0.85)", padding: "1.5rem 1.25rem", textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.1rem",
                  fontWeight: 800,
                  lineHeight: 1,
                  marginBottom: "0.4rem",
                  background: "linear-gradient(135deg,#00d4aa,#6c63ff)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--labo-text-muted)",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <p
          style={{
            marginTop: "1.5rem",
            textAlign: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.03em",
            color: "rgba(136,146,176,0.55)",
          }}
        >
          {t("note")}
        </p>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          #notre-equipe .team-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 640px) {
          #notre-equipe .team-grid { grid-template-columns: 1fr !important; }
          #notre-equipe .team-card { flex-direction: column !important; align-items: flex-start !important; }
          #notre-equipe .team-stats { grid-template-columns: repeat(2, 1fr) !important; }
          #notre-equipe [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

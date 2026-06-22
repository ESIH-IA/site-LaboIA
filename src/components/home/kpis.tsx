"use client";

import { useEffect, useRef } from "react";
import type { KpiItem, KpiSettings } from "@/lib/sanity/types";

type KpisProps = {
  title?: string;
  intro?: string;
  items: KpiItem[];
  meta?: KpiSettings;
};

const statusLabels = {
  draft: "Provisoire",
  confirmed: "Validé",
} as const;

const KPI_COLORS = ["#00d4aa", "#00d4aa", "#00d4aa", "#00d4aa"];

function KpiCard({ item, index }: { item: KpiItem; index: number }) {
  const arcRef = useRef<SVGCircleElement>(null);
  const valueRef = useRef<HTMLSpanElement>(null);
  const hasObserved = useRef(false);
  const color = KPI_COLORS[index % KPI_COLORS.length];

  useEffect(() => {
    const el = arcRef.current;
    if (!el) return;

    const circumference = 2 * Math.PI * 38;
    el.style.strokeDasharray = `${circumference}`;
    el.style.strokeDashoffset = `${circumference}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasObserved.current) {
          hasObserved.current = true;
          setTimeout(() => {
            el.style.transition = "stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)";
            el.style.strokeDashoffset = `${circumference * 0.25}`;
          }, index * 120);
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div className="glass-labo-hover rounded-2xl p-6 flex flex-col items-center text-center group">
      {/* SVG Arc */}
      <div className="relative mb-4">
        <svg width="100" height="100" viewBox="0 0 100 100" aria-hidden="true">
          <circle
            cx="50" cy="50" r="38"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="3"
          />
          <circle
            ref={arcRef}
            cx="50" cy="50" r="38"
            fill="none"
            stroke={color}
            strokeWidth="3"
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            style={{ opacity: 0.9 }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center flex-col">
          <span
            ref={valueRef}
            className="text-2xl font-bold"
            style={{ color, fontFamily: "var(--font-syne, sans-serif)" }}
          >
            {item.value}
          </span>
        </div>
      </div>

      <h3 className="text-sm font-semibold text-[#f0f4ff] mb-2">{item.label}</h3>

      {item.note && (
        <p className="mt-3 text-xs text-[#8892b0] leading-relaxed">{item.note}</p>
      )}
    </div>
  );
}

export default function Kpis({ title, intro, items, meta }: KpisProps) {
  return (
    <section className="section-labo-surface section-padding">
      <div className="container-site">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="badge-teal inline-flex mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa]" />
            Chiffres clés
          </div>
          <h2
            className="text-display-md text-[#f0f4ff]"
          >
            {title ?? "Indicateurs clés"}
          </h2>
          <p className="mt-4 text-[#8892b0] text-base leading-relaxed">
            {intro ?? "Données quantitatives sur nos activités de recherche et d'innovation"}
          </p>
        </div>

        <div className="grid gap-5 grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <KpiCard key={item._id} item={item} index={idx} />
          ))}
        </div>

        {(meta?.lastUpdated || meta?.disclaimer) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {meta.lastUpdated && (
              <>
                <span className="label-eyebrow text-[#8892b0]">Mise à jour :</span>
                <span className="text-xs text-[#8892b0]">{meta.lastUpdated}</span>
              </>
            )}
            {meta.disclaimer && (
              <span className="text-xs text-[#8892b0]/60">{meta.disclaimer}</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

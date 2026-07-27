"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Brain, Eye, ShieldCheck, HeartPulse, Leaf, BarChart3, X } from "lucide-react";
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

// Long-form content for the detail modal — not sourced from the CMS, kept verbatim.
type AxeDetail = { description: string; keywords: string[] };

const AXES_DETAILS: AxeDetail[] = [
  {
    description:
      "Cet axe constitue le socle scientifique du laboratoire : il vise à concevoir des méthodes d'apprentissage capables de fonctionner efficacement même lorsque les données disponibles sont rares, bruitées ou hétérogènes, une réalité fréquente dans le contexte caribéen où les infrastructures de collecte de données restent limitées. Les travaux portent notamment sur l'apprentissage auto-supervisé, qui permet d'exploiter des données non annotées, le transfert d'apprentissage entre domaines, ainsi que sur la robustesse des modèles face aux variations et aux biais. Une attention particulière est portée à la frugalité computationnelle, afin de développer une IA performante sans dépendre d'infrastructures coûteuses.",
    keywords: ["apprentissage auto-supervisé", "transfert d'apprentissage", "robustesse", "IA frugale"],
  },
  {
    description:
      "Cet axe explore l'analyse automatique d'images, de documents et de données multimodales (texte, image, signal) pour des applications concrètes touchant l'agriculture, la santé et l'environnement. Une dimension spécifique et originale du laboratoire concerne le traitement de documents rédigés en créole et en français, un enjeu linguistique encore peu couvert par les outils d'IA existants. Les recherches combinent des techniques de vision par ordinateur modernes avec des approches adaptées aux spécificités locales des données.",
    keywords: ["vision par ordinateur", "analyse multimodale", "traitement documentaire", "créole haïtien"],
  },
  {
    description:
      "Face à l'adoption croissante de l'IA dans des décisions sensibles, cet axe s'attache à rendre les modèles compréhensibles, équitables et fiables. Les travaux couvrent l'explicabilité des modèles pour permettre aux utilisateurs de comprendre leurs décisions, la détection et la réduction des biais algorithmiques, ainsi que l'audit des systèmes d'IA pour évaluer leurs limites et leurs risques. Cet axe est transversal aux autres, car il vise à garantir que les solutions développées par le laboratoire restent dignes de confiance et déployables de manière responsable.",
    keywords: ["explicabilité", "équité algorithmique", "audit de systèmes IA", "IA responsable"],
  },
  {
    description:
      "Cet axe applique l'IA aux enjeux de santé publique et clinique, avec un accent sur l'analyse d'images médicales pour l'aide au dépistage, le soutien à la décision clinique et la surveillance épidémiologique. Le laboratoire développe également des assistants documentaires et des interfaces destinées aux professionnels de santé, conçus en créole haïtien afin de faciliter leur adoption sur le terrain et de répondre aux besoins réels des systèmes de santé locaux.",
    keywords: ["imagerie médicale", "aide au diagnostic", "surveillance épidémiologique", "santé numérique"],
  },
  {
    description:
      "Cet axe met l'IA au service de la sécurité alimentaire et de l'adaptation climatique, deux enjeux majeurs pour la région caribéenne. Les recherches portent sur la détection automatique des maladies des cultures à partir d'images, les recommandations agronomiques personnalisées, l'analyse d'images satellitaires pour le suivi environnemental, ainsi que sur des systèmes d'alerte précoce face aux risques climatiques et naturels.",
    keywords: ["agriculture de précision", "imagerie satellitaire", "alerte précoce", "résilience climatique"],
  },
  {
    description:
      "Cet axe explore comment l'IA peut soutenir la transformation numérique des institutions publiques et économiques. Il couvre l'aide à la décision, l'automatisation documentaire, ainsi que le développement d'outils adaptés à l'éducation, à l'administration publique et à l'économie locale, en intégrant systématiquement le traitement du créole haïtien pour garantir l'accessibilité des outils développés.",
    keywords: ["transformation numérique", "aide à la décision", "éducation", "gouvernance publique"],
  },
];

const cardBase: CSSProperties = {
  position: "relative",
  background: "rgba(17,24,39,0.82)",
  border: "1px solid rgba(255,255,255,0.07)",
  borderRadius: 20,
  padding: "2rem",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  minHeight: 220,
  height: "100%",
  width: "100%",
  textAlign: "left",
  cursor: "pointer",
  font: "inherit",
  color: "inherit",
  transition: "transform 0.25s ease-out, border-color 0.25s ease-out, box-shadow 0.25s ease-out",
};

// --- Clickable axis card — opens the detail modal ---
function AxeCard({ item, ax, onOpen }: { item: HighlightItem; ax: AxeMeta; onOpen: () => void }) {
  const Icon = ax.icon;
  return (
    <button
      type="button"
      onClick={onOpen}
      aria-haspopup="dialog"
      style={{ ...cardBase, borderColor: "rgba(255,255,255,0.07)", boxShadow: "0 12px 32px rgba(0,0,0,0.28)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-5px)";
        el.style.borderColor = ax.color + "55";
        el.style.boxShadow = "0 20px 44px rgba(0,0,0,0.36), 0 0 0 1px " + ax.color + "40";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(0)";
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.28)";
      }}
      onFocus={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = ax.color + "55";
        el.style.boxShadow = "0 0 0 2px " + ax.color + "80";
      }}
      onBlur={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(255,255,255,0.07)";
        el.style.boxShadow = "0 12px 32px rgba(0,0,0,0.28)";
      }}
    >
      <span aria-hidden="true" style={{ position: "absolute", bottom: "-0.25rem", right: "1rem", fontFamily: "var(--font-display)", fontSize: "5.5rem", fontWeight: 900, lineHeight: 1, color: ax.color, opacity: 0.05, userSelect: "none", pointerEvents: "none" }}>
        {ax.num}
      </span>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ width: 44, height: 44, borderRadius: 12, background: ax.bg, border: "1px solid " + ax.border, display: "flex", alignItems: "center", justifyContent: "center", color: ax.color }}>
          <Icon size={20} strokeWidth={1.6} aria-hidden />
        </div>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", letterSpacing: "0.14em", color: ax.color, opacity: 0.7 }}>
          AXE {ax.num}
        </span>
      </div>
      <div>
        <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--labo-text)", marginBottom: "0.5rem", lineHeight: 1.3 }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "0.85rem", color: "var(--labo-text-muted)", lineHeight: 1.65, margin: 0 }}>
          {item.description}
        </p>
      </div>
    </button>
  );
}

// --- Detail modal: overlay + dialog, Escape/click-outside/close button, focus trap ---
function AxeModal({
  item,
  detail,
  ax,
  closeLabel,
  keywordsLabel,
  onClose,
}: {
  item: HighlightItem;
  detail: AxeDetail;
  ax: AxeMeta;
  closeLabel: string;
  keywordsLabel: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const Icon = ax.icon;

  useEffect(() => {
    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const getFocusable = () => Array.from(dialogEl.querySelectorAll<HTMLElement>(focusableSelector));
    getFocusable()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [onClose]);

  return (
    <div
      role="presentation"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        background: "rgba(6,9,18,0.72)",
        backdropFilter: "blur(4px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 640,
          maxHeight: "85vh",
          overflowY: "auto",
          background: "#0d1420",
          border: "1px solid " + ax.border,
          borderRadius: 20,
          padding: "2.25rem",
          boxShadow: "0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px " + ax.color + "22",
        }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          style={{
            position: "absolute",
            top: "1.25rem",
            right: "1.25rem",
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.12)",
            background: "rgba(255,255,255,0.04)",
            color: "var(--labo-text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <X size={16} strokeWidth={1.8} aria-hidden />
        </button>

        <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1.25rem" }}>
          <div style={{ width: 48, height: 48, borderRadius: 13, background: ax.bg, border: "1px solid " + ax.border, display: "flex", alignItems: "center", justifyContent: "center", color: ax.color, flexShrink: 0 }}>
            <Icon size={22} strokeWidth={1.6} aria-hidden />
          </div>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.7rem", letterSpacing: "0.14em", color: ax.color, opacity: 0.8 }}>
            AXE {ax.num}
          </span>
        </div>

        <h3
          id={titleId}
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.35rem,2.4vw,1.75rem)", fontWeight: 700, color: "var(--labo-text)", marginBottom: "1.1rem", lineHeight: 1.25, letterSpacing: "-0.01em", paddingRight: "2.5rem" }}
        >
          {item.title}
        </h3>

        <p style={{ fontSize: "0.95rem", color: "var(--labo-text-muted)", lineHeight: 1.8, margin: "0 0 1.5rem" }}>
          {detail.description}
        </p>

        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.62rem", letterSpacing: "0.14em", textTransform: "uppercase", color: ax.color, opacity: 0.8, marginBottom: "0.75rem" }}>
            {keywordsLabel}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {detail.keywords.map((kw) => (
              <span
                key={kw}
                style={{
                  fontSize: "0.78rem",
                  padding: "0.35rem 0.75rem",
                  borderRadius: 999,
                  background: ax.bg,
                  border: "1px solid " + ax.border,
                  color: ax.color,
                }}
              >
                {kw}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Highlights({ title, intro, items }: HighlightsProps) {
  const t = useTranslations("home.highlights");
  const tc = useTranslations("common");
  // Any non-empty CMS list is honoured (up to 6 slots); only an empty/missing
  // list falls back to the hardcoded axes, so editors adding/removing an axe
  // in Sanity always see their change reflected instead of it being silently
  // discarded when the count isn't exactly 6.
  const list = items?.length ? items.slice(0, 6) : (t.raw("axes") as HighlightItem[]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const closeLabel = tc("close");
  const keywordsLabel = tc("keywords");

  const openItem = openIndex !== null ? list[openIndex] : null;
  const openDetail = openIndex !== null ? AXES_DETAILS[openIndex % AXES_DETAILS.length] : null;
  const openAx = openIndex !== null ? AXES_META[openIndex % AXES_META.length] : null;

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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.25rem" }}>
          {list.map((item, i) => {
            const ax = AXES_META[i % AXES_META.length];
            return (
              <AxeCard key={item.title ?? i} item={item} ax={ax} onOpen={() => setOpenIndex(i)} />
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

      {openItem && openDetail && openAx ? (
        <AxeModal
          item={openItem}
          detail={openDetail}
          ax={openAx}
          closeLabel={closeLabel}
          keywordsLabel={keywordsLabel}
          onClose={() => setOpenIndex(null)}
        />
      ) : null}

      <style>{`
        @media (max-width: 767px) {
          #axes-de-recherche [style*="repeat(3"] { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 560px) {
          #axes-de-recherche [style*="1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          #axes-de-recherche button { transition: none !important; }
        }
      `}</style>
    </section>
  );
}

"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import ContactForm from "@/components/forms/contact-form";
import CollaborateForm from "@/components/forms/collaborate-form";
import type { FormSettings } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

type Tab = "contact" | "collaborate";

const tabLabels: Record<Locale, { contact: string; collaborate: string }> = {
  fr: { contact: "Nous contacter", collaborate: "Proposer une collaboration" },
  en: { contact: "Contact us", collaborate: "Propose a collaboration" },
};

function Tabs({ forms, locale }: { forms?: FormSettings | null; locale: Locale }) {
  const searchParams = useSearchParams();
  const [active, setActive] = useState<Tab>("contact");

  useEffect(() => {
    if (searchParams.get("tab") === "collaborate") setActive("collaborate");
  }, [searchParams]);

  const labels = tabLabels[locale] ?? tabLabels.fr;

  return (
    <div>
      {/* Tab bar */}
      <div
        role="tablist"
        style={{
          display: "flex",
          gap: "0.5rem",
          borderBottom: "1px solid rgba(255,255,255,0.08)",
          marginBottom: "2.5rem",
        }}
      >
        {(["contact", "collaborate"] as Tab[]).map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={active === tab}
            onClick={() => setActive(tab)}
            style={{
              padding: "0.65rem 1.25rem",
              fontSize: "0.9rem",
              fontWeight: 600,
              border: "none",
              background: "transparent",
              color: active === tab ? "var(--labo-accent-teal, #00d4aa)" : "var(--labo-text-muted, #8892b0)",
              borderBottom: active === tab ? "2px solid var(--labo-accent-teal, #00d4aa)" : "2px solid transparent",
              cursor: "pointer",
              marginBottom: "-1px",
              transition: "color 0.2s, border-color 0.2s",
              fontFamily: "var(--font-body)",
            }}
          >
            {tab === "contact" ? labels.contact : labels.collaborate}
          </button>
        ))}
      </div>

      {/* Panel */}
      {active === "contact" ? (
        <ContactForm copy={forms?.contact} locale={locale} />
      ) : (
        <CollaborateForm copy={forms?.collaborate} locale={locale} />
      )}
    </div>
  );
}

export default function ContactCollaborateTabs({ forms, locale }: { forms?: FormSettings | null; locale: Locale }) {
  return (
    <Suspense fallback={<ContactForm locale={locale} />}>
      <Tabs forms={forms} locale={locale} />
    </Suspense>
  );
}

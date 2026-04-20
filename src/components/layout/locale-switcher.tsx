"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

import { usePathname, useRouter } from "@/i18n/navigation";
import { localeNames, localeFlags, type Locale } from "@/lib/i18n";
import { routing } from "@/i18n/routing";

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("locale");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function switchLocale(newLocale: Locale) {
    setOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: newLocale });
    });
  }

  return (
    <div ref={ref} className="locale-switcher">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="locale-btn"
        aria-label={t("switchLanguage")}
        aria-expanded={open}
      >
        <span>{localeFlags[locale]}</span>
        <span className="locale-btn-label">{localeNames[locale]}</span>
        <span className="locale-btn-short">{locale.toUpperCase()}</span>
        <svg
          className={`locale-chevron ${open ? "locale-chevron--open" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="locale-dropdown">
          {routing.locales.map((loc) => {
            const isActive = loc === locale;
            return (
              <button
                key={loc}
                onClick={() => switchLocale(loc)}
                className={`locale-option ${isActive ? "locale-option--active" : ""}`}
              >
                <span className="locale-option-flag">{localeFlags[loc]}</span>
                <span>{localeNames[loc]}</span>
                {isActive && (
                  <svg className="locale-option-check" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

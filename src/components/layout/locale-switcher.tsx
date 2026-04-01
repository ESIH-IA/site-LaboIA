"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";

function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

function getCurrentLocale(pathname: string): Locale {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return first as Locale;
  }
  return "fr"; // default
}

export default function LocaleSwitcher() {
  const pathname = usePathname() || "/";
  const basePath = stripLocale(pathname);
  const currentLocale = getCurrentLocale(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Fermer le dropdown quand on clique ailleurs
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Bouton principal */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 transition hover:border-cyan-300 hover:bg-cyan-50/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/30"
        aria-label="Changer de langue"
        aria-expanded={open}
      >
        <span>{localeFlags[currentLocale]}</span>
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
        <svg
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 min-w-[160px] overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg animate-in fade-in slide-in-from-top-1">
          {locales.map((locale) => {
            const href = locale === "fr" ? basePath || "/" : `/${locale}${basePath}`;
            const isActive = locale === currentLocale;

            return (
              <Link
                key={locale}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-2.5 text-sm transition ${
                  isActive
                    ? "bg-cyan-50 font-semibold text-cyan-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                <span className="text-base">{localeFlags[locale]}</span>
                <span>{localeNames[locale]}</span>
                {isActive && (
                  <svg className="ml-auto h-4 w-4 text-cyan-500" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

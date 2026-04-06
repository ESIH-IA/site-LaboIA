"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useState, useRef, useEffect, useTransition } from "react";
import { locales, localeNames, localeFlags, type Locale } from "@/lib/i18n";

function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

export default function LocaleSwitcher() {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();
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
      let basePath = pathname;
      for (const loc of locales) {
        if (pathname.startsWith(`/${loc}/`)) {
          basePath = pathname.slice(loc.length + 1);
          break;
        } else if (pathname === `/${loc}`) {
          basePath = "/";
          break;
        }
      }
      const newPath = newLocale === "fr" ? (basePath || "/") : `/${newLocale}${basePath === "/" ? "" : basePath}`;
      router.push(newPath);
    });
  }

  return (
    <div ref={ref} className="locale-switcher">
      <button
        onClick={() => setOpen(!open)}
        disabled={isPending}
        className="locale-btn"
        aria-label="Changer de langue"
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
          {locales.map((loc) => {
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

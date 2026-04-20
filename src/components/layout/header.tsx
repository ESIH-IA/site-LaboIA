"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { locales, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/media/logo";
import LocaleSwitcher from "@/components/layout/locale-switcher";
import type { Navigation, SiteSettings } from "@/lib/sanity/types";

function getCurrentLocale(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  return first && locales.includes(first as Locale) ? (first as Locale) : null;
}

function stripLocale(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && locales.includes(first as Locale)) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname;
}

function withLocale(href: string, locale: Locale | null) {
  if (!locale) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href}`;
}

function isActivePath(current: string, href: string) {
  if (href === "/") return current === "/";
  return current === href || current.startsWith(`${href}/`);
}

function DesktopNavLink({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`nav-link ${active ? "nav-link--active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      {label}
    </Link>
  );
}

function MobileNavLink({
  href,
  label,
  active,
  onNavigate,
}: {
  href: string;
  label: string;
  active: boolean;
  onNavigate: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={`mobile-nav-link ${active ? "mobile-nav-link--active" : ""}`}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="mobile-nav-arrow">
        &gt;
      </span>
    </Link>
  );
}

export default function Header({
  nav,
  site,
}: {
  nav: Navigation;
  site: SiteSettings;
}) {
  const pathname = usePathname() || "/";
  const currentLocale = useMemo(() => getCurrentLocale(pathname), [pathname]);
  const basePath = useMemo(() => stripLocale(pathname) || "/", [pathname]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = useTranslations("header");

  const navItems = useMemo(() => {
    return nav.mainNav.map((item) => {
      const localizedHref = withLocale(item.href, currentLocale);
      const active = isActivePath(basePath, item.href);
      return { ...item, localizedHref, active };
    });
  }, [basePath, currentLocale, nav.mainNav]);

  return (
    <header className="header">
      <div className="header-inner">
        <Link
          href={withLocale("/", currentLocale)}
          title={site.name}
          className="header-logo"
        >
          <Logo size="header" className="header-logo-img" logo={site.logo} />
          <div className="header-logo-name">
            <div>
              {site.shortName}
            </div>
            <div className="header-logo-tagline">
              {site.tagline ?? t("tagline")}
            </div>
          </div>
        </Link>

        <div className="header-actions">
          <nav className="header-nav">
            {navItems.map((item) => (
              <DesktopNavLink
                key={item.href}
                href={item.localizedHref}
                label={item.label}
                active={item.active}
              />
            ))}
          </nav>

          <button
            type="button"
            className="mobile-menu-btn"
            aria-label={t("openMenu")}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span className="sr-only">{t("menu")}</span>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>

          <LocaleSwitcher />
        </div>
      </div>

      {mobileOpen ? (
        <div
          className="mobile-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={t("navigation")}
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="mobile-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mobile-panel-header">
              <div className="mobile-panel-title">{t("menu")}</div>
              <button
                type="button"
                className="mobile-close-btn"
                aria-label={t("closeMenu")}
                onClick={() => setMobileOpen(false)}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="mobile-nav">
              {navItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.localizedHref}
                  label={item.label}
                  active={item.active}
                  onNavigate={() => setMobileOpen(false)}
                />
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

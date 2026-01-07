"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

import { mainNav } from "@/content/nav";
import { site } from "@/content/site";
import { locales, type Locale } from "@/lib/i18n";
import { Logo } from "@/components/media/logo";
import LocaleSwitcher from "@/components/layout/locale-switcher";

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
      className={[
        "relative rounded-full px-2 py-1 text-sm font-medium transition-colors",
        "text-muted hover:bg-surface-muted hover:text-accent",
        "after:absolute after:inset-x-2 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-accent after:origin-left after:scale-x-0 after:transition-transform after:duration-200",
        "hover:after:scale-x-100",
        active ? "bg-surface-muted text-foreground after:scale-x-100" : "",
      ].join(" ")}
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
      className={[
        "flex w-full items-center justify-between rounded-xl px-4 py-3 text-base font-medium transition-colors",
        active
          ? "bg-surface-muted text-foreground"
          : "text-muted hover:bg-surface-muted hover:text-foreground",
      ].join(" ")}
      aria-current={active ? "page" : undefined}
    >
      <span>{label}</span>
      <span aria-hidden="true" className="text-neutral-400">
        →
      </span>
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname() || "/";
  const currentLocale = useMemo(() => getCurrentLocale(pathname), [pathname]);
  const basePath = useMemo(() => stripLocale(pathname) || "/", [pathname]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = useMemo(() => {
    return mainNav.map((item) => {
      const localizedHref = withLocale(item.href, currentLocale);
      const active = isActivePath(basePath, item.href);
      return { ...item, localizedHref, active };
    });
  }, [basePath, currentLocale]);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 shadow-sm shadow-black/5 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-3">
        <Link
          href={withLocale("/", currentLocale)}
          title={site.name}
          className="flex items-center gap-3 leading-tight"
        >
          <Logo size="header" className="h-9 w-9" />
          <div className="flex flex-col">
            <div className="text-base font-semibold tracking-tight text-foreground">
              {site.shortName}
            </div>
            <div className="hidden text-xs text-muted md:block">
              Laboratoire de recherche en IA &amp; science des données
            </div>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <nav className="hidden items-center gap-5 md:flex">
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
            className="inline-flex items-center justify-center rounded-xl border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm shadow-black/5 transition hover:bg-surface-muted md:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <span className="sr-only">Menu</span>
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
          className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation"
          onClick={() => setMobileOpen(false)}
        >
          <div
            className="absolute right-4 top-16 w-[min(22rem,calc(100%-2rem))] rounded-2xl border border-border bg-background p-4 shadow-lg"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="text-sm font-semibold text-foreground">Menu</div>
              <button
                type="button"
                className="rounded-lg p-2 text-muted transition hover:bg-surface-muted hover:text-foreground"
                aria-label="Fermer le menu"
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

            <div className="mt-3 grid gap-1">
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

import Image from "next/image";
import { Link } from "@/i18n/navigation";

import type { Locale } from "@/lib/i18n";
import type { Navigation, SiteSettings } from "@/lib/sanity/types";

const t = {
  fr: {
    labSection: "Laboratoire",
    axes: "Axes de recherche",
    projects: "Projets",
    newsletter: "Newsletter",
    rights: "Tous droits réservés",
    tagline: "Haïti · Caraïbes · Recherche IA",
  },
  en: {
    labSection: "Laboratory",
    axes: "Research Axes",
    projects: "Projects",
    newsletter: "Newsletter",
    rights: "All rights reserved",
    tagline: "Haiti · Caribbean · AI Research",
  },
};

export default function Footer({
  nav,
  site,
  locale = "fr",
}: {
  nav: Navigation;
  site: SiteSettings;
  locale?: Locale;
}) {
  const tx = t[locale] ?? t.fr;
  const year = new Date().getFullYear();
  const logoSrc = site.logo?.url ?? "/logo/logo-site.svg";
  const logoAlt = site.logo?.alt ?? site.shortName ?? "LaCDIA";

  return (
    <footer
      className="bg-[#0a0f1c] border-t border-white/8"
      style={{ fontFamily: "var(--font-body, sans-serif)" }}
    >
      {/* — Main footer grid */}
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-12">

          {/* — LABO column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative h-9 w-9 shrink-0">
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <div>
                <div
                  className="text-sm font-bold text-[#f0f4ff] tracking-tight"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  {site.shortName ?? "LaCDIA"}
                  <span
                    className="ml-2 text-[10px] font-normal text-[#8892b0] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
                  >
                    LABO
                  </span>
                </div>
                <div className="text-xs text-[#8892b0] mt-0.5 leading-none">
                  {site.name ?? "Laboratoire Caraïbéen des Sciences des Données et de l'IA"}
                </div>
              </div>
            </div>

            <p className="text-sm text-[#8892b0] leading-relaxed max-w-xs">
              {site.description ??
                "Recherche appliquée en intelligence artificielle et science des données au service des communautés caribéennes."}
            </p>

            {/* Réseaux sociaux */}
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/company/lacdia"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#8892b0] hover:border-[#00d4aa]/40 hover:text-[#00d4aa] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a
                href="https://www.researchgate.net"
                target="_blank"
                rel="noreferrer"
                aria-label="ResearchGate"
                className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 text-[#8892b0] hover:border-[#00d4aa]/40 hover:text-[#00d4aa] transition-all"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19.586 0H4.414A4.414 4.414 0 000 4.414v15.172A4.414 4.414 0 004.414 24h15.172A4.414 4.414 0 0024 19.586V4.414A4.414 4.414 0 0019.586 0zM11.67 17.35h-1.81v-5.04H8.23v5.04H6.42V6.65h1.81v4.01h1.63V6.65h1.81v10.7zm5.35 0c-1.76 0-3.12-1.12-3.12-3.08v-4.54c0-1.96 1.36-3.08 3.12-3.08 1.77 0 3.13 1.12 3.13 3.08v1.28h-1.72v-1.28c0-.84-.54-1.38-1.41-1.38-.87 0-1.41.54-1.41 1.38v4.54c0 .84.54 1.38 1.41 1.38.87 0 1.41-.54 1.41-1.38v-1.73h-1.41v-1.7h3.13v3.43c0 1.96-1.36 3.08-3.13 3.08z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* — Navigation + Contact */}
          <div className="lg:col-span-7 grid grid-cols-3 gap-8">
            <div>
              <div
                className="text-[10px] font-medium text-[#8892b0] tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
              >
                Navigation
              </div>
              <nav className="flex flex-col gap-2.5">
                {nav.footerNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[#8892b0] hover:text-[#f0f4ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div
                className="text-[10px] font-medium text-[#8892b0] tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
              >
                {tx.labSection}
              </div>
              <nav className="flex flex-col gap-2.5">
                {[
                  { label: tx.axes, href: "/recherche/axes" },
                  { label: tx.projects, href: "/projets" },
                  { label: tx.newsletter, href: "/newsletter" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-sm text-[#8892b0] hover:text-[#f0f4ff] transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <div
                className="text-[10px] font-medium text-[#8892b0] tracking-widest uppercase mb-4"
                style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
              >
                {site.footerContactTitle ?? "Contact"}
              </div>
              <div className="flex flex-col gap-2.5 text-sm text-[#8892b0]">
                {site.footerContactText && (
                  <p className="leading-relaxed">{site.footerContactText}</p>
                )}
                <Link
                  href={site.footerContactCtaHref ?? "/contact"}
                  className="text-[#f0f4ff] hover:text-[#00d4aa] transition-colors underline underline-offset-4 decoration-white/20 hover:decoration-[#00d4aa]/40"
                >
                  {site.footerContactCtaLabel ?? "Écrire au laboratoire"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* — Bottom bar */}
      <div className="border-t border-white/6">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p
            className="text-xs text-[#8892b0]/60"
            style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
          >
            © {year} {site.shortName ?? "LaCDIA"}. {tx.rights}.
          </p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
            <span
              className="text-xs text-[#8892b0]/60"
              style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
            >
              {tx.tagline}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

import Link from "next/link";
import Image from "next/image";

import type { Navigation, SiteSettings } from "@/lib/sanity/types";

export default function Footer({
  nav,
  site,
}: {
  nav: Navigation;
  site: SiteSettings;
}) {
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
          <div className="lg:col-span-4">
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

            {site.footerLanguageNote && (
              <p className="mt-4 text-xs text-[#8892b0]/60">
                {site.footerLanguageNote}
              </p>
            )}
          </div>

          {/* — TECH column */}
          <div className="lg:col-span-4 lg:border-l lg:border-white/6 lg:pl-12">
            <div className="mb-5">
              <div className="flex items-center gap-2">
                <span
                  className="text-sm font-bold text-[#f0f4ff] tracking-tight"
                  style={{ fontFamily: "var(--font-syne, sans-serif)" }}
                >
                  LaCDIA
                  <span
                    className="ml-1.5 text-[10px] font-normal text-[#00d4aa] tracking-widest uppercase"
                    style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
                  >
                    TECH ●
                  </span>
                </span>
              </div>
              <p className="mt-2 text-xs text-[#8892b0] leading-relaxed max-w-xs">
                Solutions IA déployables : consulting, développement sur mesure et accompagnement terrain.
              </p>
            </div>

            <Link
              href="/solutions"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#00d4aa] hover:text-[#00f0c0] transition-colors"
            >
              Découvrir nos services
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M7 17L17 7M17 7H7M17 7v10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          {/* — Navigation + Contact */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8">
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
            © {year} {site.shortName ?? "LaCDIA"}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00d4aa] animate-pulse" />
            <span
              className="text-xs text-[#8892b0]/60"
              style={{ fontFamily: "var(--font-jetbrains, monospace)" }}
            >
              Haïti · Caraïbes · Recherche IA
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

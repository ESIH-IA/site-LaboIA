import Link from "next/link";

import { Logo } from "@/components/media/logo";
import type { Navigation, SiteSettings } from "@/lib/sanity/types";

export default function Footer({
  nav,
  site,
}: {
  nav: Navigation;
  site: SiteSettings;
}) {
  return (
    <footer className="border-t border-border bg-gradient-to-b from-footer to-slate-950 text-footer-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <div className="flex items-center gap-3">
            <Logo size="footer" className="h-9 w-auto opacity-95" logo={site.logo} />
            <div>
              <div className="text-sm font-semibold tracking-tight text-footer-foreground">
                {site.shortName}
              </div>
              <div className="mt-1 text-xs text-slate-300">{site.name}</div>
            </div>
          </div>
          <p className="mt-4 max-w-md text-sm text-slate-300">{site.description}</p>
          {site.footerLanguageNote ? (
            <p className="mt-4 text-xs text-slate-400">{site.footerLanguageNote}</p>
          ) : null}
        </div>

        <div className="md:col-span-4">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            Le Laboratoire
          </div>
          <div className="mt-4 grid grid-cols-1 gap-y-2.5 text-sm">
            <Link href="/a-propos" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">À propos</Link>
            <Link href="/recherche/departement-scientifique" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">Département Scientifique</Link>
            <Link href="/lacdia-tech" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">LaCDIA Tech</Link>
            <Link href="/equipe" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">Équipe</Link>
            <Link href="/partenariats" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">Partenariats</Link>
            <Link href="/publications" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">Publications</Link>
            <Link href="/actualites" className="text-slate-200 transition hover:text-white hover:underline hover:decoration-accent/40 hover:underline-offset-4">Actualités</Link>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {site.footerContactTitle ?? "Contact"}
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-300">
            {site.footerContactText ? <div>{site.footerContactText}</div> : null}
            <Link
              href={site.footerContactCtaHref ?? "/contact"}
              className="inline-flex text-slate-200 underline underline-offset-4"
            >
              {site.footerContactCtaLabel ?? "\u00c9crire au laboratoire"}
            </Link>
          </div>
        </div>

        <div className="md:col-span-12">
          <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
            <div>
              Copyright {new Date().getFullYear()} {site.shortName}. Tous droits r\u00e9serv\u00e9s.
            </div>
            <div className="flex flex-wrap gap-4">
              {nav.footerNav.map((item) => (
                <Link
                  key={`legal-${item.href}`}
                  href={item.href}
                  className="hover:text-slate-200 hover:underline hover:decoration-accent/40 hover:underline-offset-4"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

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
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-header">
            <Logo size="footer" className="h-9 w-auto opacity-95" logo={site.logo} />
            <div>
              <div className="footer-brand-name">
                {site.shortName}
              </div>
              <div className="footer-brand-fullname">{site.name}</div>
            </div>
          </div>
          <p className="footer-brand-desc">{site.description}</p>
          {site.footerLanguageNote ? (
            <p className="footer-brand-note">{site.footerLanguageNote}</p>
          ) : null}
        </div>

        <div className="footer-nav-col">
          <div className="footer-nav-heading">
            Le Laboratoire
          </div>
          <div className="footer-nav-list">
            <Link href="/a-propos" className="footer-nav-link">À propos</Link>
            <Link href="/recherche/departement-scientifique" className="footer-nav-link">Département Scientifique</Link>
            <Link href="/lacdia-tech" className="footer-nav-link">LaCDIA Tech</Link>
            <Link href="/equipe" className="footer-nav-link">Équipe</Link>
            <Link href="/partenariats" className="footer-nav-link">Partenariats</Link>
            <Link href="/publications" className="footer-nav-link">Publications</Link>
            <Link href="/actualites" className="footer-nav-link">Actualités</Link>
          </div>
        </div>

        <div className="footer-contact-col">
          <div className="footer-nav-heading">
            {site.footerContactTitle ?? "Contact"}
          </div>
          <div className="footer-contact-body">
            {site.footerContactText ? <div>{site.footerContactText}</div> : null}
            <Link
              href={site.footerContactCtaHref ?? "/contact"}
              className="footer-contact-link"
            >
              {site.footerContactCtaLabel ?? "Écrire au laboratoire"}
            </Link>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-inner">
            <div>
              Copyright {new Date().getFullYear()} {site.shortName}. Tous droits réservés.
            </div>
            <div className="footer-legal-links">
              {nav.footerNav.map((item) => (
                <Link
                  key={`legal-${item.href}`}
                  href={item.href}
                  className="footer-legal-link"
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

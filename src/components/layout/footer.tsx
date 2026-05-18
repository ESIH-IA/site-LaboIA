import { Link } from "@/i18n/navigation";
import { Logo } from "@/components/media/logo";
import type { Navigation, SiteSettings } from "@/lib/sanity/types";

export default async function Footer({
  site,
  nav,
}: {
  site: SiteSettings;
  nav: Navigation;
}) {
  const copyrightText = site.footerCopyrightText
    ?.replace("{year}", String(new Date().getFullYear()))
    .replace("{shortName}", site.shortName);

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <div className="footer-brand-header">
            <Logo size="footer" className="h-9 w-auto opacity-95" logo={site.logo} />
            <div>
              <div className="footer-brand-name">{site.shortName}</div>
              <div className="footer-brand-fullname">{site.name}</div>
            </div>
          </div>
          {site.description ? <p className="footer-brand-desc">{site.description}</p> : null}
          {site.footerLanguageNote ? <p className="footer-brand-note">{site.footerLanguageNote}</p> : null}
        </div>

        <div className="footer-nav-col">
          {site.footerNavTitle ? <div className="footer-nav-heading">{site.footerNavTitle}</div> : null}
          <div className="footer-nav-list">
            {nav.footerNav
              .filter(item => !['/mentions-legales', '/confidentialite', '/cookies'].includes(item.href))
              .map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="footer-nav-link">
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="footer-contact-col">
          {site.footerContactTitle ? <div className="footer-nav-heading">{site.footerContactTitle}</div> : null}
          <div className="footer-contact-body">
            {site.footerContactText ? <div>{site.footerContactText}</div> : null}
            {site.footerContactCtaHref && site.footerContactCtaLabel ? (
              <Link href={site.footerContactCtaHref} className="footer-contact-link">
                {site.footerContactCtaLabel}
              </Link>
            ) : null}
          </div>
        </div>

        {copyrightText ? (
          <div className="footer-bottom">
            <div className="footer-bottom-inner">
              <div>{copyrightText}</div>
            </div>
          </div>
        ) : null}
      </div>
    </footer>
  );
}

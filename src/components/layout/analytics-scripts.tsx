"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const consentCookie = "lacdia_cookie_consent";

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
}

export default function AnalyticsScripts() {
  const [consent, setConsent] = useState<string>("");
  const pathname = usePathname();

  useEffect(() => {
    const updateConsent = () => setConsent(getCookie(consentCookie));
    updateConsent();
    window.addEventListener("lacdia-consent", updateConsent);
    return () => window.removeEventListener("lacdia-consent", updateConsent);
  }, []);

  const matomoUrl = process.env.NEXT_PUBLIC_MATOMO_URL;
  const matomoSiteId = process.env.NEXT_PUBLIC_MATOMO_SITE_ID;
  const gaId = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    if (consent !== "accepted") return;
    if (!pathname) return;
    const matomo = (window as unknown as { _paq?: unknown[] })._paq;
    if (matomo) {
      matomo.push(["setCustomUrl", pathname]);
      matomo.push(["trackPageView"]);
    }
    const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
    if (gtag) {
      gtag("event", "page_view", { page_path: pathname });
    }
  }, [pathname, consent]);

  if (consent !== "accepted") return null;

  if (matomoUrl && matomoSiteId) {
    const baseUrl = matomoUrl.endsWith("/") ? matomoUrl : `${matomoUrl}/`;

    return (
      <>
        <Script id="matomo-init" strategy="afterInteractive">
          {`
            var _paq = window._paq = window._paq || [];
            _paq.push(['trackPageView']);
            _paq.push(['enableLinkTracking']);
            (function() {
              var u='${baseUrl}';
              _paq.push(['setTrackerUrl', u+'matomo.js']);
              _paq.push(['setSiteId', '${matomoSiteId}']);
              var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
              g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
            })();
          `}
        </Script>
      </>
    );
  }

  if (gaId) {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', { anonymize_ip: true });
          `}
        </Script>
      </>
    );
  }

  return null;
}

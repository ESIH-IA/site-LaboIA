"use client";

import { useEffect, useState } from "react";

import { Link } from "@/i18n/navigation";
import type { SiteSettings } from "@/lib/sanity/types";

const consentCookie = "lacdia_cookie_consent";

function getCookie(name: string) {
  if (typeof document === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
}

function setCookie(name: string, value: string, days = 180) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
}

export default function CookieBanner({ site }: { site: SiteSettings }) {
  const [visible, setVisible] = useState(false);
  const hasCopy = Boolean(site.cookieMessage && site.cookieAcceptLabel && site.cookieRejectLabel);

  useEffect(() => {
    const consent = getCookie(consentCookie);
    if (!consent) {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, []);

  if (!visible || !hasCopy) return null;

  const handleChoice = (value: "accepted" | "rejected") => {
    setCookie(consentCookie, value);
    setVisible(false);
    window.dispatchEvent(new Event("lacdia-consent"));
  };

  return (
    <div className="cookie-banner">
      {site.cookieTitle ? <h2 className="cookie-title">{site.cookieTitle}</h2> : null}
      <p className="cookie-text">
        {site.cookieMessage}{" "}
        {site.cookiePolicyHref && site.cookiePolicyLabel ? (
          <Link href={site.cookiePolicyHref}>{site.cookiePolicyLabel}</Link>
        ) : null}
        .
      </p>
      <div className="cookie-actions">
        <button
          type="button"
          className="btn btn-small btn-small-primary"
          onClick={() => handleChoice("accepted")}
        >
          {site.cookieAcceptLabel}
        </button>
        <button
          type="button"
          className="btn btn-small btn-small-outline"
          onClick={() => handleChoice("rejected")}
        >
          {site.cookieRejectLabel}
        </button>
      </div>
    </div>
  );
}

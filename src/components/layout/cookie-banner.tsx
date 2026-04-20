"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

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

export default function CookieBanner() {
  const t = useTranslations("cookies");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = getCookie(consentCookie);
    if (!consent) {
      const id = window.setTimeout(() => setVisible(true), 0);
      return () => window.clearTimeout(id);
    }
    return undefined;
  }, []);

  if (!visible) return null;

  const handleChoice = (value: "accepted" | "rejected") => {
    setCookie(consentCookie, value);
    setVisible(false);
    window.dispatchEvent(new Event("lacdia-consent"));
  };

  return (
    <div className="cookie-banner">
      <h2 className="cookie-title">{t("title")}</h2>
      <p className="cookie-text">
        {t("message")}{" "}
        <Link href="/cookies">{t("policyLink")}</Link>
        .
      </p>
      <div className="cookie-actions">
        <button
          type="button"
          className="btn btn-small btn-small-primary"
          onClick={() => handleChoice("accepted")}
        >
          {t("accept")}
        </button>
        <button
          type="button"
          className="btn btn-small btn-small-outline"
          onClick={() => handleChoice("rejected")}
        >
          {t("reject")}
        </button>
      </div>
    </div>
  );
}

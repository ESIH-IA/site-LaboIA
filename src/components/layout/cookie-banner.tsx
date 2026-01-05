"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
    <div className="fixed bottom-4 left-4 right-4 z-50 rounded-2xl border border-border bg-surface p-5 shadow-lg md:left-auto md:right-6 md:max-w-lg">
      <h2 className="text-sm font-semibold text-foreground">Cookies</h2>
      <p className="mt-2 text-sm text-muted">
        Ce site utilise des cookies de mesure d&apos;audience et de fonctionnement. Vous pouvez
        accepter ou refuser ces cookies. Consultez la{" "}
        <Link href="/cookies" className="underline underline-offset-4">
          politique cookies
        </Link>
        .
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm shadow-black/10 transition hover:bg-primary/90"
          onClick={() => handleChoice("accepted")}
        >
          Accepter
        </button>
        <button
          type="button"
          className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground transition hover:bg-surface-muted"
          onClick={() => handleChoice("rejected")}
        >
          Refuser
        </button>
      </div>
    </div>
  );
}

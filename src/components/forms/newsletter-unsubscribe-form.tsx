"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

const labels = {
  fr: {
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "votre@email.com",
    submit: "Se désinscrire",
    loading: "Envoi en cours…",
    success: "Vérifiez votre boîte mail : un lien de confirmation vient de vous être envoyé.",
    error: "La demande n'a pas pu être traitée. Réessayez plus tard.",
  },
  en: {
    emailLabel: "Email address",
    emailPlaceholder: "your@email.com",
    submit: "Unsubscribe",
    loading: "Sending…",
    success: "Check your inbox: a confirmation link has just been sent to you.",
    error: "The request couldn't be processed. Please try again later.",
  },
};

export default function NewsletterUnsubscribeForm({
  copy,
  locale = "fr",
}: {
  copy?: FormCopy | null;
  locale?: Locale;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const tx = labels[locale] ?? labels.fr;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    // Honeypot anti-bot : champ masqué (voir ci-dessous), jamais rempli
    // par un humain. Un bot qui remplit tous les champs le remplira.
    const company = formData.get("company")?.toString();

    if (!email) {
      setStatus("error");
      setMessage(copy?.errorMessage ?? tx.error);
      return;
    }

    trackEvent({ category: "newsletter", action: "unsubscribe_request" });

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale, company }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Request failed");
      }
      setStatus("success");
      setMessage(copy?.successMessage ?? tx.success);
    } catch {
      setStatus("error");
      setMessage(copy?.errorMessage ?? tx.error);
    }
  }

  return (
    <form className="form-section" style={{ marginTop: "1.5rem" }} onSubmit={handleSubmit}>
      <label className="form-label-light">
        {copy?.emailLabel ?? tx.emailLabel}
        <input
          type="email"
          name="email"
          className="form-input-light"
          style={{ marginTop: "0.5rem" }}
          placeholder={copy?.emailPlaceholder ?? tx.emailPlaceholder}
          required
        />
      </label>

      {/* Honeypot anti-spam — invisible et ignoré par les humains, mais
          rempli par la plupart des robots de soumission automatique. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: "absolute", left: "-9999px", top: "auto", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />

      <button
        type="submit"
        className="btn btn-small btn-small-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? (copy?.loadingLabel ?? tx.loading) : (copy?.submitLabel ?? tx.submit)}
      </button>
      {message ? <p className="form-status-text">{message}</p> : null}
    </form>
  );
}

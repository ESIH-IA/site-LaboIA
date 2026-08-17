"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ copy }: { copy?: FormCopy | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");
  const tx = useTranslations("forms.newsletter");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();
    // Honeypot anti-bot : voir le champ caché plus bas dans le JSX.
    const company = formData.get("company")?.toString();

    if (!email) {
      setStatus("error");
      setMessage(copy?.errorMessage ?? tx("error"));
      return;
    }

    trackEvent({ category: "newsletter", action: "submit" });

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Request failed");
      }
      setStatus("success");
      setMessage(copy?.successMessage ?? tx("success"));
    } catch {
      setStatus("error");
      setMessage(copy?.errorMessage ?? tx("error"));
    }
  }

  return (
    <form className="form-section" style={{ marginTop: "1.5rem" }} onSubmit={handleSubmit}>
      <label className="form-label-light">
        {copy?.emailLabel ?? tx("emailLabel")}
        <input
          type="email"
          name="email"
          className="form-input-light"
          style={{ marginTop: "0.5rem" }}
          placeholder={copy?.emailPlaceholder ?? tx("emailPlaceholder")}
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
        style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0, pointerEvents: "none" }}
      />

      <label className="form-checkbox-light-row">
        <input type="checkbox" required style={{ marginTop: "0.25rem" }} />
        <span>
          {copy?.consentText ?? tx("consent")}{" "}
          <Link href={copy?.privacyHref ?? "/confidentialite"} style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>
            {copy?.privacyLabel ?? tx("privacy")}
          </Link>
        </span>
      </label>
      <button
        type="submit"
        className="btn btn-small btn-small-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? (copy?.loadingLabel ?? tx("loading")) : (copy?.submitLabel ?? tx("submit"))}
      </button>
      {message ? <p className="form-status-text">{message}</p> : null}
    </form>
  );
}

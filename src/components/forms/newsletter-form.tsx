"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm({ copy }: { copy?: FormCopy | null }) {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString();

    if (!email) {
      setStatus("error");
      setMessage(copy?.errorMessage ?? "");
      return;
    }

    trackEvent({ category: "newsletter", action: "submit" });

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Request failed");
      }
      setStatus("success");
      setMessage(copy?.successMessage ?? "");
    } catch {
      setStatus("error");
      setMessage(copy?.errorMessage ?? "");
    }
  }

  return (
    <form className="form-section" style={{ marginTop: "1.5rem" }} onSubmit={handleSubmit}>
      <label className="form-label-light">
        {copy?.emailLabel}
        <input
          type="email"
          name="email"
          className="form-input-light"
          style={{ marginTop: "0.5rem" }}
          placeholder={copy?.emailPlaceholder}
          required
        />
      </label>
      <label className="form-checkbox-light-row">
        <input type="checkbox" required style={{ marginTop: "0.25rem" }} />
        <span>
          {copy?.consentText ?? "J'accepte de recevoir les communications du laboratoire. Voir la"}{" "}
          <Link href={copy?.privacyHref ?? "/confidentialite"} style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>
            {copy?.privacyLabel ?? "politique de confidentialité"}
          </Link>
        </span>
      </label>
      <button
        type="submit"
        className="btn btn-small btn-small-primary"
        disabled={status === "loading"}
      >
        {status === "loading" ? (copy?.loadingLabel ?? "En cours...") : (copy?.submitLabel ?? "S'inscrire")}
      </button>
      {message ? <p className="form-status-text">{message}</p> : null}
    </form>
  );
}

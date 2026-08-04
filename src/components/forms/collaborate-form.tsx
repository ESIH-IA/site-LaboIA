"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

type CollabTypeOption = { value: string; label: string };

export default function CollaborateForm({
  copy,
  locale = "fr",
}: {
  copy?: FormCopy | null;
  locale?: Locale;
}) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  const tx = useTranslations("forms.collaborate");
  const collabTypes = tx.raw("collabTypes") as CollabTypeOption[];
  const privacyHref = copy?.privacyHref ?? "/confidentialite";

  return (
    <div className="glass-form">
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="glass-form-title">{copy?.title ?? tx("formTitle")}</h2>
        {copy?.subtitle ? <p className="glass-form-subtitle">{copy.subtitle}</p> : null}
      </div>

      <form
        className="form-section"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setMessage("");
          setMessageType(null);
          const form = event.currentTarget;
          const formData = new FormData(form);
          const payload = {
            formType: "collaborer",
            fullName: formData.get("fullName")?.toString(),
            email: formData.get("email")?.toString(),
            // Noms de champs alignés sur ce que le serveur lit réellement
            // (schéma Sanity formSubmission : "organization", "subject") —
            // les anciennes clés "organisation"/"collabType" n'avaient pas
            // de correspondance côté API et étaient silencieusement
            // ignorées.
            organization: formData.get("organisation")?.toString() || undefined,
            subject: formData.get("collabType")?.toString() || undefined,
            message: formData.get("message")?.toString(),
            consent: true,
            locale,
            // Honeypot anti-bot : voir le champ caché plus bas dans le JSX.
            company: formData.get("company")?.toString() || undefined,
          };

          try {
            const response = await fetch("/api/forms/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("error");
            trackEvent({ category: "form", action: "submit", name: "collaborer" });
            setMessage(copy?.successMessage ?? tx("success"));
            setMessageType("success");
            form.reset();
          } catch {
            setMessage(copy?.errorMessage ?? tx("error"));
            setMessageType("error");
          } finally {
            setLoading(false);
          }
        }}
      >
        {/* Nom + Email */}
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">
              {copy?.fullNameLabel ?? tx("fullName")} <span className="form-label-required">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder={copy?.fullNamePlaceholder ?? tx("fullNamePlaceholder")}
              autoComplete="name"
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">
              {copy?.emailLabel ?? tx("email")} <span className="form-label-required">*</span>
            </span>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder={copy?.emailPlaceholder ?? tx("emailPlaceholder")}
              autoComplete="email"
              required
            />
          </label>
        </div>

        {/* Organisation */}
        <label className="form-group">
          <span className="form-label">{copy?.organizationLabel ?? tx("organisation")}</span>
          <input
            type="text"
            name="organisation"
            className="form-input"
            placeholder={tx("organisationPlaceholder")}
            autoComplete="organization"
          />
        </label>

        {/* Type de collaboration */}
        <label className="form-group">
          <span className="form-label">{tx("collabType")}</span>
          <select name="collabType" className="form-input form-input-select">
            {collabTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Message */}
        <label className="form-group">
          <span className="form-label">
            {copy?.messageLabel ?? tx("message")} <span className="form-label-required">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className="form-input"
            style={{ resize: "vertical", minHeight: "7rem" }}
            placeholder={copy?.messagePlaceholder ?? tx("messagePlaceholder")}
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

        {/* Consentement */}
        <label className="form-checkbox-row">
          <input type="checkbox" required className="form-checkbox" />
          <span>
            {copy?.consentText ?? tx("consent")}{" "}
            <Link href={privacyHref} className="form-checkbox-link">
              {copy?.privacyLabel ?? tx("privacy")}
            </Link>
          </span>
        </label>

        {/* Bouton */}
        <div className="form-submit-area">
          <button type="submit" className="btn btn-gradient" disabled={loading}>
            {loading ? (copy?.loadingLabel ?? tx("loading")) : (copy?.submitLabel ?? tx("submit"))}
          </button>
        </div>

        {message ? (
          <div
            className={`form-message ${
              messageType === "success" ? "form-message--success" : "form-message--error"
            }`}
          >
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

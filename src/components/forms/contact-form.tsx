"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

type SubjectOption = { value: string; label: string };

export default function ContactForm({
  copy,
  locale = "fr",
}: {
  copy?: FormCopy | null;
  locale?: Locale;
}) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const tx = useTranslations("forms.contact");
  const subjects = tx.raw("subjects") as SubjectOption[];
  const privacyHref = copy?.privacyHref ?? "/confidentialite";

  function validate(formData: FormData) {
    const errs: Record<string, string> = {};
    if (!formData.get("fullName")?.toString().trim()) errs.fullName = tx("required");
    if (!formData.get("email")?.toString().trim()) errs.email = tx("required");
    if (!formData.get("message")?.toString().trim()) errs.message = tx("required");
    return errs;
  }

  return (
    <div className="glass-form">
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="glass-form-title">
          {copy?.title ?? tx("formTitle")}
        </h2>
        {copy?.subtitle ? <p className="glass-form-subtitle">{copy.subtitle}</p> : null}
      </div>

      <form
        className="form-section"
        noValidate
        onSubmit={async (event) => {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);

          const errs = validate(formData);
          if (Object.keys(errs).length > 0) {
            setErrors(errs);
            return;
          }
          setErrors({});

          setLoading(true);
          setMessage("");
          setMessageType(null);

          const payload = {
            formType: "contact",
            fullName: formData.get("fullName")?.toString(),
            email: formData.get("email")?.toString(),
            phone: formData.get("phone")?.toString() || undefined,
            // Nom de champ aligné sur le schéma Sanity ("organization",
            // sans "s") — l'ancien payload envoyait "organisation" et la
            // valeur était silencieusement ignorée côté serveur.
            organization: formData.get("organisation")?.toString() || undefined,
            subject: formData.get("subject")?.toString(),
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
            trackEvent({ category: "form", action: "submit", name: "contact" });
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
        {/* Row 1 — Nom + Email */}
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">
              {copy?.fullNameLabel ?? tx("fullName")}{" "}
              <span className="form-label-required">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className={`form-input${errors.fullName ? " form-input--error" : ""}`}
              placeholder={copy?.fullNamePlaceholder ?? tx("fullNamePlaceholder")}
              autoComplete="name"
              onChange={() => errors.fullName && setErrors((e) => ({ ...e, fullName: "" }))}
            />
            {errors.fullName && <span className="form-field-error">{errors.fullName}</span>}
          </label>

          <label className="form-group">
            <span className="form-label">
              {copy?.emailLabel ?? tx("email")}{" "}
              <span className="form-label-required">*</span>
            </span>
            <input
              type="email"
              name="email"
              className={`form-input${errors.email ? " form-input--error" : ""}`}
              placeholder={copy?.emailPlaceholder ?? tx("emailPlaceholder")}
              autoComplete="email"
              onChange={() => errors.email && setErrors((e) => ({ ...e, email: "" }))}
            />
            {errors.email && <span className="form-field-error">{errors.email}</span>}
          </label>
        </div>

        {/* Row 2 — Téléphone + Organisation */}
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">{tx("phone")}</span>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder={tx("phonePlaceholder")}
              autoComplete="tel"
            />
          </label>

          <label className="form-group">
            <span className="form-label">{tx("organisation")}</span>
            <input
              type="text"
              name="organisation"
              className="form-input"
              placeholder={tx("organisationPlaceholder")}
              autoComplete="organization"
            />
          </label>
        </div>

        {/* Objet — select */}
        <label className="form-group">
          <span className="form-label">{copy?.subjectLabel ?? tx("subject")}</span>
          <select name="subject" className="form-input form-input-select">
            {subjects.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Message */}
        <label className="form-group">
          <span className="form-label">
            {copy?.messageLabel ?? tx("message")}{" "}
            <span className="form-label-required">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className={`form-input${errors.message ? " form-input--error" : ""}`}
            style={{ resize: "vertical", minHeight: "7rem" }}
            placeholder={copy?.messagePlaceholder ?? tx("messagePlaceholder")}
            onChange={() => errors.message && setErrors((e) => ({ ...e, message: "" }))}
          />
          {errors.message && <span className="form-field-error">{errors.message}</span>}
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

        {/* Feedback */}
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

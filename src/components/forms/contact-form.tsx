"use client";

import { Link } from "@/i18n/navigation";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";
import type { Locale } from "@/lib/i18n";

const labels = {
  fr: {
    formTitle: "Envoyez-nous un message",
    fullName: "Nom complet",
    fullNamePlaceholder: "Prénom Nom",
    email: "Adresse e-mail",
    emailPlaceholder: "votre@email.com",
    phone: "Téléphone (optionnel)",
    phonePlaceholder: "+509 XXXX XXXX",
    organisation: "Organisation / Institution (optionnel)",
    organisationPlaceholder: "Université, entreprise, ONG…",
    subject: "Objet",
    subjects: [
      { value: "", label: "Sélectionnez un objet…" },
      { value: "collaboration", label: "Collaboration de recherche" },
      { value: "partenariat", label: "Partenariat institutionnel" },
      { value: "stage", label: "Stage ou formation" },
      { value: "medias", label: "Médias et communication" },
      { value: "question", label: "Question générale" },
      { value: "autre", label: "Autre" },
    ],
    message: "Message",
    messagePlaceholder: "Décrivez votre demande…",
    consent: "J'accepte que mes informations soient traitées conformément à la",
    privacy: "politique de confidentialité",
    submit: "Envoyer le message",
    loading: "Envoi en cours…",
    success: "Merci. Votre message a bien été envoyé. Nous vous répondrons dans les meilleurs délais.",
    error: "Une erreur est survenue. Veuillez réessayer ou nous écrire directement.",
    required: "Champ requis",
  },
  en: {
    formTitle: "Send us a message",
    fullName: "Full name",
    fullNamePlaceholder: "First Last",
    email: "Email address",
    emailPlaceholder: "your@email.com",
    phone: "Phone (optional)",
    phonePlaceholder: "+509 XXXX XXXX",
    organisation: "Organisation / Institution (optional)",
    organisationPlaceholder: "University, company, NGO…",
    subject: "Subject",
    subjects: [
      { value: "", label: "Select a subject…" },
      { value: "collaboration", label: "Research Collaboration" },
      { value: "partenariat", label: "Institutional Partnership" },
      { value: "stage", label: "Internship or Training" },
      { value: "medias", label: "Media and Communications" },
      { value: "question", label: "General Inquiry" },
      { value: "autre", label: "Other" },
    ],
    message: "Message",
    messagePlaceholder: "Describe your request…",
    consent: "I agree that my information will be processed in accordance with the",
    privacy: "privacy policy",
    submit: "Send message",
    loading: "Sending…",
    success: "Thank you. Your message has been received. We will get back to you as soon as possible.",
    error: "An error occurred. Please try again or contact us directly.",
    required: "Required field",
  },
};

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

  const tx = labels[locale] ?? labels.fr;
  const privacyHref = copy?.privacyHref ?? (locale === "en" ? "/en/confidentialite" : "/confidentialite");

  function validate(formData: FormData) {
    const errs: Record<string, string> = {};
    if (!formData.get("fullName")?.toString().trim()) errs.fullName = tx.required;
    if (!formData.get("email")?.toString().trim()) errs.email = tx.required;
    if (!formData.get("message")?.toString().trim()) errs.message = tx.required;
    return errs;
  }

  return (
    <div className="glass-form">
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="glass-form-title">
          {copy?.title ?? tx.formTitle}
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
            organisation: formData.get("organisation")?.toString() || undefined,
            subject: formData.get("subject")?.toString(),
            message: formData.get("message")?.toString(),
            consent: true,
            locale,
          };

          try {
            const response = await fetch("/api/forms/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("error");
            trackEvent({ category: "form", action: "submit", name: "contact" });
            setMessage(copy?.successMessage ?? tx.success);
            setMessageType("success");
            form.reset();
          } catch {
            setMessage(copy?.errorMessage ?? tx.error);
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
              {copy?.fullNameLabel ?? tx.fullName}{" "}
              <span className="form-label-required">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className={`form-input${errors.fullName ? " form-input--error" : ""}`}
              placeholder={copy?.fullNamePlaceholder ?? tx.fullNamePlaceholder}
              autoComplete="name"
              onChange={() => errors.fullName && setErrors((e) => ({ ...e, fullName: "" }))}
            />
            {errors.fullName && <span className="form-field-error">{errors.fullName}</span>}
          </label>

          <label className="form-group">
            <span className="form-label">
              {copy?.emailLabel ?? tx.email}{" "}
              <span className="form-label-required">*</span>
            </span>
            <input
              type="email"
              name="email"
              className={`form-input${errors.email ? " form-input--error" : ""}`}
              placeholder={copy?.emailPlaceholder ?? tx.emailPlaceholder}
              autoComplete="email"
              onChange={() => errors.email && setErrors((e) => ({ ...e, email: "" }))}
            />
            {errors.email && <span className="form-field-error">{errors.email}</span>}
          </label>
        </div>

        {/* Row 2 — Téléphone + Organisation */}
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">{tx.phone}</span>
            <input
              type="tel"
              name="phone"
              className="form-input"
              placeholder={tx.phonePlaceholder}
              autoComplete="tel"
            />
          </label>

          <label className="form-group">
            <span className="form-label">{tx.organisation}</span>
            <input
              type="text"
              name="organisation"
              className="form-input"
              placeholder={tx.organisationPlaceholder}
              autoComplete="organization"
            />
          </label>
        </div>

        {/* Objet — select */}
        <label className="form-group">
          <span className="form-label">{copy?.subjectLabel ?? tx.subject}</span>
          <select name="subject" className="form-input form-input-select">
            {tx.subjects.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>

        {/* Message */}
        <label className="form-group">
          <span className="form-label">
            {copy?.messageLabel ?? tx.message}{" "}
            <span className="form-label-required">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className={`form-input${errors.message ? " form-input--error" : ""}`}
            style={{ resize: "vertical", minHeight: "7rem" }}
            placeholder={copy?.messagePlaceholder ?? tx.messagePlaceholder}
            onChange={() => errors.message && setErrors((e) => ({ ...e, message: "" }))}
          />
          {errors.message && <span className="form-field-error">{errors.message}</span>}
        </label>

        {/* Consentement */}
        <label className="form-checkbox-row">
          <input type="checkbox" required className="form-checkbox" />
          <span>
            {copy?.consentText ?? tx.consent}{" "}
            <Link href={privacyHref} className="form-checkbox-link">
              {copy?.privacyLabel ?? tx.privacy}
            </Link>
          </span>
        </label>

        {/* Bouton */}
        <div className="form-submit-area">
          <button type="submit" className="btn btn-gradient" disabled={loading}>
            {loading ? (copy?.loadingLabel ?? tx.loading) : (copy?.submitLabel ?? tx.submit)}
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

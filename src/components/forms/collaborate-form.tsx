"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";
import type { FormCopy } from "@/lib/sanity/types";

export default function CollaborateForm({ copy }: { copy?: FormCopy | null }) {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);
  const privacyHref = copy?.privacyHref ?? "/confidentialite";

  return (
    <div className="glass-form">
      <div style={{ marginBottom: "2rem" }}>
        {copy?.title ? <h2 className="glass-form-title">{copy.title}</h2> : null}
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
            organization: formData.get("organization")?.toString(),
            message: formData.get("message")?.toString(),
            consent: true,
          };

          try {
            const response = await fetch("/api/forms/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!response.ok) {
              throw new Error("Erreur");
            }
            trackEvent({ category: "form", action: "submit", name: "collaborer" });
            setMessage(copy?.successMessage ?? "");
            setMessageType("success");
            form.reset();
          } catch {
            setMessage(copy?.errorMessage ?? "");
            setMessageType("error");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">
              {copy?.fullNameLabel} <span className="form-label-required">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder={copy?.fullNamePlaceholder}
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">
              {copy?.emailLabel} <span className="form-label-required">*</span>
            </span>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder={copy?.emailPlaceholder}
              required
            />
          </label>
        </div>

        <label className="form-group">
          <span className="form-label">
            {copy?.organizationLabel}
          </span>
          <input
            type="text"
            name="organization"
            className="form-input"
            placeholder={copy?.organizationPlaceholder}
          />
        </label>

        <label className="form-group">
          <span className="form-label">
            {copy?.messageLabel} <span className="form-label-required">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className="form-input"
            style={{ resize: "none" }}
            placeholder={copy?.messagePlaceholder}
            required
          />
        </label>

        <label className="form-checkbox-row">
          <input
            type="checkbox"
            required
            className="form-checkbox"
          />
          <span>
            {copy?.consentText}{" "}
            <Link href={privacyHref} className="form-checkbox-link">
              {copy?.privacyLabel}
            </Link>
          </span>
        </label>

        <div className="form-submit-area">
          <button
            type="submit"
            className="btn btn-gradient"
            disabled={loading}
          >
            {loading ? copy?.loadingLabel : copy?.submitLabel}
          </button>
        </div>

        {message ? (
          <div
            className={`form-message ${
              messageType === "success"
                ? "form-message--success"
                : "form-message--error"
            }`}
          >
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

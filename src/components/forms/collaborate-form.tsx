"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export default function CollaborateForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  return (
    <div className="glass-form">
      <div style={{ marginBottom: "2rem" }}>
        <h2 className="glass-form-title">
          Formulaire de collaboration
        </h2>
        <p className="glass-form-subtitle">
          Remplissez ce formulaire et notre équipe vous recontactera rapidement.
        </p>
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
            setMessage("Merci. Votre demande a été enregistrée. Nous vous recontacterons très bientôt.");
            setMessageType("success");
            form.reset();
          } catch {
            setMessage("Impossible d'envoyer la demande. Veuillez réessayer.");
            setMessageType("error");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="form-grid form-grid-2">
          <label className="form-group">
            <span className="form-label">
              Nom complet <span className="form-label-required">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className="form-input"
              placeholder="Votre nom complet"
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">
              Email <span className="form-label-required">*</span>
            </span>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="votre.email@example.com"
              required
            />
          </label>
        </div>

        <label className="form-group">
          <span className="form-label">
            Organisation
          </span>
          <input
            type="text"
            name="organization"
            className="form-input"
            placeholder="Nom de votre organisation"
          />
        </label>

        <label className="form-group">
          <span className="form-label">
            Message <span className="form-label-required">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className="form-input"
            style={{ resize: "none" }}
            placeholder="Décrivez votre projet de collaboration..."
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
            J&apos;accepte que mes informations soient traitées conformément à la{" "}
            <Link href="/confidentialite" className="form-checkbox-link">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>

        <div className="form-submit-area">
          <button
            type="submit"
            className="btn btn-gradient"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
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

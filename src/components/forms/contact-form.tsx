"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export default function ContactForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    borderRadius: "0.75rem",
    padding: "0.65rem 1rem",
    fontSize: "0.9rem",
    outline: "none",
    background: "rgba(255,255,255,0.04)",
    border: "1px solid var(--labo-border)",
    color: "var(--labo-text)",
    transition: "border-color 0.2s",
  };

  return (
    <div
      className="mt-10 max-w-2xl mx-auto rounded-2xl p-8"
      style={{
        background: "var(--labo-surface)",
        border: "1px solid var(--labo-border)",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "var(--labo-text)", fontFamily: "var(--font-syne, sans-serif)" }}
      >
        Formulaire de contact
      </h2>
      <form
        className="space-y-5"
        onSubmit={async (event) => {
          event.preventDefault();
          setLoading(true);
          setMessage("");
          const form = event.currentTarget;
          const formData = new FormData(form);
          const payload = {
            formType: "contact",
            fullName: formData.get("fullName")?.toString(),
            email: formData.get("email")?.toString(),
            subject: formData.get("subject")?.toString(),
            message: formData.get("message")?.toString(),
            consent: true,
          };

          try {
            const response = await fetch("/api/forms/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            });
            if (!response.ok) throw new Error("Erreur");
            trackEvent({ category: "form", action: "submit", name: "contact" });
            setMessage("Merci. Votre message a ete enregistre.");
            form.reset();
          } catch {
            setMessage("Impossible d'envoyer la demande.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--labo-text-muted)" }}>
            Nom complet
          </span>
          <input type="text" name="fullName" style={inputStyle} required />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--labo-text-muted)" }}>
            Email
          </span>
          <input type="email" name="email" style={inputStyle} required />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--labo-text-muted)" }}>
            Objet
          </span>
          <input type="text" name="subject" style={inputStyle} />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--labo-text-muted)" }}>
            Message
          </span>
          <textarea name="message" rows={5} style={{ ...inputStyle, resize: "vertical" }} required />
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" required className="mt-1 shrink-0" />
          <span className="text-sm" style={{ color: "var(--labo-text-muted)" }}>
            J&apos;accepte que mes informations soient traitees conformement a la{" "}
            <Link
              href="/confidentialite"
              className="underline underline-offset-4"
              style={{ color: "var(--labo-accent-teal)" }}
            >
              politique de confidentialite
            </Link>
            .
          </span>
        </label>
        <button
          type="submit"
          className="btn-primary-labo"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Envoi en cours..." : "Envoyer le message"}
        </button>
        {message ? (
          <p className="text-sm" style={{ color: "var(--labo-accent-teal)" }}>
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export default function CollaborateForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const inputStyle = {
    width: "100%",
    borderRadius: "0.75rem",
    padding: "0.65rem 1rem",
    fontSize: "0.9rem",
    outline: "none",
    background: "rgba(10,15,28,0.04)",
    border: "1px solid rgba(10,15,28,0.12)",
    color: "var(--tech-text)",
    transition: "border-color 0.2s",
  };

  return (
    <div
      className="mt-10 max-w-3xl rounded-2xl p-8"
      style={{
        background: "rgba(10,15,28,0.04)",
        border: "1px solid rgba(10,15,28,0.1)",
      }}
    >
      <h2
        className="text-xl font-bold mb-6"
        style={{ color: "var(--tech-text)", fontFamily: "var(--font-syne, sans-serif)" }}
      >
        Demande de collaboration
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
            if (!response.ok) throw new Error("Erreur");
            trackEvent({ category: "form", action: "submit", name: "collaborer" });
            setMessage("Merci. Votre demande a ete enregistree.");
            form.reset();
          } catch {
            setMessage("Impossible d'envoyer la demande.");
          } finally {
            setLoading(false);
          }
        }}
      >
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--tech-text-muted)" }}>
            Nom complet
          </span>
          <input type="text" name="fullName" style={inputStyle} required />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--tech-text-muted)" }}>
            Email
          </span>
          <input type="email" name="email" style={inputStyle} required />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--tech-text-muted)" }}>
            Organisation
          </span>
          <input type="text" name="organization" style={inputStyle} />
        </label>
        <label className="block">
          <span className="label-eyebrow mb-2 block" style={{ color: "var(--tech-text-muted)" }}>
            Message
          </span>
          <textarea name="message" rows={5} style={{ ...inputStyle, resize: "vertical" }} required />
        </label>
        <label className="flex items-start gap-3">
          <input type="checkbox" required className="mt-1 shrink-0" />
          <span className="text-sm" style={{ color: "var(--tech-text-muted)" }}>
            J&apos;accepte que mes informations soient traitees conformement a la{" "}
            <Link
              href="/confidentialite"
              className="underline underline-offset-4"
              style={{ color: "var(--tech-accent-teal)" }}
            >
              politique de confidentialite
            </Link>
            .
          </span>
        </label>
        <button
          type="submit"
          className="btn-primary-tech"
          disabled={loading}
          style={{ opacity: loading ? 0.6 : 1 }}
        >
          {loading ? "Envoi en cours..." : "Envoyer la demande"}
        </button>
        {message ? (
          <p className="text-sm" style={{ color: "var(--tech-accent-teal)" }}>
            {message}
          </p>
        ) : null}
      </form>
    </div>
  );
}
"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterForm() {
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
      setMessage("Email requis.");
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
        throw new Error(payload?.message || "Erreur.");
      }
      setStatus("success");
      setMessage("Inscription prise en compte.");
    } catch {
      setStatus("error");
      setMessage("Impossible d'enregistrer l'inscription.");
    }
  }

  return (
    <form className="form-section" style={{ marginTop: "1.5rem" }} onSubmit={handleSubmit}>
      <label className="form-label-light">
        Email
        <input
          type="email"
          name="email"
          className="form-input-light"
          style={{ marginTop: "0.5rem" }}
          required
        />
      </label>
      <label className="form-checkbox-light-row">
        <input type="checkbox" required style={{ marginTop: "0.25rem" }} />
        <span>
          J&apos;accepte de recevoir les communications du laboratoire. Voir la{" "}
          <Link href="/confidentialite" style={{ textDecoration: "underline", textUnderlineOffset: "4px" }}>
            politique de confidentialité
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        className="btn btn-small btn-small-primary"
        disabled={status === "loading"}
      >
        S{"'"}inscrire
      </button>
      {message ? <p className="form-status-text">{message}</p> : null}
    </form>
  );
}

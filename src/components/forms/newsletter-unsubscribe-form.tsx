"use client";

import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

type Status = "idle" | "loading" | "success" | "error";

export default function NewsletterUnsubscribeForm() {
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

    trackEvent({ category: "newsletter", action: "unsubscribe" });

    try {
      const response = await fetch("/api/newsletter/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload?.message || "Erreur.");
      }
      setStatus("success");
      setMessage("Votre demande a été prise en compte.");
    } catch {
      setStatus("error");
      setMessage("Impossible de traiter la demande.");
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
      <button
        type="submit"
        className="btn btn-small btn-small-primary"
        disabled={status === "loading"}
      >
        Se desinscrire
      </button>
      {message ? <p className="form-status-text">{message}</p> : null}
    </form>
  );
}

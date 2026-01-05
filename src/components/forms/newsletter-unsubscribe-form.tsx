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
      setMessage("Votre demande a ete prise en compte.");
    } catch {
      setStatus("error");
      setMessage("Impossible de traiter la demande.");
    }
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
      <label className="block text-sm text-neutral-700">
        Email
        <input
          type="email"
          name="email"
          className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
          required
        />
      </label>
      <button
        type="submit"
        className="rounded-full border border-border bg-surface px-5 py-2 text-sm font-medium text-foreground transition hover:bg-surface-muted disabled:opacity-60"
        disabled={status === "loading"}
      >
        Se desinscrire
      </button>
      {message ? <p className="text-sm text-neutral-600">{message}</p> : null}
    </form>
  );
}

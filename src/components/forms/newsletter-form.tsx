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
      <label className="flex items-start gap-3 text-sm text-neutral-600">
        <input type="checkbox" required className="mt-1" />
        <span>
          J&apos;accepte de recevoir les communications du laboratoire. Voir la{" "}
          <Link href="/confidentialite" className="underline underline-offset-4">
            politique de confidentialite
          </Link>
          .
        </span>
      </label>
      <button
        type="submit"
        className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm shadow-black/10 transition hover:bg-primary/90 disabled:opacity-60"
        disabled={status === "loading"}
      >
        S{"'"}inscrire
      </button>
      {message ? <p className="text-sm text-neutral-600">{message}</p> : null}
    </form>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export default function CollaborateForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);

  return (
    <div className="mt-10 max-w-3xl rounded-2xl border border-border bg-surface p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">Demande de collaboration</h2>
      <form
        className="mt-4 space-y-4"
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
            if (!response.ok) {
              throw new Error("Erreur");
            }
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
        <label className="block text-sm text-neutral-700">
          Nom complet
          <input
            type="text"
            name="fullName"
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            required
          />
        </label>
        <label className="block text-sm text-neutral-700">
          Email
          <input
            type="email"
            name="email"
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            required
          />
        </label>
        <label className="block text-sm text-neutral-700">
          Organisation
          <input
            type="text"
            name="organization"
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
          />
        </label>
        <label className="block text-sm text-neutral-700">
          Message
          <textarea
            name="message"
            rows={5}
            className="mt-2 w-full rounded-lg border border-border bg-surface px-3 py-2 text-foreground outline-none focus-visible:border-primary/40 focus-visible:ring-2 focus-visible:ring-primary/20"
            required
          />
        </label>
        <label className="flex items-start gap-3 text-sm text-neutral-600">
          <input type="checkbox" required className="mt-1" />
          <span>
            J&apos;accepte que mes informations soient traitees conformement a la{" "}
            <Link href="/confidentialite" className="underline underline-offset-4">
              politique de confidentialite
            </Link>
            .
          </span>
        </label>
        <button
          type="submit"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white shadow-sm shadow-black/10 transition hover:bg-primary/90 disabled:opacity-60"
          disabled={loading}
        >
          Envoyer
        </button>
        {message ? <p className="text-sm text-neutral-600">{message}</p> : null}
      </form>
    </div>
  );
}

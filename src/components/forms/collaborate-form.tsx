"use client";

import Link from "next/link";
import { useState } from "react";

import { trackEvent } from "@/lib/analytics";

export default function CollaborateForm() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error" | null>(null);

  return (
    <div className="glass-card rounded-2xl backdrop-blur-lg border border-white/20 p-8 md:p-10">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 to-teal-400 bg-clip-text text-transparent mb-2">
          Formulaire de collaboration
        </h2>
        <p className="text-slate-300 text-sm md:text-base">
          Remplissez ce formulaire et notre équipe vous recontactera rapidement.
        </p>
      </div>

      <form
        className="space-y-6"
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
        <div className="grid gap-6 md:grid-cols-2">
          <label className="block">
            <span className="block text-sm font-semibold text-slate-200 mb-3">
              Nom complet <span className="text-cyan-400">*</span>
            </span>
            <input
              type="text"
              name="fullName"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition-all focus-visible:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/20 hover:border-white/20"
              placeholder="Votre nom complet"
              required
            />
          </label>

          <label className="block">
            <span className="block text-sm font-semibold text-slate-200 mb-3">
              Email <span className="text-cyan-400">*</span>
            </span>
            <input
              type="email"
              name="email"
              className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition-all focus-visible:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/20 hover:border-white/20"
              placeholder="votre.email@example.com"
              required
            />
          </label>
        </div>

        <label className="block">
          <span className="block text-sm font-semibold text-slate-200 mb-3">
            Organisation
          </span>
          <input
            type="text"
            name="organization"
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition-all focus-visible:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/20 hover:border-white/20"
            placeholder="Nom de votre organisation"
          />
        </label>

        <label className="block">
          <span className="block text-sm font-semibold text-slate-200 mb-3">
            Message <span className="text-cyan-400">*</span>
          </span>
          <textarea
            name="message"
            rows={6}
            className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-white placeholder-slate-400 outline-none transition-all focus-visible:border-cyan-400/50 focus-visible:ring-2 focus-visible:ring-cyan-400/20 hover:border-white/20 resize-none"
            placeholder="Décrivez votre projet de collaboration..."
            required
          />
        </label>

        <label className="flex items-start gap-3 text-sm text-slate-300">
          <input
            type="checkbox"
            required
            className="mt-1 w-4 h-4 rounded accent-cyan-400 cursor-pointer"
          />
          <span>
            J&apos;accepte que mes informations soient traitées conformément à la{" "}
            <Link href="/confidentialite" className="text-cyan-400 hover:text-cyan-300 underline underline-offset-2 transition-colors">
              politique de confidentialité
            </Link>
            .
          </span>
        </label>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Envoi en cours..." : "Envoyer ma demande"}
          </button>
        </div>

        {message ? (
          <div
            className={`mt-6 p-4 rounded-xl text-sm ${
              messageType === "success"
                ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200"
                : "bg-red-500/10 border border-red-500/30 text-red-200"
            }`}
          >
            {message}
          </div>
        ) : null}
      </form>
    </div>
  );
}

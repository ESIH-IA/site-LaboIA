import { NextResponse } from "next/server";

import { createUnsubscribeToken, isUnsubscribeTokenConfigured } from "@/lib/unsubscribe-token";
import { getSiteUrl } from "@/lib/site-url";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const copyByLocale = {
  fr: {
    subject: "Confirmez votre désinscription — LaCDIA",
    cta: "Confirmer la désinscription",
    intro:
      "Une demande de désinscription de la newsletter LaCDIA a été effectuée avec cette adresse email. Cliquez sur le bouton ci-dessous pour la confirmer — ce lien expire dans 1 heure.",
    ignore: "Si vous n'êtes pas à l'origine de cette demande, vous pouvez ignorer cet email : rien ne sera modifié.",
  },
  en: {
    subject: "Confirm your newsletter unsubscription — LaCDIA",
    cta: "Confirm unsubscription",
    intro:
      "A request to unsubscribe from the LaCDIA newsletter was made with this email address. Click the button below to confirm — this link expires in 1 hour.",
    ignore: "If you didn't request this, you can safely ignore this email: nothing will change.",
  },
};

export async function POST(request: Request) {
  // Limitation de débit best-effort (voir src/lib/rate-limit.ts) — 5
  // demandes / 10 min / IP (audit pré-production, SEC-2).
  const ip = getClientIp(request);
  if (isRateLimited(`newsletter-unsubscribe:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toString().trim().toLowerCase();
  // Honeypot anti-bot : champ caché que seuls les robots remplissent.
  // On répond "ok" sans rien faire pour ne pas leur signaler le piège.
  const honeypot = body?.company?.toString().trim();
  const locale = body?.locale === "en" ? "en" : "fr";

  if (honeypot) {
    return NextResponse.json({ ok: true, message: "Email de confirmation envoyé." });
  }

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail || !isUnsubscribeTokenConfigured()) {
    console.info("[newsletter] desinscription sans provider/secret configure", { email });
    return NextResponse.json(
      { ok: false, message: "Service newsletter non configuré. Veuillez réessayer plus tard." },
      { status: 503 },
    );
  }

  // On n'exécute plus la désinscription immédiatement : on envoie un lien
  // de confirmation à jeton signé. Sans cela, n'importe qui pouvait
  // désabonner n'importe quelle adresse en connaissant simplement cet
  // endpoint (voir audit pré-production, constat SEC-1).
  const token = createUnsubscribeToken(email);
  const confirmUrl = new URL("/api/newsletter/unsubscribe/confirm", getSiteUrl());
  confirmUrl.searchParams.set("email", email);
  confirmUrl.searchParams.set("token", token);
  confirmUrl.searchParams.set("locale", locale);

  const copy = copyByLocale[locale as "fr" | "en"];

  const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": apiKey,
    },
    body: JSON.stringify({
      sender: { email: senderEmail, name: "LaCDIA" },
      to: [{ email }],
      subject: copy.subject,
      htmlContent: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
          <p style="color:#333;line-height:1.6;">${copy.intro}</p>
          <p style="margin:24px 0;">
            <a href="${confirmUrl.toString()}" style="background:#0a0f1c;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">${copy.cta}</a>
          </p>
          <p style="color:#999;font-size:12px;">${copy.ignore}</p>
        </div>`,
    }),
  });

  if (!brevoRes.ok) {
    const errText = await brevoRes.text();
    console.error("[brevo] echec envoi email de confirmation de desinscription:", brevoRes.status, errText);
    return NextResponse.json(
      { ok: false, message: "Erreur lors de l'envoi de l'email de confirmation." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Email de confirmation envoyé." });
}

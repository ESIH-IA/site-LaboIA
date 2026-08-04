import { NextResponse } from "next/server";

import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { escapeHtml } from "@/lib/utils";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Limitation de débit best-effort (voir src/lib/rate-limit.ts) — 5
  // soumissions / 10 min / IP (audit pré-production, SEC-2).
  const ip = getClientIp(request);
  if (isRateLimited(`forms-submit:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const formType = body?.formType?.toString();
  const fullName = body?.fullName?.toString().trim();
  const email = body?.email?.toString().trim();
  const organization = body?.organization?.toString().trim();
  const subject = body?.subject?.toString().trim();
  // Le schéma Sanity formSubmission n'a pas de champ dédié pour le
  // téléphone : plutôt que de le perdre silencieusement (comme c'était le
  // cas auparavant — la valeur n'était ni stockée ni transmise), on le
  // rattache au message et on l'affiche dans l'email de notification.
  const phone = body?.phone?.toString().trim();
  const rawMessage = body?.message?.toString().trim();
  const message = phone ? [`Téléphone : ${phone}`, rawMessage].filter(Boolean).join("\n\n") : rawMessage;
  const consent = Boolean(body?.consent);
  // Honeypot anti-bot : champ caché, jamais rempli par un humain. On
  // répond "ok" sans rien enregistrer pour ne pas signaler le piège.
  const honeypot = body?.company?.toString().trim();

  if (honeypot) {
    return NextResponse.json({ ok: true, message: "Demande enregistree." });
  }

  if (!formType || !fullName || !email || !consent) {
    return NextResponse.json({ ok: false, message: "Champs requis manquants." }, { status: 400 });
  }

  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide." }, { status: 400 });
  }

  if (!isSanityWriteConfigured || !sanityWriteClient) {
    return NextResponse.json(
      { ok: false, message: "Stockage non configure." },
      { status: 503 },
    );
  }

  const createdAt = new Date().toISOString();

  await sanityWriteClient.create({
    _type: "formSubmission",
    status: "new",
    statusHistory: [
      {
        status: "new",
        note: "Soumission via le site.",
        changedAt: createdAt,
      },
    ],
    formType,
    fullName,
    email,
    organization,
    subject,
    message,
    consent,
    createdAt,
    updatedAt: createdAt,
  });

  const notifyEmail = process.env.BREVO_NOTIFY_EMAIL;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;
  const apiKey = process.env.BREVO_API_KEY;

  if (notifyEmail && senderEmail && apiKey) {
    const typeLabel = formType === "collaborer" ? "Collaboration" : "Contact";
    // Contenu utilisateur échappé avant interpolation HTML (SEC-5) :
    // sans cela, un champ contenant des balises pouvait s'injecter dans
    // l'email de notification reçu par l'équipe.
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeOrganization = organization ? escapeHtml(organization) : "";
    const safeSubject = subject ? escapeHtml(subject) : "";
    // Le corps de l'email affiche le téléphone dans sa propre ligne
    // (ci-dessous) : on utilise donc le message brut ici pour éviter de
    // le répéter, même si `message` (avec le préfixe téléphone) est bien
    // ce qui est enregistré dans Sanity.
    const safeMessage = rawMessage ? escapeHtml(rawMessage) : "";
    const safePhone = phone ? escapeHtml(phone) : "";

    const brevoRes = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: "LaCDIA" },
        to: [{ email: notifyEmail }],
        subject: `[LaCDIA] Nouvelle demande — ${typeLabel}`,
        htmlContent: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
            <h2 style="color:#0a0f1c;margin-bottom:16px;">Nouvelle demande de ${typeLabel.toLowerCase()}</h2>
            <table style="width:100%;border-collapse:collapse;">
              <tr><td style="padding:8px 0;color:#555;width:140px;">Nom</td><td style="padding:8px 0;font-weight:600;">${safeFullName}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
              ${safePhone ? `<tr><td style="padding:8px 0;color:#555;">Téléphone</td><td style="padding:8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ""}
              <tr><td style="padding:8px 0;color:#555;">Organisation</td><td style="padding:8px 0;">${safeOrganization || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Objet</td><td style="padding:8px 0;">${safeSubject || "—"}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5;">
              <p style="color:#555;margin:0;white-space:pre-wrap;">${safeMessage}</p>
            </div>
            <p style="margin-top:16px;font-size:12px;color:#999;">Message reçu via le formulaire du site LaCDIA.</p>
          </div>`,
      }),
    });

    if (!brevoRes.ok) {
      const errText = await brevoRes.text();
      console.error("[brevo] échec envoi email:", brevoRes.status, errText);
    }
  }

  return NextResponse.json({ ok: true, message: "Demande enregistree." });
}

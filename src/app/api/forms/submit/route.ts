import { NextResponse } from "next/server";

import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const formType = body?.formType?.toString();
  const fullName = body?.fullName?.toString().trim();
  const email = body?.email?.toString().trim();
  const organization = body?.organization?.toString().trim();
  const subject = body?.subject?.toString().trim();
  const message = body?.message?.toString().trim();
  const consent = Boolean(body?.consent);

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
              <tr><td style="padding:8px 0;color:#555;width:140px;">Nom</td><td style="padding:8px 0;font-weight:600;">${fullName}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Email</td><td style="padding:8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
              <tr><td style="padding:8px 0;color:#555;">Organisation</td><td style="padding:8px 0;">${organization || "—"}</td></tr>
              <tr><td style="padding:8px 0;color:#555;">Objet</td><td style="padding:8px 0;">${subject || "—"}</td></tr>
            </table>
            <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5;">
              <p style="color:#555;margin:0;white-space:pre-wrap;">${message || ""}</p>
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

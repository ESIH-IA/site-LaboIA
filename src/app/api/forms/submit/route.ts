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
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        sender: { email: senderEmail, name: "LaCDIA Website" },
        to: [{ email: notifyEmail }],
        subject: `[LaCDIA] Nouvelle demande (${formType})`,
        htmlContent: `<p>Nouvelle demande via le site.</p>
          <ul>
            <li>Nom: ${fullName}</li>
            <li>Email: ${email}</li>
            <li>Organisation: ${organization || "-"}</li>
            <li>Objet: ${subject || "-"}</li>
          </ul>
          <p>${message || ""}</p>`,
      }),
    });
  }

  return NextResponse.json({ ok: true, message: "Demande enregistree." });
}

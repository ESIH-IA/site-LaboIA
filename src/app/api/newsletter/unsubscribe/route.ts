import { NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.toString().trim();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;

  if (apiKey) {
    const response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
      method: "DELETE",
      headers: {
        "api-key": apiKey,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "Erreur lors de la desinscription." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "Desinscription enregistree." });
  }

  console.info("[newsletter] desinscription sans provider configure", { email });
  return NextResponse.json({ ok: true, message: "Desinscription enregistree." });
}

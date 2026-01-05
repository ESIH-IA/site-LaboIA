import { NextResponse } from "next/server";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = body?.email?.toString().trim();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const listId = process.env.BREVO_LIST_ID;

  if (apiKey && listId) {
    const response = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        email,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    if (!response.ok) {
      return NextResponse.json(
        { ok: false, message: "Erreur lors de l'inscription." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, message: "Inscription enregistree." });
  }

  console.info("[newsletter] inscription sans provider configure", { email });
  return NextResponse.json({ ok: true, message: "Inscription enregistree." });
}

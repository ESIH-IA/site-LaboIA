import { NextResponse } from "next/server";

import { getNewsletterSettings } from "@/lib/content-loader";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  const settings = getNewsletterSettings();
  if (!settings.enabled) {
    return NextResponse.json({ ok: false, message: "Newsletter désactivée" }, { status: 503 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toString().trim();

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  console.info("[newsletter] nouvelle inscription", { email });

  return NextResponse.json({ ok: true, message: "Inscription enregistrée (placeholder)." });
}

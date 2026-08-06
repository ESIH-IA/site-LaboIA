import { NextResponse } from "next/server";

import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { isSanityWriteConfigured, upsertSubscriber } from "@/lib/newsletter-subscribers";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // Limitation de débit best-effort (voir src/lib/rate-limit.ts) — 5
  // inscriptions / 10 min / IP (audit pré-production, SEC-2).
  const ip = getClientIp(request);
  if (isRateLimited(`newsletter-subscribe:${ip}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json({ ok: false, message: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const email = body?.email?.toString().trim();
  // Honeypot anti-bot : champ caché, jamais rempli par un humain.
  const honeypot = body?.company?.toString().trim();

  if (honeypot) {
    return NextResponse.json({ ok: true, message: "Inscription enregistree." });
  }

  if (!email || !emailRegex.test(email)) {
    return NextResponse.json({ ok: false, message: "Email invalide" }, { status: 400 });
  }

  if (!isSanityWriteConfigured) {
    console.info("[newsletter] inscription sans provider configure", { email });
    return NextResponse.json(
      { ok: false, message: "Service newsletter non configuré. Veuillez réessayer plus tard." },
      { status: 503 },
    );
  }

  await upsertSubscriber(email);

  return NextResponse.json({ ok: true, message: "Inscription enregistree." });
}

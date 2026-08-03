import { timingSafeEqual } from "crypto";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

const PREVIEW_SECRET = process.env.SANITY_PREVIEW_SECRET;

// Comparaison à temps constant — une comparaison "===" classique sort au
// premier caractère différent, ce qui permet en théorie de reconstituer le
// secret de prévisualisation caractère par caractère via une attaque
// temporelle (voir audit pré-production, constat SEC-4).
function timingSafeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    // Comparaison factice de même "forme" pour ne pas court-circuiter
    // immédiatement sur une différence de longueur.
    timingSafeEqual(bufA, bufA);
    return false;
  }
  return timingSafeEqual(bufA, bufB);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const disable = searchParams.get("disable");

  const dm = await draftMode();

  if (disable === "true") {
    dm.disable();
    return NextResponse.json({ preview: false });
  }

  if (!PREVIEW_SECRET || !secret || !timingSafeEqualStrings(secret, PREVIEW_SECRET)) {
    return NextResponse.json({ message: "Secret invalide" }, { status: 401 });
  }

  dm.enable();
  return NextResponse.json({ preview: true });
}

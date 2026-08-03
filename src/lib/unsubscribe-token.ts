import { createHmac, timingSafeEqual } from "crypto";

// Jeton de confirmation de désinscription newsletter — signé, à usage
// limité dans le temps. Evite qu'un tiers puisse désabonner n'importe
// quelle adresse simplement en connaissant l'endpoint de l'API
// (voir audit pré-production, constat SEC-1 / COMP-1).

const DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 heure

export function isUnsubscribeTokenConfigured(): boolean {
  return Boolean(process.env.UNSUBSCRIBE_TOKEN_SECRET);
}

function sign(payload: string): string {
  const secret = process.env.UNSUBSCRIBE_TOKEN_SECRET;
  if (!secret) {
    throw new Error("UNSUBSCRIBE_TOKEN_SECRET manquant : impossible de signer un jeton de désinscription.");
  }
  return createHmac("sha256", secret).update(payload).digest("hex");
}

export function createUnsubscribeToken(email: string, ttlMs: number = DEFAULT_TTL_MS): string {
  const expires = Date.now() + ttlMs;
  const payload = `${email.toLowerCase()}:${expires}`;
  const signature = sign(payload);
  return Buffer.from(`${expires}:${signature}`).toString("base64url");
}

export function verifyUnsubscribeToken(email: string, token: string): boolean {
  try {
    const decoded = Buffer.from(token, "base64url").toString("utf8");
    const [expiresRaw, signature] = decoded.split(":");
    const expires = Number(expiresRaw);
    if (!expires || !signature || Number.isNaN(expires)) return false;
    if (Date.now() > expires) return false;

    const expectedSignature = sign(`${email.toLowerCase()}:${expires}`);

    const provided = Buffer.from(signature, "hex");
    const expected = Buffer.from(expectedSignature, "hex");
    if (provided.length !== expected.length) return false;

    // Comparaison à temps constant — évite qu'une attaque temporelle
    // permette de deviner la signature caractère par caractère.
    return timingSafeEqual(provided, expected);
  } catch {
    return false;
  }
}

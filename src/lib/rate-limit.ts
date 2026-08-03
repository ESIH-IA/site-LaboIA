// Limiteur de débit "best effort" en mémoire — protège les endpoints
// publics contre le spam basique (SEC-2 de l'audit pré-production).
//
// Limite connue : sur une plateforme serverless (Vercel), chaque instance
// a sa propre mémoire et le compteur est réinitialisé à chaque cold start
// ou redéploiement — ce n'est donc PAS une garantie absolue contre un
// attaquant déterminé. Pour une protection robuste et partagée entre
// instances, migrer vers un store externe (ex. Upstash Redis / Vercel KV).
// Ce module reste une amélioration nette par rapport à l'absence totale
// de limitation.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();

// Purge best-effort pour éviter une fuite mémoire si le process vit
// longtemps (utile surtout hors environnement serverless classique).
const MAX_BUCKETS = 5000;

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

/**
 * Retourne true si la clé donnée a dépassé `limit` appels sur la fenêtre
 * `windowMs`. Incrémente le compteur à chaque appel.
 */
export function isRateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();

  if (buckets.size > MAX_BUCKETS) {
    for (const [k, b] of buckets) {
      if (b.resetAt < now) buckets.delete(k);
    }
  }

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return false;
  }

  bucket.count += 1;
  return bucket.count > limit;
}

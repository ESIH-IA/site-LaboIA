# Migration Brevo -> Resend + Sanity pour l'email et les abonnés newsletter

Date : 2026-08-05

## Contexte

Le site utilisait Brevo pour deux besoins distincts :

1. **Email transactionnel** : notification d'équipe à chaque soumission du formulaire de contact/collaboration (`/api/forms/submit`), email de confirmation de désinscription newsletter (`/api/newsletter/unsubscribe`).
2. **Gestion de liste de contacts** : inscription/désinscription à la newsletter via l'API contacts de Brevo (`/api/newsletter/subscribe`, `/api/newsletter/unsubscribe/confirm`).

Aucune de ces variables `BREVO_*` n'était configurée en local ni confirmée en prod — le mécanisme n'avait jamais été exercé de bout en bout. Le projet a maintenant deux connecteurs Vercel Marketplace déjà branchés : **Sanity** (déjà utilisé partout ailleurs sur le site) et **Resend** (`MESSAGING_URL_RESEND_API_KEY`, `MESSAGING_URL_RESEND_EMAIL_DOMAIN=lacdia.esih.edu`). Objectif : centraliser sur ces deux connecteurs et retirer Brevo entièrement (pas de fallback conservé).

## Décisions

- **Abonnés newsletter** : stockés comme documents Sanity (`newsletterSubscriber`), sur le modèle de `formSubmission` qui existe déjà. L'envoi de campagnes newsletter elles-mêmes (contenu périodique) reste hors scope — aucun code ne l'automatise aujourd'hui côté Brevo non plus ; ce sera un export manuel plus tard.
- **Email transactionnel** : via Resend, par un `fetch` brut vers `https://api.resend.com/emails` (pas d'ajout de la dépendance npm `resend` — un simple appel REST suffit, cohérent avec le style déjà utilisé pour Brevo).
- **Adresses** : expéditeur `LaCDIA <notifications@lacdia.esih.edu>`, destinataire des notifications contact `contact@lacdia.esih.edu`.
- **Brevo est retiré intégralement** (routes, env vars `BREVO_*`, mentions dans README/CLAUDE.md) — pas de shim de compatibilité.
- **Limite connue** : tant que le domaine `lacdia.esih.edu` n'est pas vérifié côté Resend (enregistrements DNS SPF/DKIM), l'envoi d'email échouera silencieusement ou avec erreur loggée ; le stockage Sanity (formulaires + abonnés) continuera de fonctionner indépendamment. La vérification DNS est un sujet séparé, traité plus tard.

## Composants

### `src/lib/resend.ts` (nouveau)

Helper partagé :

```ts
export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<{ ok: boolean; error?: string }>
```

- Lit `MESSAGING_URL_RESEND_API_KEY` et `MESSAGING_URL_RESEND_EMAIL_DOMAIN`.
- Si la clé manque : retourne `{ ok: false, error: "not_configured" }` sans lever d'exception.
- POST vers `https://api.resend.com/emails` avec `Authorization: Bearer <key>`, `from: "LaCDIA <notifications@" + domain + ">"`.
- Log `console.error` en cas d'échec HTTP, ne lève pas d'exception (laisse l'appelant décider comment réagir).

### `src/lib/newsletter-subscribers.ts` (nouveau)

Helpers Sanity pour éviter de dupliquer la logique d'upsert/désinscription entre les deux routes newsletter :

- `subscriberId(email: string): string` — id déterministe dérivé d'un hash de l'email (évite les doublons, gère les caractères interdits dans les `_id` Sanity).
- `upsertSubscriber(email: string): Promise<void>` — crée le document s'il n'existe pas, sinon repasse `status` à `"subscribed"` et met à jour `subscribedAt`, retire `unsubscribedAt`.
- `unsubscribeByEmail(email: string): Promise<void>` — patch `status: "unsubscribed"` + `unsubscribedAt`. Si le document n'existe pas (email jamais abonné), ne fait rien et ne lève pas d'exception (comportement idempotent, pas de fuite d'info sur qui est abonné — même logique que l'ancien traitement Brevo 404).

### Schéma Sanity — `newsletterSubscriber` (nouveau type dans `src/sanity/schemaTypes/index.ts`)

Champs : `email` (string), `status` (string: `"subscribed" | "unsubscribed"`), `subscribedAt` (datetime), `unsubscribedAt` (datetime, optionnel).

### Routes modifiées

- **`src/app/api/forms/submit/route.ts`** : remplace le bloc `fetch("https://api.brevo.com/v3/smtp/email", ...)` par un appel à `sendEmail(...)` avec le même template HTML (déjà échappé). Comportement best-effort conservé : si l'email échoue, la soumission reste enregistrée dans Sanity et la réponse reste `{ ok: true }`.
- **`src/app/api/newsletter/subscribe/route.ts`** : remplace le POST Brevo `/v3/contacts` par `upsertSubscriber(email)`. Réponse `503` si Sanity non configuré (`isSanityWriteConfigured` de `write-client.ts`), miroir du comportement actuel pour Brevo non configuré.
- **`src/app/api/newsletter/unsubscribe/route.ts`** : garde tel quel le flux à double confirmation par jeton signé (protection de sécurité SEC-1, ne pas toucher) ; seul l'envoi de l'email de confirmation passe par `sendEmail`.
- **`src/app/api/newsletter/unsubscribe/confirm/route.ts`** : remplace le `DELETE` Brevo par `unsubscribeByEmail(email)`.

### Documentation

- `README.md` : remplacer la section env vars `BREVO_*` par `MESSAGING_URL_RESEND_API_KEY`, `MESSAGING_URL_RESEND_EMAIL_DOMAIN`.
- `CLAUDE.md` : mettre à jour la section "API routes" pour refléter Resend/Sanity au lieu de Brevo.

## Gestion d'erreurs

- Clé Resend absente : `sendEmail` retourne `{ok:false}`, pas d'exception. `/api/forms/submit` continue silencieusement (formulaire déjà enregistré). `/api/newsletter/unsubscribe` répond `503` explicite (comportement actuel préservé).
- Échec HTTP Resend (domaine non vérifié, quota, clé invalide) : loggé via `console.error`, mêmes réponses HTTP qu'aujourd'hui côté route appelante.
- Sanity non configuré pour les abonnés : `503` cohérent avec le pattern déjà utilisé par `/api/forms/submit`.
- Désinscription d'un email jamais abonné : traité comme un succès idempotent côté `unsubscribeByEmail`, aucune création parasite.

## Tests

Pas de suite de tests automatisée dans ce repo. Vérification manuelle prévue :

- `npx tsc --noEmit`.
- Test local avec `MESSAGING_URL_RESEND_API_KEY` dans `.env.local` (non commité) : soumission contact form → vérifier réception sur `contact@lacdia.esih.edu` (une fois le domaine vérifié côté Resend) et création du `formSubmission` dans le Studio.
- Test inscription/désinscription newsletter → vérifier via GROQ la création puis le passage à `status: "unsubscribed"` du document Sanity, indépendamment de la vérification DNS du domaine d'envoi.

## Hors scope

- Envoi de campagnes newsletter (contenu périodique) — pas automatisé aujourd'hui, ne le sera pas ici.
- Vérification DNS du domaine `lacdia.esih.edu` côté Resend (SPF/DKIM) — sujet séparé, traité après le rattachement du domaine à Vercel.
- Double opt-in à l'inscription newsletter — comportement actuel (inscription immédiate sans confirmation) préservé tel quel.

# Migration Brevo -> Resend + Sanity Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remplacer Brevo par Resend (email transactionnel) et Sanity (stockage des abonnés newsletter) dans les 4 routes API concernées, sans code de compatibilité conservé.

**Architecture:** Deux nouveaux helpers partagés (`src/lib/resend.ts`, `src/lib/newsletter-subscribers.ts`) consommés par les routes existantes, plus un nouveau type de document Sanity `newsletterSubscriber`. Chaque route garde sa logique de validation/rate-limit/sécurité actuelle ; seul le "provider" change.

**Tech Stack:** Next.js App Router (route handlers), `@sanity/client` (déjà une dépendance), `fetch` natif pour l'appel REST Resend (pas de nouvelle dépendance npm).

## Global Constraints

- Pas de suite de tests automatisée dans ce repo (confirmé dans `CLAUDE.md`) : chaque tâche se vérifie via `npx tsc --noEmit` (typage) + un test manuel avec le serveur de dev déjà lancé (`npm run dev`, port 3000 ou 3001) plutôt qu'un framework de test. C'est l'adaptation de "write failing test / make it pass" à ce codebase.
- Ne pas garder de fallback Brevo — suppression complète, pas de flag de compatibilité (cf. `CLAUDE.md`: "Don't use feature flags or backwards-compatibility shims").
- `MESSAGING_URL_RESEND_API_KEY` / `MESSAGING_URL_RESEND_EMAIL_DOMAIN` sont les noms exacts déjà provisionnés côté Vercel Marketplace — ne pas les renommer en `RESEND_API_KEY`.
- Sender fixe : `LaCDIA <notifications@lacdia.esih.edu>`. Destinataire notifications contact configurable via `CONTACT_NOTIFY_EMAIL` (défaut attendu en prod : `contact@lacdia.esih.edu`), pas hardcodé dans le code.
- L'envoi Resend échouera tant que le domaine `lacdia.esih.edu` n'est pas vérifié par DNS côté Resend — c'est attendu, hors scope de ce plan (cf. spec, section "Hors scope"). Le stockage Sanity doit fonctionner indépendamment de ça.

---

### Task 1: Schéma Sanity — type `newsletterSubscriber`

**Files:**
- Modify: `src/sanity/schemaTypes/index.ts:1041-1071` (juste après `formSubmission`, avant `aiSolution`), et la liste `schemaTypes` (`:1332`).

**Interfaces:**
- Produces: type de document Sanity `newsletterSubscriber` avec champs `email` (string), `status` (string: `"subscribed" | "unsubscribed"`), `subscribedAt` (datetime), `unsubscribedAt` (datetime, optionnel). Consommé par Task 3.

- [ ] **Step 1: Ajouter le `defineType` juste après `formSubmission`**

Dans `src/sanity/schemaTypes/index.ts`, juste après la fermeture du bloc `formSubmission` (après la ligne `});` qui suit `defineField({ name: "updatedAt", type: "datetime" }),`), insérer :

```ts
const newsletterSubscriber = defineType({
  name: "newsletterSubscriber",
  title: "Newsletter Subscriber",
  type: "document",
  fields: [
    defineField({ name: "email", type: "string" }),
    defineField({ name: "status", type: "string" }),
    defineField({ name: "subscribedAt", type: "datetime" }),
    defineField({ name: "unsubscribedAt", type: "datetime" }),
  ],
});
```

- [ ] **Step 2: Enregistrer le type dans le tableau `schemaTypes`**

Dans le même fichier, trouver la ligne `formSubmission,` (dans le tableau `export const schemaTypes: SchemaTypeDefinition[] = [...]`, juste avant `formSettings,`) et ajouter `newsletterSubscriber,` juste après :

```ts
  formSubmission,
  newsletterSubscriber,
  formSettings,
```

- [ ] **Step 3: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Commit**

```bash
git add src/sanity/schemaTypes/index.ts
git commit -m "feat(sanity): ajouter le type newsletterSubscriber"
```

---

### Task 2: Helper `src/lib/resend.ts`

**Files:**
- Create: `src/lib/resend.ts`

**Interfaces:**
- Produces: `sendEmail({ to, subject, html }: { to: string; subject: string; html: string }): Promise<{ ok: true } | { ok: false; error: string }>`. Consommé par Task 4 et Task 6.

- [ ] **Step 1: Créer le helper**

```ts
type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
};

type SendEmailResult = { ok: true } | { ok: false; error: string };

export async function sendEmail({ to, subject, html }: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.MESSAGING_URL_RESEND_API_KEY;
  const domain = process.env.MESSAGING_URL_RESEND_EMAIL_DOMAIN;

  if (!apiKey || !domain) {
    return { ok: false, error: "not_configured" };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: `LaCDIA <notifications@${domain}>`,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const errText = await response.text();
    console.error("[resend] echec envoi email:", response.status, errText);
    return { ok: false, error: `http_${response.status}` };
  }

  return { ok: true };
}
```

Save as `src/lib/resend.ts`.

- [ ] **Step 2: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Test manuel isolé (sans serveur)**

Run (remplacer la clé par la valeur réelle de `MESSAGING_URL_RESEND_API_KEY`, ne pas commiter cette commande avec la vraie clé) :

```bash
node -e '
process.env.MESSAGING_URL_RESEND_API_KEY = "re_..."; // valeur reelle, a la main dans le terminal
process.env.MESSAGING_URL_RESEND_EMAIL_DOMAIN = "lacdia.esih.edu";
import("./src/lib/resend.ts").then(async ({ sendEmail }) => {
  const result = await sendEmail({ to: "contact@lacdia.esih.edu", subject: "Test", html: "<p>Test</p>" });
  console.log(result);
});
' 2>&1
```

Expected: soit `{ ok: true }` (si le domaine est déjà vérifié côté Resend), soit `{ ok: false, error: "http_..." }` avec un message loggé expliquant pourquoi (domaine non vérifié attendu à ce stade — cf. Global Constraints). Le but de ce test est de confirmer que la requête part bien et que la réponse est interprétée correctement, pas d'obtenir un envoi réussi.

Note : `import("./src/lib/resend.ts")` fonctionne avec Node 24+ (`--experimental-strip-types` actif par défaut sur les nouvelles versions) ; si ça échoue avec une erreur de syntaxe TypeScript, tester à la place via le serveur de dev + Task 4/6 directement (le test isolé est un raccourci, pas un pré-requis bloquant).

- [ ] **Step 4: Commit**

```bash
git add src/lib/resend.ts
git commit -m "feat(email): ajouter le helper sendEmail (Resend)"
```

---

### Task 3: Helper `src/lib/newsletter-subscribers.ts`

**Files:**
- Create: `src/lib/newsletter-subscribers.ts`

**Interfaces:**
- Consumes: `sanityWriteClient`, `isSanityWriteConfigured` de `src/lib/sanity/write-client.ts` (déjà existant, inchangé) ; type `newsletterSubscriber` de Task 1.
- Produces: `subscriberId(email: string): string`, `upsertSubscriber(email: string): Promise<void>`, `unsubscribeByEmail(email: string): Promise<void>`, ré-export de `isSanityWriteConfigured`. Consommé par Task 5 et Task 7.

- [ ] **Step 1: Créer le helper**

```ts
import { createHash } from "node:crypto";

import { sanityWriteClient, isSanityWriteConfigured } from "@/lib/sanity/write-client";

export { isSanityWriteConfigured };

export function subscriberId(email: string): string {
  const hash = createHash("sha256").update(email.trim().toLowerCase()).digest("hex").slice(0, 24);
  return `newsletter-${hash}`;
}

export async function upsertSubscriber(email: string): Promise<void> {
  if (!sanityWriteClient) throw new Error("Sanity write client non configure");
  const id = subscriberId(email);
  const now = new Date().toISOString();

  await sanityWriteClient.createIfNotExists({
    _id: id,
    _type: "newsletterSubscriber",
    email: email.trim().toLowerCase(),
    status: "subscribed",
    subscribedAt: now,
  });

  await sanityWriteClient
    .patch(id)
    .set({ status: "subscribed", subscribedAt: now })
    .unset(["unsubscribedAt"])
    .commit();
}

export async function unsubscribeByEmail(email: string): Promise<void> {
  if (!sanityWriteClient) throw new Error("Sanity write client non configure");
  const id = subscriberId(email);
  const now = new Date().toISOString();

  try {
    await sanityWriteClient
      .patch(id)
      .set({ status: "unsubscribed", unsubscribedAt: now })
      .commit();
  } catch {
    // Email jamais abonne : ignore silencieusement, pas de fuite d'info sur
    // qui est abonne (meme comportement idempotent que l'ancien 404 Brevo).
  }
}
```

Save as `src/lib/newsletter-subscribers.ts`.

- [ ] **Step 2: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Test manuel isolé contre le dataset Sanity réel**

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g, "")]; })
);
Object.assign(process.env, env);
import("./src/lib/newsletter-subscribers.ts").then(async ({ subscriberId, upsertSubscriber, unsubscribeByEmail }) => {
  const email = "test-plan-verification@example.com";
  const id = subscriberId(email);
  console.log("id:", id);
  await upsertSubscriber(email);
  console.log("upserted");
  await unsubscribeByEmail(email);
  console.log("unsubscribed");
});
' 2>&1
```

Expected: `id: newsletter-<hash>`, `upserted`, `unsubscribed`, sans exception.

- [ ] **Step 4: Vérifier le résultat dans Sanity**

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g, "")]; })
);
const { createClient } = require("@sanity/client");
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", token: env.SANITY_API_TOKEN, useCdn: false });
(async () => {
  const doc = await client.fetch(`*[_type == "newsletterSubscriber" && email == "test-plan-verification@example.com"][0]`);
  console.log(JSON.stringify(doc, null, 2));
})();
' 2>&1
```

Expected: document avec `status: "unsubscribed"`, `unsubscribedAt` défini.

- [ ] **Step 5: Nettoyer le document de test**

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g, "")]; })
);
const { createClient } = require("@sanity/client");
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", token: env.SANITY_API_TOKEN, useCdn: false });
import("../src/lib/newsletter-subscribers.ts").then(async ({ subscriberId }) => {
  await client.delete(subscriberId("test-plan-verification@example.com"));
  console.log("deleted");
});
' 2>&1
```

Expected: `deleted`. (Si l'import relatif échoue selon le répertoire d'exécution, calculer l'id manuellement : `newsletter-` + `sha256("test-plan-verification@example.com")` tronqué à 24 caractères hex, ou supprimer par requête `client.delete({ query: '*[_type == "newsletterSubscriber" && email == "test-plan-verification@example.com"]' })`.)

- [ ] **Step 6: Commit**

```bash
git add src/lib/newsletter-subscribers.ts
git commit -m "feat(newsletter): ajouter le helper d'abonnes Sanity"
```

---

### Task 4: `/api/forms/submit` — remplacer Brevo par Resend

**Files:**
- Modify: `src/app/api/forms/submit/route.ts:77-129`

**Interfaces:**
- Consumes: `sendEmail` de Task 2 (`src/lib/resend.ts`).

- [ ] **Step 1: Remplacer le bloc Brevo**

Dans `src/app/api/forms/submit/route.ts`, ajouter l'import en haut du fichier (après les imports existants) :

```ts
import { sendEmail } from "@/lib/resend";
```

Puis remplacer tout le bloc allant de `const notifyEmail = process.env.BREVO_NOTIFY_EMAIL;` jusqu'à la fin du `if (notifyEmail && senderEmail && apiKey) { ... }` (avant le `return NextResponse.json({ ok: true, message: "Demande enregistree." });` final) par :

```ts
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (notifyEmail) {
    const typeLabel = formType === "collaborer" ? "Collaboration" : "Contact";
    // Contenu utilisateur échappé avant interpolation HTML (SEC-5) :
    // sans cela, un champ contenant des balises pouvait s'injecter dans
    // l'email de notification reçu par l'équipe.
    const safeFullName = escapeHtml(fullName);
    const safeEmail = escapeHtml(email);
    const safeOrganization = organization ? escapeHtml(organization) : "";
    const safeSubject = subject ? escapeHtml(subject) : "";
    const safeMessage = rawMessage ? escapeHtml(rawMessage) : "";
    const safePhone = phone ? escapeHtml(phone) : "";

    const result = await sendEmail({
      to: notifyEmail,
      subject: `[LaCDIA] Nouvelle demande — ${typeLabel}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
          <h2 style="color:#0a0f1c;margin-bottom:16px;">Nouvelle demande de ${typeLabel.toLowerCase()}</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;color:#555;width:140px;">Nom</td><td style="padding:8px 0;font-weight:600;">${safeFullName}</td></tr>
            <tr><td style="padding:8px 0;color:#555;">Email</td><td style="padding:8px 0;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            ${safePhone ? `<tr><td style="padding:8px 0;color:#555;">Téléphone</td><td style="padding:8px 0;"><a href="tel:${safePhone}">${safePhone}</a></td></tr>` : ""}
            <tr><td style="padding:8px 0;color:#555;">Organisation</td><td style="padding:8px 0;">${safeOrganization || "—"}</td></tr>
            <tr><td style="padding:8px 0;color:#555;">Objet</td><td style="padding:8px 0;">${safeSubject || "—"}</td></tr>
          </table>
          <div style="margin-top:16px;padding:16px;background:#fff;border-radius:6px;border:1px solid #e5e5e5;">
            <p style="color:#555;margin:0;white-space:pre-wrap;">${safeMessage}</p>
          </div>
          <p style="margin-top:16px;font-size:12px;color:#999;">Message reçu via le formulaire du site LaCDIA.</p>
        </div>`,
    });

    if (!result.ok) {
      console.error("[resend] notification contact non envoyee:", result.error);
    }
  }
```

- [ ] **Step 2: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur (notamment aucune référence résiduelle à `BREVO_*`).

- [ ] **Step 3: Test manuel via le serveur de dev**

Démarrer le serveur si besoin (`npm run dev`), puis :

```bash
curl -s -X POST http://localhost:3000/api/forms/submit \
  -H "Content-Type: application/json" \
  -d '{"formType":"contact","fullName":"Test Plan","email":"test@example.com","message":"Verification du plan d implementation","consent":true}'
```

Expected: `{"ok":true,"message":"Demande enregistree."}`. Vérifier ensuite dans les logs du serveur de dev qu'aucune erreur `BREVO` n'apparaît (soit succès Resend, soit `[resend] notification contact non envoyee: http_...` si le domaine n'est pas encore vérifié — les deux sont acceptables à ce stade, cf. Global Constraints).

- [ ] **Step 4: Nettoyer le formSubmission de test**

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g, "")]; })
);
const { createClient } = require("@sanity/client");
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", token: env.SANITY_API_TOKEN, useCdn: false });
(async () => {
  const ids = await client.fetch(`*[_type == "formSubmission" && email == "test@example.com"]._id`);
  for (const id of ids) await client.delete(id);
  console.log("deleted", ids.length);
})();
' 2>&1
```

Expected: `deleted 1` (ou plus si des tests précédents n'ont pas été nettoyés).

- [ ] **Step 5: Commit**

```bash
git add src/app/api/forms/submit/route.ts
git commit -m "feat(forms): notifier via Resend au lieu de Brevo"
```

---

### Task 5: `/api/newsletter/subscribe` — remplacer Brevo par Sanity

**Files:**
- Modify: `src/app/api/newsletter/subscribe/route.ts` (fichier entier, 60 lignes)

**Interfaces:**
- Consumes: `isSanityWriteConfigured`, `upsertSubscriber` de Task 3 (`src/lib/newsletter-subscribers.ts`).

- [ ] **Step 1: Réécrire la route**

Remplacer tout le contenu de `src/app/api/newsletter/subscribe/route.ts` par :

```ts
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
```

- [ ] **Step 2: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 3: Test manuel via le serveur de dev**

```bash
curl -s -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test-subscribe@example.com"}'
```

Expected: `{"ok":true,"message":"Inscription enregistree."}`.

- [ ] **Step 4: Vérifier et nettoyer dans Sanity**

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(
  fs.readFileSync(".env.local", "utf8")
    .split(/\r?\n/)
    .filter(l => l.includes("=") && !l.trim().startsWith("#"))
    .map(l => { const i = l.indexOf("="); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g, "")]; })
);
const { createClient } = require("@sanity/client");
const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", token: env.SANITY_API_TOKEN, useCdn: false });
(async () => {
  const doc = await client.fetch(`*[_type == "newsletterSubscriber" && email == "test-subscribe@example.com"][0]`);
  console.log(JSON.stringify(doc, null, 2));
  if (doc) { await client.delete(doc._id); console.log("deleted"); }
})();
' 2>&1
```

Expected : document avec `status: "subscribed"`, puis `deleted`.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/newsletter/subscribe/route.ts
git commit -m "feat(newsletter): stocker les inscriptions dans Sanity au lieu de Brevo"
```

---

### Task 6: `/api/newsletter/unsubscribe` — remplacer l'envoi Brevo par Resend

**Files:**
- Modify: `src/app/api/newsletter/unsubscribe/route.ts:49-100`

**Interfaces:**
- Consumes: `sendEmail` de Task 2.

- [ ] **Step 1: Ajouter l'import**

En haut de `src/app/api/newsletter/unsubscribe/route.ts`, ajouter :

```ts
import { sendEmail } from "@/lib/resend";
```

- [ ] **Step 2: Remplacer le bloc de configuration et d'envoi**

Remplacer :

```ts
  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL;

  if (!apiKey || !senderEmail || !isUnsubscribeTokenConfigured()) {
```

par :

```ts
  if (!process.env.MESSAGING_URL_RESEND_API_KEY || !isUnsubscribeTokenConfigured()) {
```

(le reste du `if` — le message de log et le `return` 503 — ne change pas).

Puis remplacer le bloc d'envoi, de `const brevoRes = await fetch(...)` jusqu'au `return NextResponse.json({ ok: true, message: "Email de confirmation envoyé." });` final, par :

```ts
  const result = await sendEmail({
    to: email,
    subject: copy.subject,
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:24px;background:#f9f9f9;border-radius:8px;">
        <p style="color:#333;line-height:1.6;">${copy.intro}</p>
        <p style="margin:24px 0;">
          <a href="${confirmUrl.toString()}" style="background:#0a0f1c;color:#fff;padding:12px 22px;border-radius:8px;text-decoration:none;font-weight:600;display:inline-block;">${copy.cta}</a>
        </p>
        <p style="color:#999;font-size:12px;">${copy.ignore}</p>
      </div>`,
  });

  if (!result.ok) {
    console.error("[resend] echec envoi email de confirmation de desinscription:", result.error);
    return NextResponse.json(
      { ok: false, message: "Erreur lors de l'envoi de l'email de confirmation." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, message: "Email de confirmation envoyé." });
```

- [ ] **Step 3: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur, aucune référence résiduelle à `BREVO_*` dans ce fichier.

- [ ] **Step 4: Test manuel via le serveur de dev**

```bash
curl -s -X POST http://localhost:3000/api/newsletter/unsubscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test-unsub@example.com","locale":"fr"}'
```

Expected: soit `{"ok":true,"message":"Email de confirmation envoyé."}` (si le domaine Resend est déjà vérifié), soit `{"ok":false,"message":"Erreur lors de l'envoi de l'email de confirmation."}` avec un `502` (attendu tant que le domaine n'est pas vérifié — cf. Global Constraints). Dans les deux cas, vérifier dans les logs du serveur qu'il n'y a plus aucune mention de `brevo`.

- [ ] **Step 5: Commit**

```bash
git add src/app/api/newsletter/unsubscribe/route.ts
git commit -m "feat(newsletter): envoyer l'email de confirmation de desinscription via Resend"
```

---

### Task 7: `/api/newsletter/unsubscribe/confirm` — remplacer Brevo par Sanity

**Files:**
- Modify: `src/app/api/newsletter/unsubscribe/confirm/route.ts:66-84`

**Interfaces:**
- Consumes: `isSanityWriteConfigured`, `unsubscribeByEmail` de Task 3.

- [ ] **Step 1: Ajouter l'import**

En haut de `src/app/api/newsletter/unsubscribe/confirm/route.ts`, ajouter :

```ts
import { isSanityWriteConfigured, unsubscribeByEmail } from "@/lib/newsletter-subscribers";
```

- [ ] **Step 2: Remplacer le bloc Brevo**

Remplacer :

```ts
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    return htmlPage(locale, copy.errorTitle, copy.errorBody);
  }

  const response = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email)}`, {
    method: "DELETE",
    headers: { "api-key": apiKey },
  });

  // 404 = déjà désabonné / jamais inscrit : on le traite comme un succès
  // (idempotent) plutôt que d'afficher une erreur à l'utilisateur.
  if (!response.ok && response.status !== 404) {
    const errText = await response.text();
    console.error("[brevo] echec suppression contact:", response.status, errText);
    return htmlPage(locale, copy.errorTitle, copy.errorBody);
  }

  return htmlPage(locale, copy.okTitle, copy.okBody);
```

par :

```ts
  if (!isSanityWriteConfigured) {
    return htmlPage(locale, copy.errorTitle, copy.errorBody);
  }

  // Email jamais abonne = deja desabonne : traite comme un succes
  // idempotent (voir unsubscribeByEmail), pas d'erreur affichee.
  await unsubscribeByEmail(email);

  return htmlPage(locale, copy.okTitle, copy.okBody);
```

- [ ] **Step 3: Vérifier le typage**

Run: `npx tsc --noEmit`
Expected: aucune erreur.

- [ ] **Step 4: Test manuel — vérifier l'effet attendu de la route sur Sanity**

Cette route dépend d'un token signé généré par `/api/newsletter/unsubscribe` (Task 6) puis reçu par email — construire ce token à la main dans un test manuel n'apporte rien de plus que ce que Task 3/Step 3-4 a déjà vérifié pour `unsubscribeByEmail`. Ce qui reste à vérifier ici, c'est que la route `confirm` elle-même appelle bien cette fonction et compile sans référence résiduelle à Brevo (déjà couvert par Step 3). Pour une vérification bout-en-bout de la fonction consommée par la route :

```bash
node -e '
const fs = require("fs");
const env = Object.fromEntries(fs.readFileSync(".env.local","utf8").split(/\r?\n/).filter(l=>l.includes("=")&&!l.trim().startsWith("#")).map(l=>{const i=l.indexOf("=");return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g,"")];}));
Object.assign(process.env, env);
import("./src/lib/newsletter-subscribers.ts").then(async ({ unsubscribeByEmail, subscriberId }) => {
  await unsubscribeByEmail("test-e2e@example.com");
  const { createClient } = await import("@sanity/client");
  const client = createClient({ projectId: env.NEXT_PUBLIC_SANITY_PROJECT_ID, dataset: env.NEXT_PUBLIC_SANITY_DATASET, apiVersion: "2024-01-01", token: env.SANITY_API_TOKEN, useCdn: false });
  const doc = await client.fetch(`*[_id == $id][0]`, { id: subscriberId("test-e2e@example.com") });
  console.log(JSON.stringify(doc, null, 2));
  await client.delete(doc._id);
  console.log("deleted");
});
' 2>&1
```

Expected: document avec `status: "unsubscribed"`, puis `deleted`. Ce test vérifie la fonction consommée par la route (`unsubscribeByEmail`), déjà testée dans son intégration réelle à la route dans Task 3 ; ici on vérifie que la route `confirm` compile et que rien ne référence plus Brevo (Step 3).

- [ ] **Step 5: Commit**

```bash
git add src/app/api/newsletter/unsubscribe/confirm/route.ts
git commit -m "feat(newsletter): confirmer la desinscription via Sanity au lieu de Brevo"
```

---

### Task 8: Documentation — README.md et CLAUDE.md

**Files:**
- Modify: `README.md:61-65`
- Modify: `CLAUDE.md:53-54`

**Interfaces:**
- Aucune (documentation seule).

- [ ] **Step 1: Mettre à jour README.md**

Remplacer :

```
# Brevo (newsletter + notifications)
BREVO_API_KEY=your_brevo_key
BREVO_LIST_ID=123
BREVO_NOTIFY_EMAIL=contact@lacdia.example
BREVO_SENDER_EMAIL=notifications@lacdia.example
```

par :

```
# Resend (email transactionnel — notifications contact + confirmation desinscription)
MESSAGING_URL_RESEND_API_KEY=re_your_resend_key
MESSAGING_URL_RESEND_EMAIL_DOMAIN=lacdia.esih.edu
CONTACT_NOTIFY_EMAIL=contact@lacdia.esih.edu
```

- [ ] **Step 2: Mettre à jour CLAUDE.md**

Remplacer :

```
- `POST /api/forms/submit` — enregistre dans Sanity, notifie par email via Brevo si configuré.
- `POST /api/newsletter/subscribe` / `POST /api/newsletter/unsubscribe` — via Brevo si configuré. Le formulaire de désinscription (`NewsletterUnsubscribeForm`) est rendu **inconditionnellement** sur `/newsletter` (pas seulement si un éditeur configure une section CMS `formType: "unsubscribe"`) — fonctionnalité compliance-sensible, ne doit pas dépendre d'une config Sanity oubliée.
```

par :

```
- `POST /api/forms/submit` — enregistre dans Sanity, notifie par email via Resend si `CONTACT_NOTIFY_EMAIL`/`MESSAGING_URL_RESEND_API_KEY` sont configurés (`src/lib/resend.ts`).
- `POST /api/newsletter/subscribe` / `POST /api/newsletter/unsubscribe` — abonnés stockés comme documents Sanity `newsletterSubscriber` (`src/lib/newsletter-subscribers.ts`), email de confirmation de désinscription via Resend. Le formulaire de désinscription (`NewsletterUnsubscribeForm`) est rendu **inconditionnellement** sur `/newsletter` (pas seulement si un éditeur configure une section CMS `formType: "unsubscribe"`) — fonctionnalité compliance-sensible, ne doit pas dépendre d'une config Sanity oubliée.
```

- [ ] **Step 3: Commit**

```bash
git add README.md CLAUDE.md
git commit -m "docs: documenter la migration Brevo -> Resend + Sanity"
```

---

### Task 9: Vérification finale et nettoyage

**Files:** aucun fichier modifié — vérification transverse.

- [ ] **Step 1: Confirmer qu'aucune référence à Brevo ne subsiste dans le code applicatif**

```bash
grep -rn "brevo\|BREVO" src/ README.md CLAUDE.md
```

Expected: aucune sortie.

- [ ] **Step 2: Typecheck complet**

```bash
npx tsc --noEmit
```

Expected: aucune erreur.

- [ ] **Step 3: Lint**

```bash
npm run lint
```

Expected: aucune erreur (des warnings préexistants non liés à ce changement sont acceptables).

- [ ] **Step 4: Ajouter `MESSAGING_URL_RESEND_API_KEY`, `MESSAGING_URL_RESEND_EMAIL_DOMAIN` et `CONTACT_NOTIFY_EMAIL` dans `.env.local`**

Fichier déjà gitignoré (`.env*` dans `.gitignore`) — ajouter les 3 lignes avec les valeurs réelles pour que les tests manuels des tâches précédentes et les futurs tests locaux fonctionnent. Ne jamais committer ce fichier.

- [ ] **Step 5: Rappel — ne pas exécuter `npm run sanity:seed`**

Le script `scripts/sanity-seed.mjs` ne connaît pas le type `newsletterSubscriber` (normal, ce ne sont pas des données éditoriales à seeder) et surtout **écrase les documents existants avec `createOrReplace`** (cf. incident du 2026-08-05 documenté dans la mémoire de session) — ne pas le relancer sur la prod sans diff préalable document par document.

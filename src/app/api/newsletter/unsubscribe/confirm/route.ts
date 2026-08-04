import { verifyUnsubscribeToken } from "@/lib/unsubscribe-token";

// Etape 2 de la désinscription : le lien signé envoyé par
// /api/newsletter/unsubscribe (voir ce fichier) pointe ici. Le jeton est
// vérifié (signature HMAC + expiration) avant toute suppression réelle du
// contact Brevo — voir audit pré-production, constat SEC-1 / COMP-1.

function htmlPage(locale: "fr" | "en", title: string, body: string) {
  return new Response(
    `<!doctype html>
<html lang="${locale}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="robots" content="noindex" />
  <title>${title} — LaCDIA</title>
  <style>
    body { font-family: system-ui, -apple-system, sans-serif; background: #0a0f1c; color: #f0f4ff; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; padding: 2rem; text-align: center; }
    .card { max-width: 28rem; }
    h1 { font-size: 1.5rem; margin-bottom: 0.75rem; }
    p { color: #8892b0; line-height: 1.6; }
    a { color: #00d4aa; }
  </style>
</head>
<body>
  <div class="card">
    <h1>${title}</h1>
    <p>${body}</p>
  </div>
</body>
</html>`,
    { headers: { "Content-Type": "text/html; charset=utf-8" } },
  );
}

const copyByLocale = {
  fr: {
    invalidTitle: "Lien expiré ou invalide",
    invalidBody: "Ce lien de désinscription n'est plus valide. Merci de refaire une demande depuis la page newsletter.",
    errorTitle: "Une erreur est survenue",
    errorBody: "Nous n'avons pas pu traiter votre désinscription. Réessayez plus tard ou contactez-nous directement.",
    okTitle: "Désinscription confirmée",
    okBody: "Vous ne recevrez plus la newsletter LaCDIA.",
  },
  en: {
    invalidTitle: "Link expired or invalid",
    invalidBody: "This unsubscribe link is no longer valid. Please request a new one from the newsletter page.",
    errorTitle: "Something went wrong",
    errorBody: "We couldn't process your unsubscription. Please try again later or contact us directly.",
    okTitle: "You're unsubscribed",
    okBody: "You will no longer receive the LaCDIA newsletter.",
  },
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim().toLowerCase();
  const token = searchParams.get("token");
  const locale: "fr" | "en" = searchParams.get("locale") === "en" ? "en" : "fr";
  const copy = copyByLocale[locale];

  if (!email || !token || !verifyUnsubscribeToken(email, token)) {
    return htmlPage(locale, copy.invalidTitle, copy.invalidBody);
  }

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
}

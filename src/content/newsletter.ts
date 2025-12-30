export const newsletter = {
  enabled: true,
  provider: "placeholder" as "placeholder" | "brevo" | "mailchimp",
  title: "Newsletter",
  description:
    "Recevez nos actualités : projets, publications, événements, opportunités (stages, collaborations).",
  consentText:
    "En vous inscrivant, vous acceptez de recevoir nos communications. Vous pouvez vous désinscrire à tout moment.",
  subscribeEndpoint: "/api/newsletter/subscribe",
} as const;

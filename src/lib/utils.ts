export function cn(...inputs: (string | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}

// Echappe le contenu utilisateur avant interpolation dans un email HTML
// (voir audit pré-production, SEC-5 : les champs de formulaire étaient
// injectés tels quels dans le htmlContent envoyé via Brevo).
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

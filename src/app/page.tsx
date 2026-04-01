import { redirect } from "next/navigation";

/**
 * Page racine — Redirection vers la locale par défaut.
 * Normalement le middleware next-intl gère cette redirection,
 * mais cette page sert de filet de sécurité.
 */
export default function RootPage() {
  redirect("/fr");
}

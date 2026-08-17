import { redirect } from "next/navigation";

// Page temporairement masquée — réactiver en restaurant le contenu complet
// et en rajoutant { label: "Équipe", href: "/equipe" } dans src/content/nav.ts
export default function EquipePage() {
  redirect("/");
}
/**
 * scripts/seed-scientific-architecture.mjs
 *
 * Pré-remplit les champs d'architecture scientifique dans le document
 * homePage de Sanity (Option A) à partir du contenu fr.json / en.json.
 *
 * Usage : node scripts/seed-scientific-architecture.mjs
 * Prérequis : SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_TOKEN dans .env.local
 */

import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");

// ── Load .env.local ─────────────────────────────────────────────────────────
function loadEnv() {
  try {
    const raw = readFileSync(resolve(root, ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx === -1) continue;
      const key = trimmed.slice(0, idx).trim();
      const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local absent — on compte sur les variables d'environnement shell
  }
}
loadEnv();

const projectId = process.env.SANITY_PROJECT_ID ?? process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset   = process.env.SANITY_DATASET   ?? process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token     = process.env.SANITY_API_TOKEN;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

if (!projectId || !token) {
  console.error("❌  SANITY_PROJECT_ID et SANITY_API_TOKEN sont requis.");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion, useCdn: false });

// ── Load translations ────────────────────────────────────────────────────────
const fr = JSON.parse(readFileSync(resolve(root, "src/messages/fr.json"), "utf8"));
const en = JSON.parse(readFileSync(resolve(root, "src/messages/en.json"), "utf8"));
const hFr = fr.home.highlights;
const hEn = en.home.highlights;

/** Join an array of keywords into a "A · B · C" string */
const kw = (arr) => Array.isArray(arr) ? arr.join(" · ") : arr;

/** localeString helper */
const ls = (frVal, enVal) => ({ fr: frVal, en: enVal });

/** localeText helper (same shape as localeString in our schema) */
const lt = (frVal, enVal) => ({ fr: frVal, en: enVal });

// ── Mission items from intro.tsx MISSION_ITEMS ───────────────────────────────
// Icons are kept in the component — here we only seed the text
const MISSION_FR = [
  "Produire des connaissances scientifiques originales en intelligence artificielle et en science des données.",
  "Développer des méthodes, jeux de données, prototypes et outils adaptés aux contextes haïtien et caribéen.",
  "Contribuer à la formation de chercheurs, doctorants, ingénieurs et professionnels.",
  "Favoriser le transfert responsable des connaissances et des technologies vers les acteurs publics, privés et communautaires.",
  "Promouvoir une intelligence artificielle robuste, explicable, éthique, inclusive et respectueuse des personnes.",
  "Contribuer au rayonnement scientifique d'Haïti et au développement de coopérations caribéennes et internationales.",
];
const MISSION_EN = [
  "Produce original scientific knowledge in artificial intelligence and data science.",
  "Develop methods, datasets, prototypes and tools adapted to Haitian and Caribbean contexts.",
  "Contribute to the training of researchers, doctoral students, engineers and professionals.",
  "Foster responsible transfer of knowledge and technologies to public, private and community actors.",
  "Promote robust, explainable, ethical, inclusive and person-respecting artificial intelligence.",
  "Contribute to Haiti's scientific influence and the development of Caribbean and international collaborations.",
];

const missionItems = MISSION_FR.map((frText, i) => ({
  _type: "missionItem",
  _key: `mission-${i + 1}`,
  text: lt(frText, MISSION_EN[i]),
}));

// ── Patch payload ────────────────────────────────────────────────────────────
const patch = {
  // Vision (Intro)
  introTitle:       ls(fr.home.introTitle, en.home.introTitle),
  introBody:        lt(fr.home.introBody,  en.home.introBody),
  missionItems,

  // Architecture scientifique — Axe 1
  axe1Title:        ls(hFr.axe1Title,        hEn.axe1Title),
  axe1Description:  lt(hFr.axe1Description,  hEn.axe1Description),
  axe1Keywords:     lt(kw(hFr.axe1Keywords), kw(hEn.axe1Keywords)),
  axe1Objectives:   lt(hFr.axe1Objectives,   hEn.axe1Objectives),

  // Architecture scientifique — Axe 2
  axe2Title:        ls(hFr.axe2Title,        hEn.axe2Title),
  axe2Description:  lt(hFr.axe2Description,  hEn.axe2Description),
  axe2Keywords:     lt(kw(hFr.axe2Keywords), kw(hEn.axe2Keywords)),
  axe2Objectives:   lt(hFr.axe2Objectives,   hEn.axe2Objectives),

  // Pôle de valorisation
  poleTitle:        ls(hFr.poleTitle,        hEn.poleTitle),
  poleDescription:  lt(hFr.poleDescription,  hEn.poleDescription),
  poleSectors:      lt(kw(hFr.poleSectors),  kw(hEn.poleSectors)),
  poleNote:         lt(hFr.poleNote,         hEn.poleNote),

  // Éthique transversale
  ethicsTitle:      ls(hFr.ethicsTitle,  hEn.ethicsTitle),
  ethicsText:       lt(hFr.ethicsText,   hEn.ethicsText),
};

// ── Run ──────────────────────────────────────────────────────────────────────
async function run() {
  console.log(`\n🔗  Sanity ${projectId}/${dataset} — version API ${apiVersion}`);

  // Find the homePage document
  const doc = await client.fetch(`*[_type == "homePage"][0]{ _id }`);
  if (!doc?._id) {
    console.error("❌  Aucun document homePage trouvé. Lance d'abord npm run sanity:seed");
    process.exit(1);
  }
  console.log(`📄  Document trouvé : ${doc._id}`);

  // Patch
  await client.patch(doc._id).set(patch).commit();

  console.log("✅  Champs d'architecture scientifique mis à jour avec succès !\n");
  console.log("   Champs écrits :");
  Object.keys(patch).forEach((k) => console.log(`   • ${k}`));
  console.log("\n   Ouvre /studio pour vérifier et affiner le contenu.");
}

run().catch((err) => {
  console.error("❌  Erreur :", err.message);
  process.exit(1);
});

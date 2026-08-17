#!/usr/bin/env node
/**
 * Script de traduction automatique des fichiers i18n
 * ===================================================
 *
 * Ce script traduit les fichiers de messages JSON du français
 * vers les langues cibles en utilisant l'une des stratégies suivantes :
 *
 * 1. LibreTranslate (gratuit, open-source, auto-hébergeable)
 *    URL par défaut : https://libretranslate.com
 *    Installation locale : docker run -d -p 5000:5000 libretranslate/libretranslate
 *
 * 2. Google Cloud Translation API (nécessite une clé API)
 *    Variable d'environnement : GOOGLE_TRANSLATE_API_KEY
 *
 * 3. DeepL API (nécessite une clé API, version gratuite disponible)
 *    Variable d'environnement : DEEPL_API_KEY
 *
 * Usage :
 *   node scripts/auto-translate.mjs                          # Toutes les langues cibles
 *   node scripts/auto-translate.mjs --target en              # Anglais seulement
 *   node scripts/auto-translate.mjs --dry-run                # Simulation sans écriture
 *
 * Options :
 *   --target <locale>    Langue cible (en). Toutes si omis.
 *   --engine <name>      Moteur : libre (défaut), google, deepl
 *   --api-url <url>      URL LibreTranslate (défaut: https://libretranslate.com)
 *   --dry-run            Affiche les traductions sans écrire les fichiers
 *   --overwrite          Écrase les traductions existantes (défaut: conserve)
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MESSAGES_DIR = path.join(__dirname, "..", "src", "messages");
const SOURCE_LOCALE = "fr";

// Mapping des codes de langue
const LIBRE_LANG_MAP = { fr: "fr", en: "en" };
const GOOGLE_LANG_MAP = { fr: "fr", en: "en" };
const DEEPL_LANG_MAP = { fr: "FR", en: "EN" };

// ─── Helpers ────────────────────────────────────────────

function parseArgs() {
  const args = process.argv.slice(2);
  const opts = { targets: [], engine: "libre", apiUrl: "https://libretranslate.com", dryRun: false, overwrite: false };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--target" && args[i + 1]) opts.targets.push(args[++i]);
    else if (args[i] === "--engine" && args[i + 1]) opts.engine = args[++i];
    else if (args[i] === "--api-url" && args[i + 1]) opts.apiUrl = args[++i];
    else if (args[i] === "--dry-run") opts.dryRun = true;
    else if (args[i] === "--overwrite") opts.overwrite = true;
  }

  if (opts.targets.length === 0) opts.targets = ["en"];
  return opts;
}

function flattenObject(obj, prefix = "") {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      Object.assign(result, flattenObject(value, newKey));
    } else {
      result[newKey] = value;
    }
  }
  return result;
}

function unflattenObject(obj) {
  const result = {};
  for (const [key, value] of Object.entries(obj)) {
    const parts = key.split(".");
    let current = result;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) current[parts[i]] = {};
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
  }
  return result;
}

// ─── Translation Engines ────────────────────────────────

async function translateLibre(text, from, to, apiUrl) {
  const response = await fetch(`${apiUrl}/translate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source: LIBRE_LANG_MAP[from], target: LIBRE_LANG_MAP[to], format: "text" }),
  });
  if (!response.ok) throw new Error(`LibreTranslate error: ${response.status}`);
  const data = await response.json();
  return data.translatedText;
}

async function translateGoogle(text, from, to) {
  const key = process.env.GOOGLE_TRANSLATE_API_KEY;
  if (!key) throw new Error("GOOGLE_TRANSLATE_API_KEY not set");
  const url = `https://translation.googleapis.com/language/translate/v2?key=${key}`;
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ q: text, source: GOOGLE_LANG_MAP[from], target: GOOGLE_LANG_MAP[to], format: "text" }),
  });
  if (!response.ok) throw new Error(`Google Translate error: ${response.status}`);
  const data = await response.json();
  return data.data.translations[0].translatedText;
}

async function translateDeepL(text, from, to) {
  const key = process.env.DEEPL_API_KEY;
  if (!key) throw new Error("DEEPL_API_KEY not set");
  const targetLang = DEEPL_LANG_MAP[to];
  if (!targetLang) throw new Error(`DeepL does not support locale: ${to}`);
  const url = key.endsWith(":fx")
    ? "https://api-free.deepl.com/v2/translate"
    : "https://api.deepl.com/v2/translate";
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `DeepL-Auth-Key ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ text: [text], source_lang: DEEPL_LANG_MAP[from], target_lang: targetLang }),
  });
  if (!response.ok) throw new Error(`DeepL error: ${response.status}`);
  const data = await response.json();
  return data.translations[0].text;
}

async function translateText(text, from, to, engine, apiUrl) {
  if (!text) return text;
  // Don't translate very short technical strings
  if (text.length <= 2) return text;

  const delay = (ms) => new Promise((r) => setTimeout(r, ms));
  await delay(100); // Rate limiting

  switch (engine) {
    case "libre": return translateLibre(text, from, to, apiUrl);
    case "google": return translateGoogle(text, from, to);
    case "deepl": return translateDeepL(text, from, to);
    default: throw new Error(`Unknown engine: ${engine}`);
  }
}

// Recurse into arrays/objects so array-valued message keys (e.g. lists of
// { label, value } options) get every string leaf translated instead of
// being copied verbatim from French into the target locale.
async function translate(value, from, to, engine, apiUrl) {
  if (typeof value === "string") {
    return translateText(value, from, to, engine, apiUrl);
  }
  if (Array.isArray(value)) {
    const out = [];
    for (const item of value) {
      out.push(await translate(item, from, to, engine, apiUrl));
    }
    return out;
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = await translate(v, from, to, engine, apiUrl);
    }
    return out;
  }
  return value;
}

// ─── Main ────────────────────────────────────────────

async function main() {
  const opts = parseArgs();
  console.log(`\n🌐 LaCDIA Auto-Translate`);
  console.log(`   Engine: ${opts.engine}`);
  console.log(`   Source: ${SOURCE_LOCALE}`);
  console.log(`   Targets: ${opts.targets.join(", ")}`);
  console.log(`   Overwrite: ${opts.overwrite}`);
  console.log(`   Dry run: ${opts.dryRun}\n`);

  // Load source messages
  const sourcePath = path.join(MESSAGES_DIR, `${SOURCE_LOCALE}.json`);
  const sourceMessages = JSON.parse(fs.readFileSync(sourcePath, "utf-8"));
  const flatSource = flattenObject(sourceMessages);
  const totalKeys = Object.keys(flatSource).length;

  for (const target of opts.targets) {
    console.log(`\n📝 Translating to ${target}...`);
    const targetPath = path.join(MESSAGES_DIR, `${target}.json`);

    // Load existing target if exists
    let existingFlat = {};
    if (fs.existsSync(targetPath)) {
      const existing = JSON.parse(fs.readFileSync(targetPath, "utf-8"));
      existingFlat = flattenObject(existing);
    }

    const resultFlat = { ...existingFlat };
    let translated = 0;
    let skipped = 0;
    let errors = 0;

    for (const [key, value] of Object.entries(flatSource)) {
      // Skip if already translated and not overwriting
      if (!opts.overwrite && existingFlat[key]) {
        skipped++;
        continue;
      }

      try {
        const result = await translate(value, SOURCE_LOCALE, target, opts.engine, opts.apiUrl);
        resultFlat[key] = result;
        translated++;
        process.stdout.write(`   ✓ ${key}\r`);
      } catch (err) {
        console.error(`   ✗ ${key}: ${err.message}`);
        resultFlat[key] = existingFlat[key] || value; // Keep existing or source
        errors++;
      }
    }

    console.log(`   → ${translated} translated, ${skipped} skipped, ${errors} errors (total: ${totalKeys})`);

    if (!opts.dryRun) {
      const result = unflattenObject(resultFlat);
      fs.writeFileSync(targetPath, JSON.stringify(result, null, 2) + "\n", "utf-8");
      console.log(`   💾 Saved: ${targetPath}`);
    }
  }

  console.log(`\n✅ Done!\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});

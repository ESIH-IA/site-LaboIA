# Analyse des écarts pour le site du LaCDIA

Ce document identifie ce qui manque dans le dépôt actuel pour atteindre un site crédible de laboratoire hybride (recherche + business) pour le **Laboratoire Caribéen des sciences de Données et de l'Intelligence Artificielle (LaCDIA)**.

## 1. Constat rapide

- **Front statique unique** : seule la page d’accueil est implémentée, composée de sections héro, événement, KPIs, thématiques, projets vedettes, publications, partenaires et CTA de collaboration. Aucune autre route n’est définie pour les entrées du menu (recherche, projets, publications, équipe, actualités, collaborer, contact).【F:src/app/(site)/page.tsx†L1-L21】【F:src/content/nav.ts†L1-L16】【f38dde†L1-L18】
- **Contenus en dur** : chiffres, cartes projets, mises en avant et publications sont déclarés comme tableaux statiques dans les composants, sans source CMS ou markdown structurée.【F:src/components/home/kpis.tsx†L1-L23】【F:src/components/home/featured-projects.tsx†L1-L42】【F:src/components/home/publications-preview.tsx†L1-L38】
- **Identité non finalisée** : le nom court/long a été aligné sur LaCDIA, mais les assets (bannière 894×160, logo 689×249) n’ont pas de composant dédié ni de validations de dimensions.【F:src/content/site.ts†L1-L6】【F:src/components/home/hero.tsx†L1-L39】【F:docs/remaining-work.md†L1-L33】

## 2. Pages et parcours manquants

- **Pages cœur** : implémenter les pages Recherche, Projets & Réalisations (avec filtres), Publications (PDF/DOI/BibTeX), Actualités & Articles (blog riche), Équipe & Gouvernance, Collaborer (parcours Client/Partenaire/Étudiant), Contact (formulaire avec motifs) et une page Accueil finalisée avec bandeau événements, KPIs dynamiques, carrousel partenaires et bloc newsletter.【F:src/content/nav.ts†L1-L16】【F:src/app/(site)/page.tsx†L1-L21】
- **Pages support obligatoires** : Mentions légales, Politique de confidentialité, Politique cookies, Accessibilité (optionnel) et page Newsletter/gestion d’abonnement à ajouter dans le footer et la navigation.【F:src/content/nav.ts†L11-L16】

## 3. Dimension business et preuves

- **Objets structurés “clients/partenaires/collaborateurs”** : définir des modèles avec logo, secteur, type (académique/industriel), projets liés et témoignages. Les fiches projets doivent afficher clairement “réalisé avec/pour”. Aucun de ces champs n’est présent aujourd’hui dans les composants ou le contenu statique.【F:src/components/home/featured-projects.tsx†L1-L42】【F:src/components/home/partners.tsx†L1-L28】
- **Section démonstrateurs/prototypes** : prévoir une page ou un bloc dédié avec médias/embeds pour prouver l’impact technique (non présent actuellement).【F:src/app/(site)/page.tsx†L1-L21】

## 4. CMS, édition et workflow

- **Choix et intégration d’un CMS headless avec page builder** (Sanity recommandé) pour gérer pages riches, projets, publications, actualités, membres, partenaires/clients et ressources médias. Le code actuel ne prévoit aucune source de données externe ou schéma de contenu.【F:src/components/home/kpis.tsx†L1-L23】【F:src/components/home/highlights.tsx†L1-L27】
- **Workflow de publication** : rôles (admin/éditeur/contributeur) et états brouillon → relecture → publication à implémenter côté CMS. Absence totale dans le dépôt actuel.【f38dde†L1-L18】

## 5. Newsletter et conformité données

- **Bloc newsletter** : ajouter un formulaire d’inscription sur l’accueil et le footer, avec consentement RGPD, double opt-in et segmentation minimale (Actualités, Appels à stages, Événements). Aucun composant ou intégration Brevo/Mailchimp n’est présent.【F:src/app/(site)/page.tsx†L1-L21】【F:src/components/home/footer.tsx†L1-L26】
- **Pages et politiques** : créer la page Newsletter (gestion d’abonnement) et formaliser les politiques de confidentialité/cookies pour les formulaires contact/collaboration et le tracking analytique (non implémentés).【F:src/content/nav.ts†L11-L16】

## 6. SEO, partage et performance

- **Métadonnées complètes par page** : titles, descriptions, OpenGraph/Twitter, favicons, sitemap/robots manquants ; seul le metadata global est défini dans `app/layout.tsx`.【F:src/app/layout.tsx†L1-L24】
- **Analytics & suivi** : intégrer Matomo/GA4 ou équivalent, gestion du consentement cookies, monitoring des conversions (CTA, formulaires). Aucun script ni bannière de consentement n’est présent.【f38dde†L1-L18】
- **Accessibilité/performance** : vérifier contraste, focus, navigation clavier, textes alternatifs systématiques et tests Lighthouse/Web Vitals. Les sections actuelles utilisent des images et CTA sans validations d’accessibilité ni tests automatisés documentés.【F:src/components/home/hero.tsx†L1-L39】【F:docs/remaining-work.md†L17-L35】

## 7. Multilingue et localisation

- **i18n** : le header affiche des codes de langue, mais aucune internationalisation réelle (routes/namespace de traduction) n’existe. Mettre en place la structure FR/EN (et HT/ES en option) avec gestion des slugs/locales et fallback.【F:src/components/layout/header.tsx†L1-L40】

## 8. Identité et assets

- **Composants Banner/Logo** : créer des composants réutilisables imposant les ratios (bannière 894×160, logo 689×249) avec règles de padding et optimisation Next/Image. Aujourd’hui, seule une bannière générique est utilisée sans contrôle de dimensions ni variantes header/footer.【F:src/components/home/hero.tsx†L1-L39】【F:docs/remaining-work.md†L17-L24】

## 9. Intégrations et formulaires

- **Formulaires dynamiques** : implémenter Contact (motif client/partenariat/stage/média), Collaborer (brief projet), et dépôt de stage/mémoire avec stockage sécurisé et notifications. Aucun formulaire n’est présent dans le code actuel.【F:src/app/(site)/page.tsx†L1-L21】【f38dde†L1-L18】
- **Dépôt de ressources** : prévoira pour publications (PDF/DOI/BibTeX), datasets et présentations, ainsi que pages partenaires/clients avec logos et filtres (non existants).【F:src/components/home/publications-preview.tsx†L1-L38】【F:src/components/home/partners.tsx†L1-L28】

## 10. Plan d’action priorisé

1) **Mettre en place Sanity + Next.js** (schemas pages riches, projets, publications, membres, partenaires/clients, actualités, newsletter) et configurer le workflow de publication.
2) **Construire les pages cœur et support** avec les parcours Collaborer/Contact et les formulaires conformes RGPD.
3) **Ajouter la newsletter** (Brevo avec double opt-in) sur Accueil + footer + page dédiée.
4) **Renforcer l’identité** (composants Banner/Logo, assets optimisés) et préparer le multilingue.
5) **Assurer la conformité et la qualité** (SEO/OG, sitemap/robots, analytics + consentement, accessibilité, tests Lighthouse/Web Vitals).

# Ce qui reste à faire

Ce document résume les prochaines étapes pour finaliser le site du LaCDIA.

## 1) Contenus à compléter
- Mettre à jour les textes des sections (projets, publications, équipe, actualités) avec les contenus officiels.
- Renseigner les informations légales et la politique de confidentialité.
- Finaliser les appels à l’action (CTA) et leurs liens vers les pages définitives.

## 2) Visuels & identité
- Valider la bannière principale utilisée dans `src/content/home.ts` (`hero.bannerSrc`).
  - Les bannières disponibles sont dans `public/banners/`.
  - Pour changer l’image, il suffit de modifier `hero.bannerSrc`.
- Vérifier la cohérence du logo et des icônes sur toutes les pages.

## 3) Données et mise à jour du contenu
- Décider du mode de mise à jour (fichier statique, CMS headless, ou back-office).
- Si CMS : définir le schéma de contenu (projets, publications, événements, membres).
- Mettre en place un pipeline de publication (workflow clair pour les rédacteurs).

## 4) SEO & partage
- Renseigner les métadonnées par page (title, description, Open Graph, Twitter cards).
- Ajouter un favicon et un manifeste si nécessaire.
- Ajouter un plan du site (sitemap) et un fichier robots.

## 5) Accessibilité & qualité
- Vérifier le contraste des couleurs et les tailles de police.
- Ajouter des textes alternatifs sur toutes les images.
- Vérifier la navigation clavier et les états de focus.

## 6) Tests & performance
- Tester l’affichage sur mobile/tablette/desktop.
- Valider les performances (Lighthouse ou Web Vitals).
- Vérifier les pages 404, erreurs et formulaires.

## 7) Intégrations
- Ajouter les analytics (Matomo, GA4, etc.).
- Configurer les formulaires (contact, collaboration, newsletter).

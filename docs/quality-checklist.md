# Phase 4 Quality Checklist

This checklist supports long-term quality and governance without over-engineering.

## Performance and monitoring

- Confirm consent banner blocks analytics before acceptance.
- Review Web Vitals events in Matomo/GA4 after accepting cookies.
- Track large images and ensure `alt` text exists in CMS content.

## Accessibility

- Verify keyboard navigation on header, menus, and forms.
- Ensure focus states are visible on links and buttons.
- Check contrast on key sections (hero, cards, banners).

## Content governance

- Use the `formSubmission` status + history to track requests.
- Review publications/projects quarterly for archiving decisions.
- Add an annual report (`labReport`) entry for each year.

## Backups and archiving

- Export Sanity dataset monthly (JSON export).
- Archive completed projects with a status note.
- Keep a yearly snapshot of KPI values.

## Operational checks

- Run `npm run check:routes` against staging or production.
- Validate `/sitemap.xml` and `/robots.txt` after each release.

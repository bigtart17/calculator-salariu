# Calculator salariu net ↔ brut România 2026

Aplicație Next.js orientată pe SEO, monetizare și performanță pentru piața din România. Proiectul include:

- calculator bidirecțional `gross -> net` și `net -> gross`
- motor fiscal modular în `lib/tax-engine`
- cost total angajator și proiecții anuale
- deduceri personale, profiluri sectoriale și facilitate pentru salariul minim
- URL shareable
- pagini programatice pentru interogări de tip `salariu net pentru X lei brut`
- schema markup, sitemap și robots

## Folder structure

```text
app/
  salariu-net-pentru/[gross]/page.tsx
  globals.css
  layout.tsx
  manifest.ts
  page.tsx
  robots.ts
  sitemap.ts
components/
  faq-section.tsx
  site-header.tsx
  calculator/
    salary-calculator.tsx
    tax-tooltip.tsx
lib/
  content.ts
  seo.ts
  tax-engine/
    calculator.ts
    config.ts
    types.ts
```


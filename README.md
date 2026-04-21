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

## Setup

1. Instalează dependențele:

```bash
npm install
```

2. Rulează local:

```bash
npm run dev
```

3. Deschide:

```text
http://localhost:3000
```

## Optional env vars

```bash
NEXT_PUBLIC_SITE_URL=https://netdinbrut.ro
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_ID=ca-pub-xxxxxxxxxxxxxxxx
```

Fără consimțământ explicit, aplicația pornește Google Consent Mode v2 cu `analytics_storage`, `ad_storage`, `ad_user_data` și `ad_personalization` pe `denied`.

- `NEXT_PUBLIC_GA_ID` activează loader-ul GA4 doar după consimțământ `Analytics`.
- `NEXT_PUBLIC_ADSENSE_ID` activează loader-ul AdSense Auto Ads doar după consimțământ `Marketing`.
- Pentru UE/SEE, configurează și un CMP certificat Google/IAB TCF sau Google Privacy & Messaging în contul AdSense, conform cerințelor Google pentru publisheri.
- Pentru conversii Google Ads custom, folosește helper-ele din `lib/consent/googleAds.ts`; acestea trimit evenimente doar dacă există consimțământ `Marketing`.

## Deployment pe Vercel

1. Creează un nou proiect în Vercel și conectează repository-ul.
2. Setează framework preset `Next.js`.
3. Adaugă variabilele de mediu:
   - `NEXT_PUBLIC_SITE_URL`
   - `NEXT_PUBLIC_GA_ID` dacă vrei GA4 live
   - `NEXT_PUBLIC_ADSENSE_ID` dacă vrei AdSense Auto Ads live
4. Deploy pe production.
5. Configurează domeniul final, de exemplu `netdinbrut.ro`, și setează redirect canonical către HTTPS.

## SEO suggestions

- Publică periodic pagini noi pentru salarii brute populare și pentru verticale precum `salariu minim 2026`, `salariu IT 2026`, `calculator cost angajator`.
- Extinde clusterul cu ghiduri satelit: deducere personală, negocieri salariale, salarii pe industrii și județe.
- Adaugă breadcrumbs și `Article` schema pentru ghidurile editoriale viitoare.
- Construiește internal linking între homepage, paginile programatice și ghidurile fiscale.
- Monitorizează Google Search Console pentru query-uri emergente și extinde conținutul după impresii/click-uri.

## Monetization

- Google AdSense este pregătit pentru Auto Ads, fără sloturi manuale în pagină. Pentru trafic din România/UE, activează în contul Google o soluție CMP certificată Google/IAB TCF, precum Google Privacy & Messaging, înainte să monetizezi cu reclame personalizate.
- CTA-urile din sidebar rămân disponibile pentru lead gen: joburi mai bine plătite, comparații salariale și servicii contabile.
- Feature gating pentru viitor: PDF report, simulări avansate, planificare anuală și scenarii salariale salvate.

## Legal / product note

Calculele sunt estimative și urmăresc o experiență clară și actualizabilă. Pentru state de plată finale sau situații speciale, validează rezultatul cu HR sau contabilitate.
# calculator_salariu

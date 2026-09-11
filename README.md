# Hotzonex website

Marketing site and customer assistant for **Hotzonex** — Wi-Fi hotspot vouchers, home and office internet,
Starlink and MikroTik setup, IT support, and website/software development in Juba, South Sudan.

Live at <https://hotzonex-site.vercel.app>. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables are needed. The site has no database, forms or accounts; customers reach Hotzonex
by WhatsApp, phone and email.

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Development server                                                  |
| `npm run build`     | Rebuilds the knowledge base from the policy PDF, then `next build`  |
| `npm start`         | Serves the production build                                         |
| `npm run knowledge` | Rebuilds only the knowledge base (`src/generated/policy-knowledge.json`) |
| `npm run brand`     | Regenerates the logo files from `img/logo.png`                      |
| `npm run lint`      | ESLint                                                              |
| `npm run typecheck` | TypeScript                                                          |

## The Customer Service Guide is the source of truth

`doc/Hotzonex_policy.pdf` (the Hotzonex Wi-Fi Customer Service Guide) drives everything customers rely on
for accuracy:

- **The assistant** (chat button, bottom-left) answers only from the guide, quoting its wording and naming the
  section it came from. Questions the guide does not cover get a polite referral to the support line.
- **Pricing** shows each office's voucher price list and the guide's notes on pricing.
- **FAQ** shows the guide's questions and answers, followed by the service FAQs in `src/config/site.ts`.
- **Terms of Use** shows the guide's numbered service policies; **Privacy** shows its privacy statement.

`scripts/build-knowledge.mjs` splits the PDF into sections (FAQ answers, policy sections, price lists, callouts)
using its typography, and writes `src/generated/policy-knowledge.json`. Pages and the assistant read that file
through `src/lib/guide.ts`; nothing parses the PDF at request time.

### Updating the guide

1. Replace `doc/Hotzonex_policy.pdf` with the new version, keeping the same file name.
2. Run `npm run knowledge`. It prints a summary such as
   `Knowledge base: 53 chunks (13 info, 9 prices, 8 policy, 23 faq)`. Check the counts look right for the new
   version.
3. Check `/pricing`, `/faq` and `/terms` with `npm run dev`, and ask the assistant a few questions.
4. Commit the PDF **and** `src/generated/policy-knowledge.json`, then push.

The extractor expects the current layout: bold section headings, `Q` before each question, numbered policies and
tables with an all-caps header row. If a redesign breaks that, the build fails with a message rather than
shipping an empty assistant.

The office list in `src/config/site.ts` (names, hours, Wi-Fi networks, starting prices) is copied from the guide
by hand, so update it too if offices, hours or networks change.

## Editing other content

| Content                                   | File                    |
| ----------------------------------------- | ----------------------- |
| Contact details, offices, services, quote types, service FAQs | `src/config/site.ts` |
| Blog posts                                | `src/config/content.ts` |
| Assistant vocabulary (synonyms, routing)  | `src/lib/assistant.ts`  |

### Logo

`img/logo.png` is the original artwork (1024px, 1.8 MB). `npm run brand` crops it to the badge and writes the
small copies the site actually loads: `public/brand/hotzonex-logo.png` (header, footer, assistant),
`public/brand/hotzonex-logo-512.png` (social preview card and search engines), and the browser and home-screen
icons `src/app/icon.png`, `src/app/apple-icon.png` and `src/app/favicon.ico`. To change the logo, replace
`img/logo.png` (a transparent background works best), run `npm run brand`, and commit the results.

### Photos

Images are loaded from Unsplash through a custom `next/image` loader (`src/lib/image-loader.ts`), which serves a
size matched to each screen without using Vercel's image optimisation quota.

## Deployment

The Vercel project `hotzonex-site` deploys automatically on every push to `master`, running `npm run build`.
Security headers and the redirect from the retired `/locations/jebel-iraq` URL are set in `next.config.ts`;
`/sitemap.xml`, `/robots.txt` and the social preview image are generated from `src/app/`.

`supabase/schema.sql` is not used by the site today. It is kept as a starting point for a future admin area.

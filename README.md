# Hotzonex website

Marketing site and customer assistant for **Hotzonex** — Wi-Fi hotspot vouchers, home and office internet,
Starlink and MikroTik setup, IT support, and website/software development in Juba, South Sudan.

Live at <https://hotzonex.dev>. Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS 4.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

No environment variables are needed to run the site itself. The site has no database, forms or accounts;
customers reach Hotzonex by WhatsApp, phone and email. The WhatsApp *assistant* (see below) is optional and
needs its own credentials.

| Script              | What it does                                                        |
| ------------------- | ------------------------------------------------------------------- |
| `npm run dev`       | Development server                                                  |
| `npm run build`     | Rebuilds the knowledge base from the policy PDF, then `next build`  |
| `npm start`         | Serves the production build                                         |
| `npm run knowledge` | Rebuilds only the knowledge base (`src/generated/policy-knowledge.json`) |
| `npm run brand`     | Regenerates the logo files and office photo crops from `img/`       |
| `npm run lint`      | ESLint                                                              |
| `npm run typecheck` | TypeScript                                                          |

## The Customer Service Guide is the source of truth

`doc/Hotzonex_policy.pdf` (the Hotzonex Wi-Fi Customer Service Guide) drives everything customers rely on
for accuracy:

- **The assistant** (chat button, bottom-left, and WhatsApp — see below) answers only from the guide, quoting its
  wording and naming the section it came from. Questions the guide does not cover get a polite referral to the
  support line.
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

## WhatsApp assistant

Customers can message the Hotzonex WhatsApp number and get the same guide-only answers as the chat widget,
automatically. This runs on Meta's WhatsApp Cloud API (no third-party bot platform, no extra hosting — the
webhook is `/api/whatsapp` on hotzonex.dev) and shares `src/lib/assistant.ts`, so a question gets the same
answer whether it is typed on the site or sent on WhatsApp.

- `src/app/api/whatsapp/route.ts` — the webhook: `GET` handles Meta's verification handshake, `POST` receives
  each incoming message, looks up the answer, and replies.
- `src/lib/whatsapp.ts` — parses webhook payloads, checks Meta's request signature, and sends replies through
  the Cloud API.

### Setup

1. In [Meta for Developers](https://developers.facebook.com/), create an app with the **WhatsApp** product added
   (or use an existing WhatsApp Business Account). Under **WhatsApp → API Setup** you get a temporary access
   token and a **Phone number ID**; for a bot that keeps working, generate a permanent token instead (System
   User → Assets → WhatsApp Accounts → generate token with `whatsapp_business_messaging` permission).
2. Set these in the Vercel project's environment variables (see `.env.example`):
   - `WHATSAPP_ACCESS_TOKEN` — the permanent (or temporary, for testing) access token.
   - `WHATSAPP_PHONE_NUMBER_ID` — from API Setup.
   - `WHATSAPP_VERIFY_TOKEN` — any string you make up; you will enter the same value in step 3.
   - `WHATSAPP_APP_SECRET` — App Dashboard → Settings → Basic → App Secret. Optional but recommended: without
     it, the webhook cannot confirm a request actually came from Meta.
3. In **WhatsApp → Configuration**, set the webhook callback URL to `https://hotzonex.dev/api/whatsapp` and the
   verify token to the same `WHATSAPP_VERIFY_TOKEN` value, then subscribe to the `messages` field.
4. Redeploy so the new environment variables take effect, then message the WhatsApp number to test.

Only text messages get an automatic answer; other message types (images, voice notes, locations, etc.) get a
short reply asking the customer to type their question, or to call the support line directly.

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

Every page photo is a crop of the office photo `img/office.png`. `npm run brand` writes the crops to
`src/assets/office/` (the crop boxes are listed at the top of `scripts/build-brand-assets.mjs`), and
`src/lib/office-images.ts` pairs each with its alt text. Pages pick a crop by name, e.g. `image: "equipment"` for a
service in `src/config/site.ts`. Next.js serves them resized per screen as WebP or AVIF.

## Deployment

The Vercel project `hotzonex-site` deploys automatically on every push to `master`, running `npm run build`.
The site's address is `siteConfig.url` in `src/config/site.ts` (used by the sitemap, robots.txt, share previews and
search-engine data). `www.hotzonex.dev` and the old `hotzonex-site.vercel.app` redirect to `https://hotzonex.dev`.
Those redirects, the security headers and the redirect from the retired `/locations/jebel-iraq` URL are set in
`next.config.ts`;
`/sitemap.xml`, `/robots.txt` and the social preview image are generated from `src/app/`.

`supabase/schema.sql` is not used by the site today. It is kept as a starting point for a future admin area.

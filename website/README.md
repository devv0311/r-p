# rahuljakhar.com — portfolio website

Single-page portfolio for **Rahul Jakhar**, luxury real estate content
creator. Next.js (App Router) + Tailwind CSS 4, statically prerendered,
dark-first editorial design. The design rationale lives in the repo-level
[`docs/`](../docs) folder.

## Getting started

```bash
npm install
npm run dev        # syncs assets, then starts next dev
```

Open <http://localhost:3000>.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Sync assets (predev), start the dev server |
| `npm run build` | Sync assets (prebuild), production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint (flat config, eslint-config-next) |
| `npm run sync-assets` | Mirror `../assets` + `../resume` into `public/` and regenerate `src/generated/assets.ts` |

## How content works

- **Copy & config** — all text, metrics, nav, and socials live in
  [`src/content/site.ts`](src/content/site.ts); projects in
  [`src/content/work.ts`](src/content/work.ts); services in
  [`src/content/services.ts`](src/content/services.ts). All numbers are
  verified (résumé / owner-provided) — never invent metrics.
- **Media** — drop files into the repo-level `assets/` folder (see
  [`../assets/README.md`](../assets/README.md)); `scripts/sync-assets.mjs`
  copies them into `public/assets/` and emits a manifest so resolution is
  pure data (no runtime `fs`). Sections gate themselves on available content.
- **Résumé** — the newest PDF in the repo-level `resume/` folder is served at
  `/Rahul-Jakhar-CV.pdf`.

## Environment

Copy `.env.example` to `.env.local`. Nothing is required to run; without a
Resend API key the contact form logs submissions instead of emailing.

| Variable | Purpose |
|---|---|
| `CONTACT_PROVIDER_API_KEY` | Resend API key for contact-form delivery |
| `CONTACT_TO_EMAIL` | Destination inbox (defaults to the address in `site.ts`) |
| `CONTACT_FROM_EMAIL` | Verified sender (`onboarding@resend.dev` works for testing) |
| `NEXT_PUBLIC_SITE_URL` | Production origin for canonical URLs / OG / sitemap |

## Deploying

Built for Vercel (analytics activate automatically there), but any Node host
that runs `npm run build && npm run start` works. Set `NEXT_PUBLIC_SITE_URL`
to the production origin.

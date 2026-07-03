# Deploying rahuljakhar.com

This site is a **Next.js app** (in [`website/`](website)) with a server runtime
(contact API, dynamic metadata). It needs a Node host — **not** GoDaddy's
web/cPanel hosting. The plan:

> **Deploy to Vercel → connect `rahuljakhar.com` in Vercel → point GoDaddy DNS at Vercel.**
> GoDaddy stays your **registrar**; you only change its DNS records.

The repo is already prepared: initialized at the `brother-portfolio` root,
`.gitignore` set, secrets excluded, an initial commit made on `main`.

Work top to bottom. **Exact A/CNAME/IP values are shown by each dashboard when
you add the domain — if they differ from the examples here, trust the dashboard.**

---

## 1 · Push to GitHub

Create an **empty** repo at <https://github.com/new> — no README, .gitignore, or
license (the repo already has them). Name it e.g. `rahul-jakhar-portfolio`.

Then, from this folder:

```bash
cd /Users/devv/brother-portfolio
git remote add origin https://github.com/<your-username>/rahul-jakhar-portfolio.git
git push -u origin main
```

HTTPS push will prompt for your GitHub username + a **Personal Access Token**
(not your password) — create one at <https://github.com/settings/tokens> with
`repo` scope. (If you use SSH keys, use the `git@github.com:...` URL instead.)

---

## 2 · Import into Vercel

1. Sign in at <https://vercel.com> with your GitHub account.
2. **Add New → Project → Import** your `rahul-jakhar-portfolio` repo.
3. Configure — **one setting is critical**:

   | Setting | Value |
   |---|---|
   | Framework Preset | **Next.js** (auto-detected) |
   | **Root Directory** | **`website`** ← must set this |
   | Build Command | `npm run build` (default) |
   | Install Command | `npm install` (default) |
   | Output Directory | (leave default) |

   > **Why Root Directory = `website`:** the app lives in `website/`, but its
   > build step ([`scripts/sync-assets.mjs`](website/scripts/sync-assets.mjs))
   > reaches up into the repo-level [`assets/`](assets) and [`resume/`](resume)
   > folders. Vercel checks out the **whole** repo and then builds inside
   > `website/`, so `../assets` resolves correctly.

4. Add the **Environment Variables** below (§4) before the first deploy — or add
   them right after and hit **Redeploy**.
5. **Deploy.** You'll get a `*.vercel.app` URL to confirm it works.

Every future `git push` to `main` auto-deploys; pull requests get preview URLs.

---

## 3 · Connect the domain + GoDaddy DNS

### In Vercel
Project → **Settings → Domains** → add **both**:
- `rahuljakhar.com`  (set as **Primary**)
- `www.rahuljakhar.com`  (Vercel auto-redirects it to the apex)

Vercel then shows the **exact DNS records** to create. They're typically:

| Type | Host / Name | Value | Purpose |
|---|---|---|---|
| `A` | `@` | `76.76.21.21` | apex `rahuljakhar.com` |
| `CNAME` | `www` | `cname.vercel-dns.com` | `www.` subdomain |

> GoDaddy can't `CNAME` an apex domain, which is why the root uses an **A
> record**. **Use whatever IP/CNAME Vercel displays** — Vercel occasionally
> changes the apex IP (e.g. `216.198.79.1`), and the dashboard is the source
> of truth.

### In GoDaddy
1. <https://dcc.godaddy.com/control/dnsmanagement> → select `rahuljakhar.com` →
   **DNS**.
2. **Delete GoDaddy's default parked records** first: the existing `A @ →
   (parked IP)` and the default `CNAME www → ...`. Otherwise they conflict.
3. **Add** the two records from the table above (TTL: 600 seconds / "1 hour" is
   fine).
4. Save. Propagation is usually minutes, up to ~1 hour. Vercel's Domains page
   flips each record to a green **Valid Configuration** and issues the HTTPS
   certificate automatically.

> **Keep GoDaddy as your DNS host** (don't switch nameservers) — this preserves
> any existing email/MX records on the domain. (Alternative: switch GoDaddy's
> nameservers to Vercel's for hands-off DNS, but only if this domain has no
> other services attached.)

---

## 4 · Environment variables (Vercel → Settings → Environment Variables)

Add these to the **Production** (and Preview, if you want) environment:

| Variable | Value | Notes |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://rahuljakhar.com` | Canonical URLs, Open Graph, sitemap. **Build-time** — redeploy after changing. |
| `CONTACT_PROVIDER_API_KEY` | `re_...` | Resend API key — see §5. |
| `CONTACT_TO_EMAIL` | `business.jakhar@gmail.com` | Where enquiries land. |
| `CONTACT_FROM_EMAIL` | `Rahul Jakhar <onboarding@resend.dev>` | Sender. Use the shared test address first; switch to your verified domain (§5). |

No code changes are needed for any of these — they're all read from the
environment (see [`website/.env.example`](website/.env.example)).

---

## 5 · Contact-form email (Resend)

The form works today but only **logs** submissions until a key is set. To send
real email:

1. Create a free account at <https://resend.com> (3,000 emails/month free).
2. **API Keys → Create** → copy the `re_...` key → set it as
   `CONTACT_PROVIDER_API_KEY` in Vercel (§4).
3. **Test now:** with just the key set and `CONTACT_FROM_EMAIL` left as
   `onboarding@resend.dev`, the form emails `business.jakhar@gmail.com`
   immediately. (Shared sender — may land in spam; fine for a first test.)
4. **Production sender (recommended):** in Resend → **Domains → Add Domain** →
   `rahuljakhar.com`. Resend gives you DKIM/SPF **TXT** (and a return-path)
   records — add them at GoDaddy DNS alongside the records from §3. Once
   verified, set `CONTACT_FROM_EMAIL` to e.g.
   `Rahul Jakhar <hello@rahuljakhar.com>` and redeploy.

Replies always go to the visitor's address (`reply_to`), so answering an
enquiry is one click regardless of the sender you choose.

---

## 6 · Post-deploy checklist

- [ ] `https://rahuljakhar.com` loads over HTTPS; `www.` redirects to it.
- [ ] Hero showreel plays (or shows its poster on reduced-motion/data).
- [ ] Work films open in the theater with sound.
- [ ] Submit a real test enquiry → it arrives at `business.jakhar@gmail.com`.
- [ ] Share the link in a DM/Slack → the Open Graph preview shows correctly
      (confirms `NEXT_PUBLIC_SITE_URL`).
- [ ] Vercel Analytics is recording visits (already wired in via
      `@vercel/analytics`).

---

## Updating the site later

Edit → commit → push. Vercel rebuilds and redeploys `main` automatically.

- **Copy / projects / links:** [`website/src/content/`](website/src/content)
- **Media:** drop correctly named files into [`assets/`](assets) (see
  [`assets/README.md`](assets/README.md)) and commit — they appear on the next
  deploy. Poster stills use the work IDs, e.g.
  `assets/images/work/the-select-premia.jpg` and `assets/images/hero.jpg`.
- **Résumé:** drop a new PDF into [`resume/`](resume); the newest one is served
  at `/Rahul-Jakhar-CV.pdf`.

# Rahul Jakhar — portfolio

Portfolio project for **Rahul Jakhar** (“Realty by Rahul”), luxury real
estate content creator. The site is a single-page, dark-first editorial
portfolio built to land in-house roles with premium developers (next market:
Dubai).

## Repository layout

| Folder | What it is |
|---|---|
| [`website/`](website) | The Next.js site — see its [README](website/README.md) for setup |
| [`docs/`](docs) | Design & strategy documents (brief, design system, IA, motion, tech architecture, roadmap) |
| [`assets/`](assets) | Source-of-truth media (photos, films, logos) — synced into the site at build time, see its [README](assets/README.md) |
| [`resume/`](resume) | CV PDFs — the newest one is served by the site at `/Rahul-Jakhar-CV.pdf` |
| [`brand/`](brand) | Brand master files (logo originals) |

## Quick start

```bash
cd website
npm install
npm run dev
```

## Ground rules

- Every metric and claim on the site is **verified** (résumé / owner-provided).
  Never add numbers without a source.
- Copy lives in code: [`website/src/content/`](website/src/content) is the
  single place to edit text, projects, and links.
- Media is convention-based: drop correctly named files into `assets/` and
  they appear on the site; nothing breaks when they're absent.

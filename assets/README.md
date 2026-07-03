# Assets

This folder is the **single source of truth** for real photography, video and
logos on the site. `website/scripts/sync-assets.mjs` (run automatically before
`dev` and `build`) copies it into `website/public/assets`, so any file here is
served at `/assets/<path>` (and images are optimized by next/image).

Resolution is **convention-based**: drop a file with the expected name and it
appears automatically. Until a file exists, the site falls back to its graded
placeholder — nothing breaks.

> After adding or removing files, re-run `npm run dev` or `npm run build` in
> `website/` (the sync + manifest happen at that point, and the home page is
> statically prerendered).

## Where things go

| What | Drop it here | Notes |
|------|--------------|-------|
| **Hero showreel** | `videos/hero.mp4` (`.webm`/`.mov` ok) | Muted ambient loop. Add `images/hero.jpg` as its poster / reduced-motion still. |
| **Portrait** | `images/portrait.jpg` | Any image ext. Reintroduces the portrait column in About. |
| **Logo mark** | `images/logo.png` (`.svg`/`.webp` ok) | Masthead brand mark next to the wordmark. |
| **Work still** | `images/work/<id>.jpg` | `<id>` = the work item id (see below). Used as the film poster. |
| **Work film** | `videos/work/<id>.mp4` | Adds a real, playable player to that entry. |
| **Brand logos** | `logos/*.svg` | Every image in `logos/` renders in the “Worked with” wall (which also un-hides the Trust section). |

**Accepted extensions** — images: `avif webp jpg jpeg png` · video: `mp4 webm mov m4v` · logos: `svg webp png jpg`.

## Work item ids

Match the filename to the id (from `website/src/content/work.ts`):

- `the-select-premia` — The Select Premia (Adore Developers)
- `jasmine-farms` — Jasmine Farms (Zack Developers)
- `ivory-arches` — Ivory Arches (Zack Developers)
- `the-edition` — The Edition (Smartworld)

Example: `images/work/the-edition.jpg` + `videos/work/the-edition.mp4`.

## Notes

- Keep videos web-optimized (H.264/AAC MP4, ~1080p, faststart) — they are
  served as-is, not transcoded.
- Images are optimized automatically (AVIF/WebP, responsive sizes).
- The downloadable CV comes from the repo-level `resume/` folder (newest PDF),
  not from here.
- A featured YouTube long-form is configured separately in
  `website/src/content/site.ts` (`featuredVideo`), not here.

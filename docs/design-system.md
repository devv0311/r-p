# Design System — Rahul Jakhar Portfolio

> Companion to [`creative-direction.md`](creative-direction.md). Translates the chosen direction — **"The Director's Cut" (work-first cinema with editorial restraint)** — into concrete, implementable design tokens, plus a complete component inventory. Values are specified as design intent; exact tooling (CSS variables, Tailwind config, etc.) is finalized at implementation per [`technical-architecture.md`](technical-architecture.md).
>
> Naming convention is tool-agnostic (semantic tokens). All tokens assume a **dark-first** system; there is no light mode in v1.

---

## 1. Design principles (the rules every token serves)

1. **The work is the brightest thing on screen.** UI recedes; footage advances.
2. **One accent, used as signal.** Gold marks the active, the important, the single moment — never decoration.
3. **Restraint over ornament.** Flat surfaces, hairline rules, generous negative space. No skill bars, progress circles, or gratuitous shadows (brief Design Constraints).
4. **Type is cinematic and sparse.** Few words, set with precision.
5. **Every value is a token.** Nothing hard-coded; the system is the single source of styling truth and is built to extend (future platform).

---

## 2. Typography system

### Typefaces
| Role | Style | Intent | Candidate faces (finalize at impl.) |
|------|-------|--------|--------------------------------------|
| **Display** | Neo-grotesk, tight | Cinematic headlines, section titles, wordmark | Suisse Int'l / Neue Haas Grotesk / ABC Diatype / (free: Geist, Inter Display) |
| **Text** | Humanist sans | Sparse body, captions, UI | Same family or a quiet companion (e.g. Inter / Geist) |
| **Numeric** | Tabular figures | Metrics, indices (01, 02), counts | Display family with `font-feature-settings: "tnum"` |

> A two-face maximum (display + text), or a single superfamily used across weights, keeps the system disciplined and the bundle light. **Variable fonts** preferred for weight range at minimal payload.
>
> **Licensing is an M1 decision:** premium faces (Suisse, Neue Haas) carry web-license cost; free faces (Geist, Inter) do not. Confirm commercial web-license scope/cost before committing, or default to a high-quality free variable face to avoid licensing risk.

### Type scale (fluid, `clamp()`-based)
Major-third-ish scale, responsive between mobile and desktop.

| Token | Use | Mobile → Desktop | Weight | Tracking | Line-height |
|-------|-----|------------------|--------|----------|-------------|
| `display-xl` | Hero positioning line | 2.25rem → 4.5rem | 500 | -0.02em | 1.05 |
| `display-lg` | Section titles | 1.875rem → 3.25rem | 500 | -0.015em | 1.1 |
| `display-md` | Subsection / case title | 1.5rem → 2.25rem | 500 | -0.01em | 1.15 |
| `metric` | Big numbers (88K) | 2.5rem → 4rem | 600 | -0.02em | 1.0 |
| `title-sm` | Card titles, labels | 1.125rem → 1.25rem | 500 | 0 | 1.3 |
| `body` | Body / captions | 1rem → 1.0625rem | 400 | 0 | 1.6 |
| `caption` | Meta, figure labels | 0.8125rem → 0.875rem | 400 | 0.01em | 1.5 |
| `overline` | Eyebrows, nav, categories | 0.75rem | 500 | 0.12em (UPPERCASE) | 1.4 |

### Usage rules
- **Headlines** often set in **UPPERCASE** with tight tracking for the cinematic title-card feel — used sparingly (hero, section titles).
- **Body copy is short by mandate** — max ~3 lines per block; no long paragraphs.
- **Numerals always tabular** so metrics align and count-up animations don't reflow.
- Maximum **2 type sizes visible per viewport** in any non-hero section (enforces hierarchy/restraint).

---

## 3. Color system

Dark-first, three-color discipline: **black canvas, off-white ink, single gold accent.**

### Core tokens
| Token | Value (intent) | Use |
|-------|----------------|-----|
| `bg/base` | `#0A0A0A` | Page canvas (true near-black) |
| `bg/raised` | `#121212` | Cards, panels, raised surfaces |
| `bg/overlay` | `#0A0A0A` @ 88% | Case-detail/scrim backdrop |
| `ink/primary` | `#F4F2ED` | Primary text (warm off-white, not pure white) |
| `ink/secondary` | `#A8A6A0` | Secondary text, captions |
| `ink/tertiary` | `#6E6C68` | **Non-essential meta only** (~3:1 — never body/interactive text; AA-restricted) |
| `line/hairline` | `#FFFFFF` @ 10% | Dividers, borders |
| `line/strong` | `#FFFFFF` @ 24% | Emphasized rules, focus outlines |
| `accent/gold` | `#C9A24B` | Non-text accent only — hairlines, rules, markers, icon-active, one signal per scene |
| `accent/gold-text` | `#E0BC6A` (lightened) | **Gold when applied to small/active text** (e.g. active nav label) — meets AA on `bg/base` |
| `accent/gold-muted` | `#C9A24B` @ 40% | Hover-pre-state, subtle gold |
| `state/success` | `#7FB069` | Form success only |
| `state/error` | `#D4654E` | Form error only |

### Color rules
- **Off-white, not pure white** (`#F4F2ED`) — warmer, more premium, less harsh against true black; pairs with the warm film grade.
- **Gold appears at most once or twice per viewport.** It is a signal (the active filter, the CTA hairline, a single rule), never a fill or background.
- **Gold contrast rule:** `accent/gold` is for **non-text** use (hairlines, markers, icons). Whenever gold colors **text** (e.g. the active nav label), use `accent/gold-text` (#E0BC6A) which clears AA on `bg/base`. Never set small body text in `accent/gold`.
- **Footage carries the color.** UI stays monochrome so graded video provides all the warmth and saturation.
- **Contrast:** `ink/primary` on `bg/base` ≈ 15:1 (far above AA); `ink/secondary` meets AA for body; gold is used for non-text-critical accents or large/bold text only (it does not need to carry small body text).

### Film grade & texture
- A subtle **film-grain overlay** (low opacity, animated noise or static texture) unifies media and UI into one cinematic surface. Disabled under `prefers-reduced-motion` if animated.
- Media gets a consistent **warm-shadow grade** (LUT-like treatment) so disparate clips feel like one body of work.

---

## 4. Spacing scale

Base unit **4px**, 8px rhythm. Tokens (rem):

| Token | px | Use |
|-------|----|----|
| `space/2xs` | 4 | Icon gaps, tight inline |
| `space/xs` | 8 | Within components |
| `space/sm` | 12 | Compact stacks |
| `space/md` | 16 | Default element gap |
| `space/lg` | 24 | Group separation |
| `space/xl` | 40 | Within-section blocks |
| `space/2xl` | 64 | Sub-section spacing |
| `space/3xl` | 96 | Section padding (mobile) |
| `space/4xl` | 160 | **Section padding (desktop)** — generous, editorial air |
| `space/5xl` | 240 | Hero / dramatic breathing room |

**Rule:** generous vertical rhythm between sections (`4xl`/`5xl`) is a primary carrier of the "premium" feel. Whitespace is a feature, not emptiness.

---

## 5. Grid

| Property | Mobile (<768) | Tablet (768–1023) | Desktop (≥1024) |
|----------|---------------|-------------------|------------------|
| Columns | 4 | 8 | **12** |
| Gutter | 16px | 20px | 24px |
| Margin | 20px | 40px | clamp(40px, 6vw, 120px) |
| Max content width | — | — | 1440px (media may go full-bleed beyond) |

- **Editorial asymmetry:** the 12-col grid is used to place elements *off-center* deliberately (e.g. work cards spanning 7 / 5 / 8 columns), not as uniform rows. This is what separates it from generic card grids.
- **Full-bleed exception:** hero video, featured media, and select stills break the max-width and run edge-to-edge.
- A baseline grid / consistent vertical rhythm governs type alignment.

---

## 6. Border radius

| Token | Value | Use |
|-------|-------|-----|
| `radius/none` | 0 | Default — sharp, architectural, premium |
| `radius/sm` | 2px | Inputs, small controls (barely-there) |
| `radius/md` | 4px | Cards, media containers, buttons |
| `radius/pill` | 999px | Filter chips, tags only |

**Rule:** **Minimal rounding.** Sharp/near-sharp corners read as architectural and luxury; heavy rounding reads as consumer-app/template. Media and most surfaces use `none`–`md`.

---

## 7. Shadows & elevation

Dark UIs get depth from **light, not drop-shadow**. Shadows are mostly avoided.

| Token | Value (intent) | Use |
|-------|----------------|-----|
| `elev/flat` | none | Default — surfaces differentiated by `bg/raised` + hairlines |
| `elev/media` | soft ambient glow / 0 8px 40px rgba(0,0,0,.6) | Lift video/media off the canvas subtly |
| `elev/overlay` | 0 24px 80px rgba(0,0,0,.7) | Case-detail panel / drawer |
| `glow/gold` | 0 0 24px rgba(201,162,75,.25) | Rare — focus on a key media moment or active CTA |

**Rule:** elevation comes from background tone steps and hairlines first; shadow/glow used intentionally and rarely on media and overlays only. No default card shadows (avoids the generic look).

---

## 8. Iconography

- **Style:** thin line (1.25–1.5px stroke), minimal, geometric, monochrome (`ink/secondary`, gold only when active).
- **Set:** a small **custom/curated** set — only what's needed: arrow (CTA/scroll), play/pause, mute/unmute, close (✕), hamburger, external-link, social glyphs (IG, YouTube), chevrons (prev/next).
- **Sizing:** 16 / 20 / 24px on a 24px grid; align to text baseline.
- **No icon zoo.** Icons are functional wayfinding, never decorative filler. Prefer a typographic or hairline solution over adding an icon.

---

## 9. Imagery & media

- **Real assets only — never stock** (brief Design Constraint). Every image/video is Rahul's own work or his portrait.
- **Film grade:** a unifying warm-shadow LUT across all media for one cohesive body of work.
- **Aspect-ratio system:** `21:9` (cinematic hero/letterbox), `16:9` (films/long-form), `4:5` & `9:16` (Reels/vertical, portrait), `3:2` (stills/portrait photo). Containers enforce ratios to prevent layout shift.
- **Poster frames:** every video has a graded poster still (instant render, zero-CLS, mobile data-saver fallback).
- **Treatment:** subtle grain overlay; gentle vignette permissible on hero; no heavy filters that fight the footage.
- **Loading:** blur-up / dominant-color placeholder → graded poster → stream. Below-fold media lazy-loads.

---

## 10. Component philosophy

- **Bespoke, not borrowed.** No off-the-shelf UI kit (shadcn/MUI/Bootstrap look). Components are custom-built to this system so nothing reads as a template (brief: avoid generic patterns).
- **Composition over configuration.** Small primitives (Container, Stack, MediaFrame, Text) compose into sections; sections compose into the page.
- **State is explicit.** Every interactive component defines idle/hover/focus/active/disabled and a `prefers-reduced-motion` variant (detailed in [`interaction-and-motion.md`](interaction-and-motion.md)).
- **Content-slot driven.** Components accept content via typed slots so the future CMS migration and the modular (hidden-until-provided) sections work without refactors.
- **Accessibility built-in.** Semantic elements, visible focus (`line/strong` or `accent/gold`), keyboard operability, captions/controls on video.

---

## 11. Component inventory

Complete parts list for implementation. **Variants** = visual/structural options; **States** = interaction states; **Slots** = content inputs.

### Primitives / layout
| Component | Purpose | Variants | States | Slots |
|-----------|---------|----------|--------|-------|
| `Container` | Max-width + responsive margins | default, full-bleed, narrow | — | children |
| `Section` | Section wrapper w/ vertical rhythm + anchor id | default, modular(hideable) | in-view / out-of-view | id, children |
| `Stack` / `Grid` | Layout primitives (flex/grid) | row, column, 12-col | — | gap, children |
| `Text` | Typographic primitive | display-xl…overline (per scale) | — | as, content |
| `MediaFrame` | Aspect-ratio media container | 21:9, 16:9, 4:5, 9:16, 3:2 | loading, poster, playing, paused | poster, src, caption |

### Global / shell
| Component | Purpose | Variants | States | Slots |
|-----------|---------|----------|--------|-------|
| `Header` | Persistent top bar | transparent(over hero), solid(on scroll) | at-top, scrolled, hidden(scroll-down) | wordmark, nav, cta |
| `Wordmark` | Logotype / monogram | full, monogram(RJ) | static (simple fade only) | — |
| `NavAnchors` | In-page anchor links | desktop-inline, mobile-drawer | default, active(current section), hover | items[] |
| `NavDrawer` | Mobile menu overlay | — | open, closed | items, cta, socials |
| `PersistentCTA` | Always-available "Get in touch" | header-button, floating(mobile) | idle, hover, focus | label, target |
| `Footer` | Closing block | — | — | wordmark, socials(incl. LinkedIn), résumé, legal |
| `Loader` | Minimal first-paint bridge (**≤500ms**, opacity-only, first-visit only) — **no intro sequence**; may be omitted entirely | first-visit-only | loading, revealing | wordmark |
| `GrainOverlay` | Film-grain texture layer | static, animated | (off if reduced-motion) | — |

### Section components
| Component | Purpose | Variants | States | Slots |
|-----------|---------|----------|--------|-------|
| `Hero` | Showreel-first landing | — | loading, playing, muted/unmuted | reel, posterFrame, headline, **proofLine** (e.g. "88K subs · 10M+ views"), cta, scrollCue |
| `WorkGallery` | Curated work grid | asymmetric(desktop), single-col(mobile) | filtering, filtered | items[], categories[] |
| `WorkCard` | Single work entry | large, standard, vertical(reel) | idle, hover(preview-plays), focus | poster, previewSrc, title, category |
| `CategoryFilter` | Filter chips | — | active, inactive, hover | categories[] |
| `CaseDetail` | Expanded work view (overlay) | slide-over(desktop), fullscreen(mobile) | open, closing, prev/next | film, title, role, brief, approach |
| `ImpactBand` | Audience metrics | — | pre-animate, counting, settled | metrics[] (value, label) |
| `MetricCounter` | Single count-up number | — | idle, counting, done | value, suffix, label |
| `Services` | Capabilities list | numbered-list(desktop), accordion(mobile) | idle, row-hover/expanded | items[] (title, valueLine) |
| `About` | Story + portrait | — | in-view reveal | portrait, story, **availabilityNote** (relocation/availability), résuméLink |
| `FeaturedVideo` | Long-form YouTube | facade → embed | facade, loaded | posterFrame, youtubeId, title, note |
| `TrustWall` | Logos + testimonials (modular) | logos-only, with-quotes, hidden | — | logos[], testimonials[] |
| `ContactSection` | Conversion block | — | (hosts ContactForm) | invitation, **linkedinLink** (co-primary), instagramLink |

### Interactive controls
| Component | Purpose | Variants | States | Slots |
|-----------|---------|----------|--------|-------|
| `ContactForm` | Primary conversion | — | idle, typing, validating, submitting, success, error | fields(name, company, email, message) |
| `FormField` | Labeled input | text, email, textarea | idle, focus, valid, invalid | label, value, error |
| `Button` | Action | primary(filled/hairline), ghost, icon | idle, hover, focus, active, loading, disabled | label, icon, target |
| `VideoControls` | Reel/film controls | minimal | playing, paused, muted | play, mute, progress |
| `SocialLink` | LinkedIn / IG / YouTube / email | inline, footer | idle, hover | platform, href |
| `ScrollCue` | "scroll" affordance | — | visible, hidden(after scroll) | — |
| `ResumeLink` | Résumé/one-pager download | button, text | idle, hover | href |

### Utility / behavioral (non-visual)
| Component | Purpose |
|-----------|---------|
| `SmoothScrollProvider` | Wraps app for smooth-scroll + anchor handling |
| `Reveal` | Scroll-into-view entrance wrapper (opacity/transform; reduced-motion = instant) |
| `SEO` / `Meta` | Per-section metadata, Open Graph, structured data |
| `MotionGuard` | Reads `prefers-reduced-motion`/`prefers-reduced-data` and switches variants |

---

## 12. Tokens summary (quick reference)

```
COLOR    bg/base #0A0A0A · bg/raised #121212 · ink/primary #F4F2ED
         ink/secondary #A8A6A0 · line/hairline #FFF@10% · accent/gold #C9A24B
TYPE     display(neo-grotesk) + text(humanist) · tabular numerals · UPPERCASE titles
SCALE    4px base · sections 96px(m)/160px(d) · whitespace as a feature
GRID     4/8/12 cols · editorial asymmetry · full-bleed media exception
RADIUS   0–4px (sharp = premium)
ELEV     flat default · light/glow on media+overlays only
ICON     thin-line, minimal, custom, functional-only
MEDIA    real assets only · warm film grade · poster frames · ratio system
PARTS    bespoke components · explicit states · reduced-motion variants
```

---

*Next: [`technical-architecture.md`](technical-architecture.md) defines the capabilities and stack that bring this system to life; [`interaction-and-motion.md`](interaction-and-motion.md) specifies how these components behave and animate.*

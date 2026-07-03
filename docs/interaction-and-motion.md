# Interaction & Motion — Rahul Jakhar Portfolio

> Companion to [`design-system.md`](design-system.md) and [`information-architecture.md`](information-architecture.md). The **behavioral blueprint** so implementation needs no guesswork: an **interaction map** (every interactive element and its behavior) and an **animation timeline** (choreographed, time-stamped sequences with easing, duration, triggers, and reduced-motion fallbacks).
>
> Governing rule from the brief: **motion serves the work and the message — never spectacle.** Every animation below earns its place against the 15-second test, and every one has a `prefers-reduced-motion` fallback.

---

## 1. Motion principles & global tokens

### Principles
1. **Cinematic, not bouncy.** Easing is filmic — confident ease-outs, no playful overshoot.
2. **Purposeful.** Motion directs attention, communicates state, or reveals the work. If it does none of these, it's cut.
3. **Fast in, calm out.** Entrances are decisive (200–700ms); ambient motion is slow and quiet.
4. **The footage is the star.** UI motion stays subordinate to video.
5. **Always escapable.** `prefers-reduced-motion` and `prefers-reduced-data` are first-class paths, not afterthoughts.

### Motion tokens
| Token | Value | Use |
|-------|-------|-----|
| `ease/standard` | `cubic-bezier(0.4, 0, 0.2, 1)` | Most UI transitions |
| `ease/entrance` | `cubic-bezier(0.16, 1, 0.3, 1)` (expo-out) | Reveals, cinematic entrances |
| `ease/exit` | `cubic-bezier(0.4, 0, 1, 1)` | Dismissals |
| `dur/instant` | 120ms | Hover/focus feedback |
| `dur/fast` | 240ms | Buttons, small state changes |
| `dur/base` | 400ms | Standard transitions |
| `dur/slow` | 700ms | Section reveals, panel open |
| `dur/cinematic` | 1200ms | Loader, hero entrance |
| `stagger/base` | 80ms | Between staggered items |
| `scroll/smooth` | lerp ~0.1, ~1.0s catch-up | Smooth-scroll feel |

---

## 2. Interaction map

Every interactive element, its trigger, behavior, and states. Keyboard + reduced-motion noted where relevant.

### 2.1 Navigation
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Anchor nav link | click / Enter | Smooth-scroll to section; URL hash updates | idle · hover (gold underline grows) · **active** (current section, gold) · focus (visible ring) |
| Active-section tracking | scroll | Scroll-spy highlights the nav item for the section in view | — |
| Header on scroll | scroll direction | Transparent over hero → solid `bg/base` after hero; **hides on scroll-down, reveals on scroll-up** | at-top · scrolled · hidden |
| Mobile hamburger | tap | Opens `NavDrawer` (full-screen overlay, links stagger in) | closed · open |
| Nav drawer link | tap | Closes drawer, smooth-scrolls to target | — |
| Skip-to-content | Tab (first focus) | Keyboard users jump past nav | visually-hidden until focus |

### 2.2 Hero
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Showreel | autoplay (muted) on load | Loops; optimized video (vendor-agnostic); poster bridges first frame | loading · playing · paused (tab blur) |
| Proof-line | static | "88K subs · 10M+ views" (or confirmed metrics) sits under the positioning line — answers *why hire* in-viewport | — |
| Unmute control | click/Enter | Toggles audio; icon swaps | muted · unmuted |
| Primary CTA "Get in touch" | click | Smooth-scroll to `#contact` | idle · hover · focus · active |
| Scroll cue (⌄) | scroll | Fades out after first scroll | visible · hidden |
| Reduced-data | media query | No autoplay → poster + tap-to-play button | — |

### 2.3 Selected Work
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Category filter chip | click | Filters grid; items animate out/in (FLIP); active chip gold | active · inactive · hover · focus |
| Work card | hover (pointer) | Muted preview clip plays in-card; title/category fade up | idle · hover(preview) · focus |
| Work card | tap (touch) | No hover preview; tap opens `CaseDetail` directly | idle · pressed |
| Work card | click/Enter | Opens `CaseDetail` for that piece | — |
| Play affordance | hover/focus | A small "▶ View" label/icon fades in on the card (no custom cursor) | hidden · shown |

### 2.4 Case detail (overlay)
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Panel | card click | Slide-over (desktop) / full-screen (mobile); page scrim dims; body scroll locks | opening · open · closing |
| Film player | on open | Adaptive stream w/ minimal controls; poster first | loading · playing · paused |
| Prev / Next | click / ← → keys | Swap to adjacent piece (cross-fade) | — |
| Close | ✕ / Esc / scrim click / swipe-down (mobile) | Dismiss, restore scroll + focus to originating card | — |
| Focus trap | open | Focus contained within panel; returns on close | — |

### 2.5 Impact band
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Metric counters | scroll into view (once) | Count up from 0 to value; tabular numerals prevent reflow | pre · counting · settled |
| Reduced-motion | media query | Numbers render final value immediately (no count) | — |

### 2.6 Services
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Service row (desktop) | hover | Row's one-line value statement reveals; index/gold marker animates | idle · hover |
| Service row (mobile) | tap | Accordion expands the value line | collapsed · expanded |
| Keyboard | Tab/Enter | Each row focusable; Enter toggles the value line | focus |

### 2.7 Featured long-form
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| YouTube facade | click | Replaces poster with real embed and plays (no iframe until then) | facade · loaded |

### 2.8 Contact form
| Element | Trigger | Behavior | States |
|---------|---------|----------|--------|
| Field | focus / input | Label/border animate to focus (gold); inline validation on blur | idle · focus · valid · invalid |
| Submit | click/Enter | Validates → button enters loading → POST → success or error | idle · submitting · success · error |
| Success | server OK | Form replaced by a confirming message + LinkedIn/Instagram fallback | — |
| Error | server/validation fail | Inline errors; non-destructive (entries preserved) | — |
| Honeypot/bot token | submit | Hidden check + token verified server-side | — |
| LinkedIn link (co-primary) | click | Opens LinkedIn profile (new tab, `rel=noopener noreferrer`) — the hiring channel | idle · hover |
| Instagram link (secondary) | click | Opens @realtybyrahul (new tab, `rel=noopener noreferrer`) | idle · hover |

### 2.9 Global
| Element | Behavior |
|---------|----------|
| Smooth scroll | App-wide; respects anchor links; disabled under reduced-motion (native scroll). Native cursor throughout — **no custom cursor.** |
| Grain overlay | Subtle, fixed, **static** (not animated) |
| Focus management | Every interactive element has a visible focus state (`accent/gold` / `line/strong`); logical tab order |
| Keyboard | All flows operable: nav, filters, cards, case-detail (Esc/arrows), form |

---

## 3. Animation timeline

Time-stamped sequences. `t` = milliseconds from trigger. Each ends with its reduced-motion fallback.

### 3.1 First paint → Hero (trigger: page load)
**No intro spectacle.** The optional loader is a minimal opacity bridge only (**≤500ms, first visit**), or omitted entirely — the hero must not be gated behind animation.
```
t=0      Hero renders immediately: poster frame paints (LCP element); reel decodes.
t=0–500  Optional: a ≤500ms opacity fade from bg/base into the hero (first visit
         only, session-flagged). If omitted, hero is simply present at t=0.
t=~200   Positioning line + proof-line are present (no entrance gating); a gentle
         opacity fade (≤300ms) is permitted but never blocks readability.
t=~200   Primary CTA, unmute, scroll cue visible immediately.
DONE     Hero readable/actionable in well under 1s. Proof of craft + the why-hire
         proof-line + CTA all in the first viewport (15-second test).
```
**Reduced-motion / repeat visits:** no fade — hero is present instantly.

### 3.2 Header behavior (trigger: scroll)
```
Scroll past hero (≈80vh): header background fades transparent→solid (240ms).
Scroll DOWN > 8px:  header translateY(-100%) hide (dur/fast, ease/exit).
Scroll UP   > 8px:  header translateY(0) reveal (dur/fast, ease/standard).
Nav active item: gold underline width 0→100% (dur/fast) as section enters.
```
**Reduced-motion:** instant show/hide and background swap (no transform tween).

### 3.3 Hero → Work transition (trigger: scroll out of hero)
```
Simple, native scroll. Selected Work reveals via the standard section-reveal
(3.4) as it enters. No scroll-scrubbed "film cut," no pinning, no scale —
that motion was cut as non-essential to hiring conversion (CSS/IO only).
```
**Reduced-motion:** identical (already minimal) — sections simply stack.

### 3.4 Section reveal (trigger: section enters viewport, once)
```
t=0    Section title: opacity 0→1, translateY 24px→0 (dur/slow, ease/entrance).
t=120  Body/supporting element follows (same, offset by stagger).
t=200+ Child items (cards, rows) stagger in at 80ms intervals.
Trigger point: when section top reaches ~85% of viewport height.
```
**Reduced-motion:** opacity-only fade (200ms) or instant; no translate.

### 3.5 Work gallery stagger + filter (triggers: reveal / filter click)
```
Reveal:  cards fade+rise in document order, stagger 80ms.
Filter:  FLIP technique — measure positions, hide non-matching (scale 0.96 +
         fade, dur/fast), then matching cards animate to new positions
         (transform, dur/base, ease/standard). No layout jump.
Hover:   in-card preview clip cross-fades over poster (200ms); title/category
         translateY 8px→0 + fade.
```
**Reduced-motion:** filtering is instant (show/hide); no FLIP; hover shows poster→preview swap without movement (or static poster only under reduced-data).

### 3.6 Case-detail open/close (trigger: card click / dismiss)
```
Open:   scrim fades in (bg/overlay, 240ms). Panel slides from right (desktop,
        translateX 100%→0, dur/slow, ease/entrance) / up from bottom (mobile).
        Body scroll locks; focus moves into panel.
        Film poster shows immediately; stream begins.
Prev/Next: current film cross-fades to next (240ms); metadata swaps.
Close:  reverse (ease/exit, dur/base); scroll unlocks; focus returns to card.
```
**Reduced-motion:** scrim + panel fade only (no slide); 200ms.

### 3.7 Metric count-up (trigger: impact band in view, once)
```
t=0    Each number counts 0 → target over 1200ms (ease/standard), tabular
       figures so width never shifts. Gold marker/underline draws under the
       set as counts complete.
```
**Reduced-motion:** final values shown instantly; no count, no draw.

### 3.8 Services reveal (trigger: hover/focus or tap)
```
Desktop hover: row's value line slides+fades in from left (200ms); index digit
               shifts to gold. Other rows dim slightly to focus attention.
Mobile tap:    accordion height 0→auto (dur/base, ease/standard); chevron rotates.
```
**Reduced-motion:** value line toggles visibility instantly; no slide/rotate.

### 3.9 Form states (trigger: submit)
```
Submitting: button label → spinner (cross-fade 160ms); inputs disabled.
Success:    form fields fade/collapse; confirmation message fades up (dur/slow);
            subtle gold check draws in.
Error:      invalid fields' borders shift to state/error; a brief 6px shake
            (1 cycle, 200ms) draws the eye; message fades in.
```
**Reduced-motion:** no shake, no draw; immediate state text + color change only.

### 3.10 Ambient / micro
```
(No custom cursor — removed. Native cursor throughout.)
Hero reel:       slow, continuous (the footage itself); grain is STATIC.
Button hover:    background/hairline fill 0→100% L→R (dur/fast); arrow nudges 4px.
Scroll cue:      gentle 6px vertical loop until first scroll, then fades.
```
**Reduced-motion / touch:** grain static (always); button = simple color change; scroll cue static then fades.

---

## 4. Reduced-motion & reduced-data summary (one place)

| Concern | Full experience | `prefers-reduced-motion` | `prefers-reduced-data` |
|---------|-----------------|--------------------------|------------------------|
| Loader | ≤500ms opacity fade (or omitted) | none — instant | (n/a) |
| Smooth scroll | enabled | **native scroll** | native scroll |
| Hero video | autoplay muted loop | autoplay still allowed (it's content) but no UI motion | **poster + tap-to-play** |
| Section reveals | translate + fade + stagger | **opacity-only / instant** | instant |
| Hero→work transition | native scroll + section reveal | same | same |
| Card hover preview | clip plays | poster→preview swap, no move | **poster only** |
| Filter | FLIP | instant show/hide | instant |
| Case detail | slide | fade | fade |
| Count-up | animated | **final value instant** | instant |
| Custom cursor | **removed (native cursor)** | native | native |
| Grain | **static** | static | static |
| Below-fold video | lazy autoplay-off | same | not loaded until tap |

**Implementation note:** a single `MotionGuard` reads both media queries and switches component variants centrally, so no animation can ship without its fallback (design-system §11).

---

## 5. How this serves the brief

- **15-second test:** no intro gate — the hero (reel + positioning + proof-line + CTA) is present in well under 1s, answering who/why/trust/next in the first viewport.
- **Editorial restraint / no flashiness:** filmic easing, one purposeful motion per moment, footage always primary — motion that fails the "does it help?" test is cut.
- **Accessibility:** every behavior has a keyboard path and a reduced-motion/data fallback, with no loss of content.
- **Performance:** scroll/motion libs load only where used; reduced-data avoids autoplay; posters carry first paint — motion never threatens the budget or the mobile-first surface.

---

*This completes the Phase 3 deliverables. See [`roadmap.md`](roadmap.md) for how M3–M4 implement this blueprint.*

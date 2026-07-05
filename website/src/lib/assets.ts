import { ASSET_FILES, RESUME_HREF } from "@/generated/assets";
import { workItems, type WorkItem } from "@/content/work";

/**
 * Asset resolution — the repo-level `assets/` folder is the single source of
 * truth for real photography, video and logos. `scripts/sync-assets.mjs`
 * (predev/prebuild) mirrors it into `public/assets` and emits the manifest
 * imported here, so resolution is pure data — no runtime/bundled `fs`.
 *
 * Convention (drop a file, it appears; else graded placeholder is kept):
 *   Hero video    assets/videos/hero.{mp4,webm,mov}
 *   Hero poster   assets/images/hero.{avif,webp,jpg,png}
 *   Portrait      assets/images/portrait.{…}
 *   Work still    assets/images/work/<work-id>.{…}
 *   Work film     assets/videos/work/<work-id>.{mp4,webm,mov}
 *   Brand logos   assets/logos/*.{svg,png,webp}
 *
 * Run `npm run build` after changing assets (home is statically prerendered).
 */

const IMG_EXTS = ["avif", "webp", "jpg", "jpeg", "png"];
const VIDEO_EXTS = ["mp4", "webm", "mov", "m4v"];
const LOGO_EXTS = ["svg", "webp", "png", "jpg", "jpeg"];

const PRESENT = new Set(ASSET_FILES);

const url = (rel: string): string | null =>
  PRESENT.has(rel) ? `/assets/${rel}` : null;

function firstUrl(dir: string, base: string, exts: string[]): string | null {
  for (const ext of exts) {
    const u = url(`${dir}/${base}.${ext}`);
    if (u) return u;
  }
  return null;
}

export const heroVideo = () => firstUrl("videos", "hero", VIDEO_EXTS);
export const heroPoster = () => firstUrl("images", "hero", IMG_EXTS);
export const portraitImage = () => firstUrl("images", "portrait", IMG_EXTS);

/** Brand logo mark for the masthead — drop assets/images/logo.{svg,webp,png,…}. */
export const logoImage = () =>
  firstUrl("images", "logo", ["svg", "webp", "avif", "png", "jpg", "jpeg"]);

/** Downloadable CV — synced from the repo-level `resume/` folder (newest PDF). */
export const resumeHref = (): string | null => RESUME_HREF;

const workImage = (id: string) =>
  firstUrl("images/work", id, IMG_EXTS) ?? firstUrl("images", id, IMG_EXTS);
const workVideo = (id: string) =>
  firstUrl("videos/work", id, VIDEO_EXTS) ?? firstUrl("videos", id, VIDEO_EXTS);
/** Branded 9:16 cover overlay — assets/images/work/<id>-cover.{…}. Transparent
 *  art that sits over the card's gradient as the resting state (the reel plays
 *  on top on hover / in view). */
const workCover = (id: string) => firstUrl("images/work", `${id}-cover`, IMG_EXTS);

export type ResolvedWorkItem = WorkItem & {
  imageUrl: string | null;
  videoUrl: string | null;
  coverUrl: string | null;
};

/** Work items augmented with resolved image/video URLs (if present). */
export function resolveWorkItems(): ResolvedWorkItem[] {
  return workItems.map((item) => ({
    ...item,
    imageUrl: workImage(item.id),
    videoUrl: workVideo(item.id),
    coverUrl: workCover(item.id),
  }));
}

export type BrandLogo = { src: string; name: string };

/** Every image in assets/logos, alphabetized; filename → readable name. */
export function brandLogos(): BrandLogo[] {
  return ASSET_FILES.filter(
    (f) =>
      f.startsWith("logos/") &&
      LOGO_EXTS.includes(f.split(".").pop()?.toLowerCase() ?? ""),
  ).map((f) => {
    const base = f.slice("logos/".length).replace(/\.[^.]+$/, "");
    return {
      src: `/assets/${f}`,
      name: base
        .replace(/[-_]+/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
    };
  });
}

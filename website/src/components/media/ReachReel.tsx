"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import { BackgroundVideo } from "./BackgroundVideo";

/**
 * The Reach reel — a muted, looping preview in the ledger that opens into a
 * theater on click. Mirrors the work gallery (FilmGallery): a native <dialog>
 * (focus trap, Esc, focus restore for free) plays the clip full-size *with
 * sound*, since opening is a user gesture; if the browser still declines
 * audio autoplay it falls back to muted so the film always plays.
 */
export function ReachReel({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string | null;
  caption: string;
}) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleId = useId();

  const close = useCallback(() => dialogRef.current?.close(), []);

  /* Mount → showModal; play with sound (allowed off the click gesture), else
     fall back to muted. Unmounting on close stops playback. */
  useEffect(() => {
    if (!open) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const v = videoRef.current;
    if (v) {
      v.muted = false;
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-haspopup="dialog"
        aria-label={`${caption} — watch the reel with sound`}
        className="group block h-full w-full cursor-pointer text-left"
      >
        <div className="relative aspect-[9/16] h-full w-full overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] transition-[border-color] duration-[400ms] ease-[var(--ease-standard)] group-hover:border-[var(--color-gold-muted)] group-focus-visible:border-[var(--color-gold-muted)] lg:aspect-auto">
          <BackgroundVideo src={src} poster={poster} />

          {/* Lower scrim so the caption reads over any frame */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
            style={{
              backgroundImage:
                "linear-gradient(0deg, rgba(8,8,8,0.85) 0%, rgba(8,8,8,0.35) 55%, rgba(8,8,8,0) 100%)",
            }}
          />

          {/* Hairline vignette to seat the clip in the dark surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-md ring-1 ring-inset ring-[var(--color-line)]"
          />

          {/* Watch affordance — signals the clip is playable with sound */}
          <span className="kicker absolute right-4 top-4 inline-flex items-center gap-2 rounded-pill border border-[var(--color-line-strong)] bg-[rgba(10,10,10,0.55)] px-3 py-1.5 text-[var(--color-ink)] backdrop-blur-sm transition-colors duration-[240ms] group-hover:border-[var(--color-gold-muted)] group-hover:text-[var(--color-gold-text)]">
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M1.5 0.5v9l7.5-4.5z" />
            </svg>
            Watch
          </span>

          <span className="kicker absolute inset-x-0 bottom-0 flex items-center gap-2 p-4 text-[var(--color-ink)]">
            <span
              aria-hidden="true"
              className="inline-block size-1.5 rounded-pill bg-[var(--color-gold)]"
            />
            {caption}
          </span>
        </div>
      </button>

      {open && (
        <dialog
          ref={dialogRef}
          className="theater"
          aria-labelledby={titleId}
          onClose={() => setOpen(false)}
        >
          {/* The wrapper fills the dialog, so it — not the dialog element —
              receives backdrop clicks; the panel stops propagation. */}
          <div
            className="flex min-h-full items-center justify-center p-5 md:p-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="w-full max-w-[380px]">
              <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-[var(--color-line)] pb-4">
                <span
                  id={titleId}
                  className="kicker flex items-center gap-2 text-[var(--color-gold-text)]"
                >
                  <span
                    aria-hidden="true"
                    className="inline-block size-1.5 rounded-pill bg-[var(--color-gold)]"
                  />
                  {caption}
                </span>
                <button
                  type="button"
                  onClick={close}
                  className="kicker inline-flex items-center gap-2 text-[var(--color-ink-soft)] transition-colors duration-[240ms] hover:text-[var(--color-ink)]"
                >
                  Close
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
              </div>

              <video
                ref={videoRef}
                className="mx-auto aspect-[9/16] max-h-[78dvh] w-full rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] object-cover"
                controls
                loop
                playsInline
                preload="auto"
                poster={poster ?? undefined}
              >
                <source src={src} />
              </video>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

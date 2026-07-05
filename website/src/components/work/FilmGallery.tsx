"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { cn } from "@/lib/cn";
import { PosterFrame } from "@/components/media/PosterFrame";
import type { ResolvedWorkItem } from "@/lib/assets";

const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

const prefersLightData = () =>
  typeof window !== "undefined" &&
  (window.matchMedia?.("(prefers-reduced-data: reduce)").matches ||
    // @ts-expect-error — non-standard but widely present
    navigator.connection?.saveData === true);

/**
 * The Work — a film gallery, not a list (docs/creative-direction.md,
 * Direction A). Each campaign is a 9:16 reel on a cinema wall:
 *
 *  - Cards paint instantly from the graded frame; when a real reel exists
 *    its first frame loads via preload="metadata" (a few hundred KB, never
 *    the full 8MB file — see performance budget in the brief, R2).
 *  - Fine pointers preview on hover; coarse pointers preview when the card
 *    is mostly in view (the mobile strip shows ~1.5 cards, so at most two
 *    stream at once). Reduced-motion / Save-Data never autoplay.
 *  - Selecting a card opens the theater: a native <dialog> (focus trap,
 *    Esc, focus restore for free) with the film at full size — with sound,
 *    since opening is a user gesture — beside the campaign write-up.
 */
export function FilmGallery({ items }: { items: ResolvedWorkItem[] }) {
  const [active, setActive] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const theaterVideoRef = useRef<HTMLVideoElement>(null);
  const baseId = useId();

  const open = (i: number) => {
    setActive(i);
    track("work_opened", { format: items[i].title });
  };

  const close = useCallback(() => dialogRef.current?.close(), []);

  /* Mount → showModal; the video starts with sound when allowed (user
     gesture), else falls back to muted so the film always plays. */
  useEffect(() => {
    if (active === null) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    dialog.showModal();
    const v = theaterVideoRef.current;
    if (v && !prefersReduced()) {
      v.play().catch(() => {
        v.muted = true;
        v.play().catch(() => {});
      });
    }
  }, [active]);

  const item = active !== null ? items[active] : null;

  return (
    <>
      {/* The wall — snap strip on mobile, four-up on desktop */}
      <ol
        className={cn(
          "-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4",
          "md:mx-0 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4",
        )}
        aria-label="Selected campaigns"
      >
        {items.map((it, i) => (
          <li
            key={it.id}
            className="w-[72vw] max-w-[320px] shrink-0 snap-center md:w-auto md:max-w-none"
          >
            <FilmCard index={i} item={it} onOpen={() => open(i)} />
          </li>
        ))}
      </ol>

      {/* The theater */}
      {item && (
        <dialog
          ref={dialogRef}
          className="theater"
          aria-labelledby={`${baseId}-title`}
          onClose={() => setActive(null)}
        >
          {/* The wrapper fills the dialog, so it — not the dialog element —
              receives backdrop clicks; the panel stops propagation. */}
          <div
            className="flex min-h-full items-center justify-center p-5 md:p-10"
            onClick={(e) => {
              if (e.target === e.currentTarget) close();
            }}
          >
            <div className="w-full max-w-5xl">
              <div className="mb-5 flex items-baseline justify-between gap-6 border-b border-[var(--color-line)] pb-4">
                <span className="kicker tnum text-[var(--color-gold-text)]">
                  {String((active ?? 0) + 1).padStart(2, "0")} ·{" "}
                  {item.category}
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

              <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-12">
                {/* The film */}
                <div className="mx-auto w-full max-w-[300px] shrink-0 md:mx-0 md:max-w-[340px]">
                  {item.videoUrl ? (
                    <video
                      ref={theaterVideoRef}
                      className="aspect-[9/16] w-full rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] object-cover"
                      controls
                      playsInline
                      preload="auto"
                      poster={item.imageUrl ?? undefined}
                    >
                      <source src={item.videoUrl} />
                    </video>
                  ) : (
                    <PosterFrame
                      ratio={item.ratio}
                      poster={item.poster}
                      image={item.imageUrl}
                      alt={item.title}
                      sizes="340px"
                    />
                  )}
                </div>

                {/* The write-up */}
                <div className="min-w-0 flex-1 pb-4">
                  <h3
                    id={`${baseId}-title`}
                    className="serif text-[clamp(1.75rem,3.5vw,2.75rem)] leading-[1.08]"
                  >
                    {item.title}
                  </h3>
                  <p className="kicker mt-3 text-[var(--color-ink-soft)]">
                    {item.developer}
                  </p>

                  <p className="mt-6 max-w-xl text-pretty text-[0.9375rem] leading-[1.65] text-[var(--color-ink-soft)]">
                    {item.description}
                  </p>

                  <dl className="mt-8 grid gap-x-10 gap-y-5 border-t border-[var(--color-line)] pt-6 sm:grid-cols-2">
                    {item.details.map(({ label, value }) => (
                      <div key={label}>
                        <dt className="kicker mb-1.5 text-[var(--color-ink-soft)]">
                          {label}
                        </dt>
                        <dd className="text-pretty text-[0.9375rem] leading-[1.55] text-[var(--color-ink-soft)]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}

/**
 * One reel on the wall. Preview playback is a whisper: muted, no controls,
 * gated by pointer/viewport/preference — the full film lives in the theater.
 */
function FilmCard({
  index,
  item,
  onOpen,
}: {
  index: number;
  item: ResolvedWorkItem;
  onOpen: () => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<HTMLButtonElement>(null);
  const [preload, setPreload] = useState<"none" | "metadata">("none");
  // The branded cover is the resting state; the reel fades in only while it
  // actually plays, then fades back to the cover when paused.
  const [playing, setPlaying] = useState(false);

  /* Defer even metadata until the card nears the viewport; skip entirely
     for Save-Data. Without IntersectionObserver the card simply keeps its
     graded frame — the theater still plays the film. */
  useEffect(() => {
    const el = frameRef.current;
    if (!el || !item.videoUrl || prefersLightData()) return;
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setPreload("metadata");
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.videoUrl]);

  /* Coarse pointers can't hover — preview when the card is mostly in view. */
  useEffect(() => {
    const el = frameRef.current;
    const video = videoRef.current;
    if (!el || !video || !item.videoUrl) return;
    if (prefersReduced() || prefersLightData()) return;
    if (window.matchMedia?.("(hover: hover)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) video.play().catch(() => {});
          else video.pause();
        }
      },
      { threshold: 0.65 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [item.videoUrl, preload]);

  const hoverPlay = () => {
    if (prefersReduced() || prefersLightData()) return;
    videoRef.current?.play().catch(() => {});
  };
  const hoverPause = () => videoRef.current?.pause();

  return (
    <button
      ref={frameRef}
      type="button"
      onClick={onOpen}
      onMouseEnter={hoverPlay}
      onMouseLeave={hoverPause}
      onFocus={hoverPlay}
      onBlur={hoverPause}
      aria-haspopup="dialog"
      aria-label={`${item.title} — ${item.developer}. Watch the film.`}
      className="group block w-full text-left"
    >
      <div
        className="relative aspect-[9/16] w-full overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-raised)] transition-[border-color,transform] duration-[400ms] ease-[var(--ease-standard)] group-hover:border-[var(--color-gold-muted)] group-focus-visible:border-[var(--color-gold-muted)]"
        style={{ backgroundImage: item.poster, backgroundSize: "cover" }}
      >
        {/* Branded cover — transparent art over the gradient (resting state).
            The art is 2:3 while the card is 9:16, so contain-fit inside a
            slightly padded box keeps the whole mark visible (no cropping). */}
        {item.coverUrl && (
          <div className="pointer-events-none absolute inset-0 p-[6%]">
            <div className="relative h-full w-full">
              <Image
                src={item.coverUrl}
                alt=""
                aria-hidden="true"
                fill
                sizes="(min-width: 1024px) 320px, 72vw"
                className="object-contain"
              />
            </div>
          </div>
        )}

        {item.videoUrl && preload !== "none" && (
          <video
            ref={videoRef}
            className={cn(
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-[500ms] ease-[var(--ease-standard)]",
              playing ? "opacity-100" : "opacity-0",
            )}
            muted
            loop
            playsInline
            preload={preload}
            poster={item.coverUrl ?? item.imageUrl ?? undefined}
            onPlaying={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            aria-hidden="true"
            tabIndex={-1}
          >
            <source src={item.videoUrl} />
          </video>
        )}

        {/* Lower-third scrim + credit */}
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-2/5"
          style={{
            backgroundImage:
              "linear-gradient(0deg, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.4) 55%, rgba(8,8,8,0) 100%)",
          }}
        />
        <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
          <p className="kicker tnum mb-2 text-[var(--color-gold-text)]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="serif text-[1.375rem] leading-[1.1] text-[var(--color-ink)] md:text-[1.5rem]">
            {item.title}
          </h3>
          <p className="mt-1.5 truncate text-[0.8125rem] text-[var(--color-ink-soft)]">
            {item.developer}
          </p>
        </div>

        {/* Watch affordance */}
        {item.videoUrl && (
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
        )}
      </div>

      <p className="kicker mt-3 text-[var(--color-ink-mute)] transition-colors duration-[240ms] group-hover:text-[var(--color-ink-soft)]">
        {item.category}
      </p>
    </button>
  );
}

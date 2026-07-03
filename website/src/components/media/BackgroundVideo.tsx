"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { cn } from "@/lib/cn";

/* Media/data preferences as an external store — SSR renders the poster only
   (server snapshot = still), the video mounts after hydration and live-tracks
   preference changes. */
const STILL_QUERIES = [
  "(prefers-reduced-motion: reduce)",
  "(prefers-reduced-data: reduce)",
];

function subscribe(onChange: () => void) {
  const lists = STILL_QUERIES.map((q) => window.matchMedia(q));
  lists.forEach((l) => l.addEventListener("change", onChange));
  return () => lists.forEach((l) => l.removeEventListener("change", onChange));
}

function prefersStill() {
  return (
    STILL_QUERIES.some((q) => window.matchMedia(q).matches) ||
    // @ts-expect-error — non-standard but widely present
    navigator.connection?.saveData === true
  );
}

/**
 * Ambient background video (hero). Poster paints first (LCP-friendly); the
 * muted looping video fades in only once it is actually *playing* — so when
 * a browser declines autoplay (iOS Low Power Mode, Chrome Energy Saver,
 * battery savers), the graded poster stays instead of a frozen frame, and
 * the first user interaction retries playback. Honors prefers-reduced-motion
 * and Save-Data / prefers-reduced-data by staying on the poster and never
 * loading the video. Only mounts when a real asset exists, so the hero ships
 * zero JS until video is added.
 */
export function BackgroundVideo({
  src,
  poster,
  opacity = 1,
  className,
}: {
  src: string;
  poster?: string | null;
  /** Caps the media opacity (0–1) — dims the clip so overlaid content reads. */
  opacity?: number;
  className?: string;
}) {
  const play = !useSyncExternalStore(subscribe, prefersStill, () => true);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* Autoplay is a request, not a guarantee — and a granted request can be
     revoked (battery savers and background tabs pause media mid-loop). So:
     nudge play() explicitly; if declined, retry on the first gesture (any
     interaction satisfies the policy); if the browser pauses us later,
     re-arm the gesture retry; always resume when the tab is visible again.
     There are no controls, so every pause here is browser-initiated. */
  useEffect(() => {
    const v = videoRef.current;
    if (!play || !v) return;

    let cancelled = false;
    const gestures = [
      "pointerdown",
      "click",
      "touchstart",
      "keydown",
      "wheel",
      "scroll",
    ] as const;

    const tryPlay = () => {
      if (cancelled || !v.paused) return;
      v.muted = true; // belt-and-braces: some engines drop the attribute
      v.play().catch(armRetry);
    };
    const armRetry = () => {
      if (cancelled) return;
      gestures.forEach((g) =>
        window.addEventListener(g, tryPlay, { once: true, passive: true }),
      );
    };
    const onVisible = () => {
      if (document.visibilityState === "visible") tryPlay();
    };
    const onPause = () => {
      if (cancelled) return;
      if (document.visibilityState === "visible") tryPlay();
      armRetry();
    };

    document.addEventListener("visibilitychange", onVisible);
    v.addEventListener("pause", onPause);
    tryPlay();
    return () => {
      cancelled = true;
      gestures.forEach((g) => window.removeEventListener(g, tryPlay));
      document.removeEventListener("visibilitychange", onVisible);
      v.removeEventListener("pause", onPause);
    };
  }, [play, src]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
    >
      {poster && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${poster})` }}
        />
      )}
      {play && (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-[900ms] ease-[var(--ease-standard)]",
            playing ? "opacity-100" : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster ?? undefined}
          onPlaying={() => setPlaying(true)}
          aria-hidden="true"
        >
          <source src={src} />
        </video>
      )}
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";

/**
 * YouTube facade — poster + play button; the heavy iframe mounts only on
 * request. On activation, focus moves to the player wrapper so keyboard/SR
 * users land on the now-playing video instead of <body>.
 */
export function YouTubeFacade({
  youtubeId,
  title,
}: {
  youtubeId: string;
  title: string;
}) {
  const [active, setActive] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active) playerRef.current?.focus();
  }, [active]);

  if (active) {
    return (
      <div
        ref={playerRef}
        tabIndex={-1}
        aria-label={`Now playing: ${title}`}
        className="relative aspect-video w-full overflow-hidden rounded-md"
      >
        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setActive(true)}
      aria-label={`Play: ${title}`}
      className="group relative aspect-video w-full overflow-hidden rounded-md"
      style={{
        backgroundImage: `url(https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <span className="absolute inset-0 bg-[var(--color-base)]/30 transition-colors group-hover:bg-[var(--color-base)]/10" />
      <span className="absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-pill border border-[var(--color-line-strong)] bg-[var(--color-base)]/50 text-[var(--color-ink)] backdrop-blur-sm transition-transform group-hover:scale-105">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 7l9 5-9 5V7Z" fill="currentColor" />
        </svg>
      </span>
    </button>
  );
}

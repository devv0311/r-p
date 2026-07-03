import { services } from "@/content/services";

/**
 * Discipline ticker — a quiet title-crawl between the opening reel and the
 * work: the practice, in one moving line. Pure CSS (reduced-motion freezes
 * it, still readable); aria-hidden because it duplicates the Practice
 * section for atmosphere, not information.
 */
export function Ticker() {
  const entries = services.map((s) => s.title);
  return (
    <div
      aria-hidden="true"
      className="marquee border-y border-[var(--color-line)] py-4"
    >
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {entries.map((t) => (
              <span
                key={t}
                className="kicker mx-7 flex items-center gap-14 whitespace-nowrap text-[var(--color-ink-soft)]"
              >
                {t}
                <span className="block h-1 w-1 rounded-pill bg-[var(--color-gold-muted)]" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

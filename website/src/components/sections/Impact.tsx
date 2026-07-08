import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { ReachReel } from "@/components/media/ReachReel";
import { reachVideo, reachPoster } from "@/lib/assets";
import { site } from "@/content/site";

/**
 * Reach — verified audience as monumental fact. The numerals get the
 * cinema-scale treatment (this is the differentiator: distribution, not
 * just craft); every linked metric stays one click from its public
 * source — proof, literally.
 *
 * When a reel exists (assets/videos/reach.*), it floats beside the ledger:
 * a 9:16 clip on the right at desktop widths, stacked above the numbers on
 * mobile — the audience made visible next to the numbers that count it.
 * MODULAR: no asset → the ledger simply spans full width, zero extra JS.
 */
export function Impact({ index }: { index: string }) {
  const reel = reachVideo();
  const poster = reachPoster();

  const intro = (
    <p className="serif max-w-md text-balance text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.3] text-[var(--color-ink-soft)]">
      An owned audience —{" "}
      <em className="serif-italic text-[var(--color-gold-text)]">
        real, public and growing.
      </em>
    </p>
  );

  const metrics = (
    <dl className="grid grid-cols-1 border-t border-[var(--color-line)] sm:grid-cols-2">
      {site.metrics.map((m, i) => {
        const cell = (
          <>
            <dd className="serif tnum text-[clamp(3.25rem,7vw,5.5rem)] leading-none tracking-[-0.01em]">
              <MetricCounter value={m.value} />
            </dd>
            <dt className="mt-4 min-w-0">
              <span className="kicker flex items-baseline gap-2">
                {m.label}
                {m.href && (
                  <span
                    aria-hidden="true"
                    className="translate-y-[-1px] text-[var(--color-ink-mute)] transition-[color,transform] duration-[240ms] group-hover:translate-x-0.5 group-hover:text-[var(--color-gold-text)]"
                  >
                    ↗
                  </span>
                )}
              </span>
              {m.sub && (
                <span className="mt-2 block text-[0.8125rem] leading-snug text-[var(--color-ink-soft)]">
                  {m.sub}
                </span>
              )}
            </dt>
          </>
        );
        return (
          <Reveal
            key={m.label}
            delay={i * 90}
            className={
              "border-b border-[var(--color-line)] " +
              (i % 2 === 0 ? "sm:border-r" : "")
            }
          >
            {m.href ? (
              <a
                href={m.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${m.value} ${m.label} — view source`}
                className="group block px-1 py-10 transition-colors duration-[400ms] hover:bg-[var(--color-raised)] sm:px-8 md:py-14"
              >
                {cell}
              </a>
            ) : (
              <div className="px-1 py-10 sm:px-8 md:py-14">{cell}</div>
            )}
          </Reveal>
        );
      })}
    </dl>
  );

  return (
    <Section id="impact" label="Reach">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Reach"
          title="Proof, not promises."
          className="mb-8 md:mb-10"
        />
      </Reveal>

      {reel ? (
        <div className="grid gap-x-16 gap-y-10 lg:grid-cols-[minmax(0,1fr)_minmax(300px,360px)] xl:gap-x-20">
          {/* Left track — intro then the numbers, stacked. First in the
              source so screen readers reach the proof before the reel. */}
          <div className="lg:order-1">
            <Reveal className="mb-10 md:mb-14">{intro}</Reveal>
            {metrics}
          </div>

          {/* The reel — a 9:16 clip on mobile (above the ledger), then on
              desktop it spans the full height of the left track, rising up
              alongside the intro so the right column is never dead space.
              Clicking opens the theater and plays it full-size with sound. */}
          <Reveal className="order-first mx-auto w-full max-w-[300px] lg:order-2 lg:mx-0 lg:h-full lg:max-w-none">
            <ReachReel src={reel} poster={poster} caption={site.handle} />
          </Reveal>
        </div>
      ) : (
        <>
          <Reveal className="mb-14 md:mb-20">{intro}</Reveal>
          {metrics}
        </>
      )}
    </Section>
  );
}

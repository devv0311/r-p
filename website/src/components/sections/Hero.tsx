import { Container } from "@/components/primitives/Container";
import { Button } from "@/components/primitives/Button";
import { HeroMedia } from "@/components/media/HeroMedia";
import { site } from "@/content/site";

/**
 * Hero — the opening title (docs/creative-direction.md, Direction A).
 * The showreel runs at full presence; the statement enters like film
 * titling (CSS keyframes — visible without JS, collapsed under
 * reduced-motion). Verified audience data closes the frame as a quiet
 * ledger. Who / why-different / trust / next, all in the first viewport.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col overflow-hidden pt-28 md:pt-36"
    >
      <HeroMedia />

      {/* Statement — film-title lower third */}
      <Container className="flex flex-1 flex-col justify-end pb-10 md:pb-14">
        <p
          className="kicker fade-rise mb-6 flex flex-wrap items-baseline gap-x-5 gap-y-2 text-[var(--color-ink)]/90 md:mb-8"
          style={{ "--rise-delay": "120ms" } as React.CSSProperties}
        >
          <span>{site.role}</span>
          <span
            aria-hidden="true"
            className="h-px w-10 self-center bg-[var(--color-gold-muted)]"
          />
          <span className="text-[var(--color-ink-soft)]">Gurugram → Dubai</span>
        </p>

        <h1 className="serif text-balance text-[clamp(3rem,9vw,7rem)] leading-[1]">
          <span className="mask-line">
            <span style={{ "--rise-delay": "180ms" } as React.CSSProperties}>
              {site.hero.line1}
            </span>
          </span>
          <span className="mask-line">
            <em
              className="serif-italic text-[var(--color-gold-text)]"
              style={{ "--rise-delay": "300ms" } as React.CSSProperties}
            >
              {site.hero.line2}
            </em>
          </span>
        </h1>

        <p
          className="fade-rise mt-6 max-w-xl text-pretty text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.65] text-[var(--color-ink-soft)] md:mt-7"
          style={{ "--rise-delay": "420ms" } as React.CSSProperties}
        >
          {site.hero.sub}
        </p>

        <div
          className="fade-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 md:mt-9"
          style={{ "--rise-delay": "520ms" } as React.CSSProperties}
        >
          <Button href={site.cta.primary.href} variant="primary" withArrow>
            {site.cta.primary.label}
          </Button>
          <Button href="#work" variant="ghost" withArrow>
            Watch the work
          </Button>
        </div>
      </Container>

      {/* Data ledger — verified audience, stated as fact */}
      <Container className="pb-6 md:pb-8">
        <div
          className="fade-rise flex flex-wrap items-end justify-between gap-x-10 gap-y-6 border-t border-[var(--color-line)] pt-1 md:pt-5"
          style={{ "--rise-delay": "640ms" } as React.CSSProperties}
        >
          {/* Mobile: label/value rows · Desktop: columns */}
          <dl className="w-full divide-y divide-[var(--color-line)] md:flex md:w-auto md:gap-x-14 md:divide-y-0">
            {site.metrics
              .filter((m) => !m.reachOnly)
              .map((m) => (
                <div
                  key={m.label}
                  className="flex items-baseline justify-between gap-6 py-3 md:block md:py-0"
                >
                  <dt className="kicker md:mb-1.5">{m.label}</dt>
                  <dd className="serif tnum text-[1.375rem] leading-none md:text-[clamp(1.5rem,2.4vw,2rem)]">
                    {m.value}
                  </dd>
                </div>
              ))}
          </dl>

          <div className="hidden items-center gap-3 pb-1 text-[var(--color-ink-mute)] md:flex">
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-5 items-start justify-center rounded-pill border border-[var(--color-line-strong)] p-1"
            >
              <span className="hero-scroll-dot block h-1.5 w-1 rounded-pill bg-[var(--color-ink-soft)]" />
            </span>
            <span className="kicker">Scroll</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { MetricCounter } from "@/components/motion/MetricCounter";
import { site } from "@/content/site";

/**
 * Reach — verified audience as monumental fact. The numerals get the
 * cinema-scale treatment (this is the differentiator: distribution, not
 * just craft); every linked metric stays one click from its public
 * source — proof, literally.
 */
export function Impact({ index }: { index: string }) {
  return (
    <Section id="impact" label="Reach">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Reach"
          title="Proof, not promises."
          className="mb-6"
        />
        <p className="serif mb-14 max-w-md text-balance text-[clamp(1.25rem,2vw,1.625rem)] leading-[1.3] text-[var(--color-ink-soft)] md:mb-20">
          An owned audience —{" "}
          <em className="serif-italic text-[var(--color-gold-text)]">
            real, public and growing.
          </em>
        </p>
      </Reveal>

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
    </Section>
  );
}

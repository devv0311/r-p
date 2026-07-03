import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { services } from "@/content/services";

/**
 * Practice — stated plainly. Five disciplines, one line each; nothing hidden
 * behind interaction. Rows share the site's 2.5rem+gap column axis so index,
 * title and description sit on one grid line. No pricing (brief).
 */
export function Capabilities({ index }: { index: string }) {
  return (
    <Section id="services" label="Practice">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Practice"
          title="What I do"
          className="mb-14"
        />
      </Reveal>

      <ul>
        {services.map((s, i) => (
          <Reveal
            as="li"
            key={s.title}
            delay={i * 70}
            className="group grid grid-cols-[2.5rem_1fr] items-baseline gap-x-3 gap-y-2 border-t border-[var(--color-line)] py-7 last:border-b md:grid-cols-[2.5rem_minmax(0,5fr)_minmax(0,6fr)] md:gap-x-6"
          >
            <span className="kicker tnum text-[var(--color-ink-mute)] transition-colors duration-[240ms] group-hover:text-[var(--color-gold-text)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="serif text-[clamp(1.375rem,2.6vw,2rem)] leading-[1.15]">
              {s.title}
            </h3>
            <p className="col-start-2 text-pretty text-[0.9375rem] leading-[1.6] text-[var(--color-ink-soft)] md:col-start-3">
              {s.value}
            </p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}

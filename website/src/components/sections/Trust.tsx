import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";
import type { BrandLogo } from "@/lib/assets";

/**
 * Trusted by — MODULAR: rendered only when logos, brands or testimonials
 * exist (gated in page.tsx). Logos come from assets/logos; falls back to
 * brand names. Fully on the typographic system.
 */
export function Trust({
  index,
  logos = [],
}: {
  index: string;
  logos?: BrandLogo[];
}) {
  const { brands, testimonials } = site;

  return (
    <Section id="trust" label="Trusted by">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Trust"
          title="In good company."
          className="mb-14"
        />
      </Reveal>

      {(logos.length > 0 || brands.length > 0) && (
        <Reveal className="mb-16">
          <p className="kicker mb-8">Worked with</p>
          {logos.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-x-14 gap-y-10">
              {logos.map((logo) => (
                <li key={logo.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-7 w-auto object-contain opacity-70 transition-opacity duration-[240ms] hover:opacity-100 md:h-8"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <ul className="flex flex-wrap items-center gap-x-12 gap-y-6">
              {brands.map((b) => (
                <li key={b} className="text-[var(--color-ink-soft)]">
                  {b}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      )}

      {testimonials.length > 0 && (
        <Reveal as="ul" className="grid gap-10 md:grid-cols-2">
          {testimonials.map((t) => (
            <li key={t.name} className="border-l border-[var(--color-line)] pl-6">
              <p className="serif text-[clamp(1.125rem,1.8vw,1.375rem)] leading-[1.4] text-[var(--color-ink)]">
                “{t.quote}”
              </p>
              <p className="kicker mt-4 text-[var(--color-ink-soft)]">
                {t.name} · {t.role}
              </p>
            </li>
          ))}
        </Reveal>
      )}
    </Section>
  );
}

import Image from "next/image";
import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/primitives/Button";
import { site } from "@/content/site";
import { portraitImage, resumeHref } from "@/lib/assets";

/**
 * Profile — editorial spread: measured story beside a verified fact ledger.
 * A real portrait (assets/images/portrait.*) leads the spread when present;
 * until then the story + facts carry it (no placeholder frames ship). This is
 * where relocation lives — a fact among facts, not the identity.
 */
export function About({ index }: { index: string }) {
  const portrait = portraitImage();
  const resume = resumeHref();

  const story = (
    <>
      <div className="flex max-w-xl flex-col gap-5">
        {site.about.paragraphs.map((p, i) =>
          i === 0 ? (
            // Lede — the story opens in the display voice, like a caption
            // card in a film.
            <p
              key={i}
              className="serif text-pretty text-[clamp(1.25rem,1.9vw,1.625rem)] leading-[1.45] text-[var(--color-ink)]"
            >
              {p}
            </p>
          ) : (
            <p
              key={i}
              className="text-pretty text-[clamp(1rem,1.2vw,1.125rem)] leading-[1.7] text-[var(--color-ink-soft)]"
            >
              {p}
            </p>
          ),
        )}
      </div>
      {resume && (
        <div className="mt-10">
          <Button
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            withArrow
          >
            Download résumé
          </Button>
        </div>
      )}
    </>
  );

  const facts = (
    <dl>
      {site.about.facts.map((f) => (
        <div
          key={f.label}
          className="grid grid-cols-[7.5rem_1fr] items-baseline gap-4 border-t border-[var(--color-line)] py-4 last:border-b"
        >
          <dt className="kicker text-[var(--color-ink-soft)]">{f.label}</dt>
          <dd className="text-[0.9375rem] leading-[1.5] text-[var(--color-ink)]">
            {f.value}
          </dd>
        </div>
      ))}
    </dl>
  );

  return (
    <Section id="about" label="About">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Profile"
          title={site.about.heading}
          className="mb-14"
        />
      </Reveal>

      {portrait ? (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-5">
            {/* figcaption stays a direct child of figure (spec); it overlays
                the still, which carries its own scrim for legibility. */}
            <figure className="relative">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-raised)]">
                <Image
                  src={portrait}
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  className="object-cover"
                />
                {/* Film-still grade — quiet lower scrim under the credit */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-1/3"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(8,8,8,0.82) 0%, rgba(8,8,8,0.3) 60%, rgba(8,8,8,0) 100%)",
                  }}
                />
              </div>
              <figcaption className="absolute inset-x-0 bottom-0 flex items-baseline justify-between gap-4 p-4 md:p-5">
                <span className="kicker text-[var(--color-ink)]">
                  {site.name} — {site.handle}
                </span>
                <span className="kicker hidden text-[var(--color-ink-soft)] sm:block">
                  Gurugram → Dubai
                </span>
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={90} className="lg:col-span-7">
            {story}
            <div className="mt-12">{facts}</div>
          </Reveal>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">{story}</Reveal>
          <Reveal delay={90} className="lg:col-span-5">
            {facts}
          </Reveal>
        </div>
      )}
    </Section>
  );
}

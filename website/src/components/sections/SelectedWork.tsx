import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { FilmGallery } from "@/components/work/FilmGallery";
import { resolveWorkItems } from "@/lib/assets";

/**
 * The Work — real luxury real estate campaigns on a cinema wall. Assets
 * (vertical reels/stills) are resolved from assets/ at build time and passed
 * to the client gallery; projects degrade to graded frames until real media
 * is dropped in.
 */
export function SelectedWork({ index }: { index: string }) {
  const items = resolveWorkItems();
  return (
    <Section id="work" label="The work">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="The Work"
          title="Premium developers, proven results."
          className="mb-4"
        />
        <p className="mb-12 max-w-md text-pretty text-[0.9375rem] leading-[1.6] text-[var(--color-ink-soft)] md:mb-14">
          Cinematic marketing campaigns produced for premium real estate
          developers. Open a film for the full story.
        </p>
      </Reveal>
      <Reveal delay={90}>
        <FilmGallery items={items} />
      </Reveal>
    </Section>
  );
}

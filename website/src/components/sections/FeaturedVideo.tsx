import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { YouTubeFacade } from "@/components/media/YouTubeFacade";
import { site } from "@/content/site";

/**
 * Watch — MODULAR: rendered only when a YouTube id exists (gated in
 * page.tsx). Facade embed: no iframe until the visitor asks for it.
 */
export function FeaturedVideo({ index }: { index: string }) {
  const v = site.featuredVideo;
  if (!v) return null;

  return (
    <Section id="watch" label="Watch">
      <Reveal className="mb-10">
        <SectionHeading index={index} kicker="Long-form" title="Watch" />
      </Reveal>
      <Reveal>
        <YouTubeFacade youtubeId={v.youtubeId} title={v.title} />
        <p className="mt-4 max-w-xl text-pretty text-[0.9375rem] leading-[1.6] text-[var(--color-ink-soft)]">
          {v.note}
        </p>
      </Reveal>
    </Section>
  );
}

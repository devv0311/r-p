import { Hero } from "@/components/sections/Hero";
import { Ticker } from "@/components/sections/Ticker";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Impact } from "@/components/sections/Impact";
import { Capabilities } from "@/components/sections/Capabilities";
import { About } from "@/components/sections/About";
import { FeaturedVideo } from "@/components/sections/FeaturedVideo";
import { Trust } from "@/components/sections/Trust";
import { Contact } from "@/components/sections/Contact";
import { site } from "@/content/site";
import { brandLogos } from "@/lib/assets";

/**
 * Home — single-page scroll narrative (docs/information-architecture.md §4).
 * Section indices are derived from composition order so content-gated
 * sections (Watch, Trust) can never desynchronize the editorial numbering.
 */
export default function Home() {
  const logos = brandLogos();
  const hasWatch = site.featuredVideo !== null;
  const hasTrust =
    logos.length > 0 || site.brands.length > 0 || site.testimonials.length > 0;

  let n = 0;
  const idx = () => String(++n).padStart(2, "0");

  return (
    <>
      <Hero />
      <Ticker />
      <SelectedWork index={idx()} />
      <Impact index={idx()} />
      <Capabilities index={idx()} />
      <About index={idx()} />
      {hasWatch && <FeaturedVideo index={idx()} />}
      {hasTrust && <Trust index={idx()} logos={logos} />}
      <Contact index={idx()} />
    </>
  );
}

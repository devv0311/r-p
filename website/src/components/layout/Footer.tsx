import { Container } from "@/components/primitives/Container";
import { Wordmark } from "./Wordmark";
import { SocialLinks } from "./SocialLinks";
import { site } from "@/content/site";
import { resumeHref } from "@/lib/assets";

/**
 * Footer — the end credits. A serif sign-off (the positioning line, one
 * last time) above the colophon: masthead, availability fact, channels,
 * meta, and a way back to the top.
 */
export function Footer() {
  const year = new Date().getFullYear(); // evaluated at build (static prerender)
  const resume = resumeHref();
  return (
    <footer className="relative border-t border-[var(--color-line)] pb-16 pt-14 md:pt-20">
      <Container>
        {/* Sign-off */}
        <div className="mb-14 flex items-end justify-between gap-8 md:mb-20">
          <p className="serif max-w-2xl text-balance text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.1]">
            Luxury real estate,{" "}
            <em className="serif-italic text-[var(--color-gold-text)]">
              made cinematic.
            </em>
          </p>
          <a
            href="#hero"
            className="kicker group hidden shrink-0 items-center gap-2.5 pb-2 text-[var(--color-ink-soft)] transition-colors duration-[240ms] hover:text-[var(--color-ink)] md:inline-flex"
          >
            Back to top
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
              className="transition-transform duration-[240ms] ease-[var(--ease-standard)] group-hover:-translate-y-0.5"
            >
              <path
                d="M8 13V3M4 7l4-4 4 4"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>

        <div className="flex flex-col gap-12 border-t border-[var(--color-line)] pt-12 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-sm flex-col gap-5">
            <Wordmark />
            <p className="text-pretty text-[0.875rem] leading-[1.6] text-[var(--color-ink-soft)]">
              {site.availability.long}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-[0.8125rem]">
              <a
                href={`mailto:${site.contactEmail}`}
                className="text-[var(--color-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
              >
                {site.contactEmail}
              </a>
              {resume && (
                <a
                  href={resume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-ink-soft)] underline-offset-4 transition-colors hover:text-[var(--color-ink)] hover:underline"
                >
                  Résumé
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-6 md:items-end">
            <SocialLinks />
            <p className="kicker text-[var(--color-ink-mute)]">
              © {year} {site.name} · Gurugram → Dubai
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

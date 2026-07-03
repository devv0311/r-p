import { Section } from "@/components/primitives/Section";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "@/components/contact/ContactForm";
import { SocialIcon } from "@/components/layout/SocialIcon";
import { site } from "@/content/site";

/**
 * Contact — the conversion. Serif close, direct channels (LinkedIn first),
 * and the form. Confident, personal, zero friction.
 */
export function Contact({ index }: { index: string }) {
  const linkedin = site.socials.find((s) => s.platform === "linkedin");
  const instagram = site.socials.find((s) => s.platform === "instagram");
  const realEstate = site.realEstateProfile;

  return (
    <Section id="contact" label="Contact">
      <Reveal>
        <SectionHeading
          index={index}
          kicker="Contact"
          title={
            <>
              Start the{" "}
              <em className="serif-italic text-[var(--color-gold-text)]">
                conversation.
              </em>
            </>
          }
          className="mb-14"
        />
      </Reveal>

      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12">
        {/* Channels */}
        <Reveal className="lg:col-span-5">
          <p className="mb-4 max-w-md text-pretty text-[1rem] leading-[1.65] text-[var(--color-ink-soft)]">
            For in-house roles and select collaborations. Replies come from
            me, not an agency.
          </p>
          <p className="kicker mb-10 text-[var(--color-ink-soft)]">
            {site.availability.short}
          </p>

          <ul className="flex flex-col">
            <Channel
              href={linkedin?.href ?? "#"}
              icon="linkedin"
              primary="Connect on LinkedIn"
              secondary="Preferred for roles"
              external
            />
            <Channel
              href={`mailto:${site.contactEmail}`}
              icon="email"
              primary={site.contactEmail}
            />
            <Channel
              href={instagram?.href ?? "#"}
              icon="instagram"
              primary="@rahuljakhar09"
              external
            />
            <Channel
              href={realEstate.href}
              icon="instagram"
              primary="@realtybyrahul"
              secondary={realEstate.note}
              external
            />
          </ul>
        </Reveal>

        {/* Form */}
        <Reveal delay={90} className="lg:col-span-7">
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}

function Channel({
  href,
  icon,
  primary,
  secondary,
  external,
}: {
  href: string;
  icon: "linkedin" | "instagram" | "email";
  primary: string;
  secondary?: string;
  external?: boolean;
}) {
  return (
    <li className="border-t border-[var(--color-line)] last:border-b">
      <a
        href={href}
        {...(external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        className="group flex items-center gap-4 py-4"
      >
        <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[var(--color-line)] text-[var(--color-ink-soft)] transition-colors duration-[240ms] group-hover:border-[var(--color-line-strong)] group-hover:text-[var(--color-ink)]">
          <SocialIcon platform={icon} />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[0.95rem] text-[var(--color-ink)]">
            {primary}
          </span>
          {secondary && (
            <span className="kicker mt-0.5 block text-[var(--color-ink-soft)]">
              {secondary}
            </span>
          )}
        </span>
        <span
          aria-hidden="true"
          className="ml-auto text-[var(--color-ink-mute)] transition-[color,transform] duration-[240ms] group-hover:translate-x-1 group-hover:text-[var(--color-ink)]"
        >
          →
        </span>
      </a>
    </li>
  );
}

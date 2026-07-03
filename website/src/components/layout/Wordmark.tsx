import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { logoImage } from "@/lib/assets";

/**
 * Masthead wordmark — the gold brand mark (when present in assets/images/logo.*)
 * paired with serif caps, tracked like a magazine masthead. The one "Signature"
 * borrowing: identity anchors the work, never upstages it. Falls back to
 * text-only until the logo file is dropped in.
 */
export function Wordmark({
  className,
  href = "#hero",
}: {
  className?: string;
  href?: string;
}) {
  const logo = logoImage();
  return (
    <a
      href={href}
      aria-label={`${site.name} — home`}
      className={cn("group inline-flex shrink-0 items-center gap-3", className)}
    >
      {logo && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logo}
          alt=""
          width={64}
          height={64}
          className="h-12 w-12 shrink-0 object-contain transition-transform duration-[240ms] ease-[var(--ease-standard)] group-hover:scale-[1.06] md:h-16 md:w-16"
        />
      )}
      <span className="inline-flex items-baseline gap-3">
        <span className="serif whitespace-nowrap text-[1.0625rem] font-medium uppercase tracking-[0.12em] text-[var(--color-ink)]">
          {site.name}
        </span>
        <span className="kicker hidden whitespace-nowrap text-[var(--color-ink-mute)] lg:inline">
          {site.handle}
        </span>
      </span>
    </a>
  );
}

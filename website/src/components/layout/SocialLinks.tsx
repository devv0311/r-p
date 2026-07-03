import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { SocialIcon } from "./SocialIcon";

/** Row of social links — LinkedIn first (hiring channel). */
export function SocialLinks({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md";
}) {
  return (
    <ul className={cn("flex items-center gap-1", className)}>
      {site.socials.map((s) => (
        <li key={s.platform}>
          <a
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className={cn(
              "inline-flex items-center justify-center rounded-md text-[var(--color-ink-soft)] transition-colors duration-[240ms] hover:text-[var(--color-ink)]",
              size === "md" ? "h-10 w-10" : "h-9 w-9",
            )}
          >
            <SocialIcon platform={s.platform} />
          </a>
        </li>
      ))}
    </ul>
  );
}

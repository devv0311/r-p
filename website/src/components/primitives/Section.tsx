import { cn } from "@/lib/cn";
import { Container } from "./Container";

type SectionProps = {
  id?: string;
  children: React.ReactNode;
  /** aria-label for the landmark (use when there's no visible heading) */
  label?: string;
  /** wrap children in a Container (default) or render raw (for full-bleed sections) */
  contained?: boolean;
  className?: string;
};

/**
 * Section wrapper — anchor target + generous vertical rhythm (96px mobile →
 * 160px desktop), the primary carrier of the "premium" feel.
 * (docs/design-system.md §4 spacing, docs/information-architecture.md §4)
 */
export function Section({
  id,
  children,
  label,
  contained = true,
  className,
}: SectionProps) {
  const rhythm = "py-section lg:py-section-lg";
  return (
    <section
      id={id}
      aria-label={label}
      className={cn("relative", rhythm, className)}
    >
      {contained ? <Container>{children}</Container> : children}
    </section>
  );
}

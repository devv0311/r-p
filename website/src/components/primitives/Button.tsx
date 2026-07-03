import { cn } from "@/lib/cn";

type Variant = "primary" | "ghost";

type CommonProps = {
  variant?: Variant;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

type AsLink = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = CommonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const Arrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className="transition-transform duration-[240ms] ease-[var(--ease-standard)] group-hover:translate-x-1"
  >
    <path
      d="M3 8h10M9 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const base =
  "group inline-flex items-center justify-center gap-2.5 font-[family-name:var(--font-mono)] font-medium uppercase tracking-[0.14em] text-[0.75rem] rounded-md transition-colors duration-[240ms] ease-[var(--ease-standard)] select-none";

const variants: Record<Variant, string> = {
  primary:
    "px-7 py-4 border border-[var(--color-line-strong)] text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-base)] focus-visible:bg-[var(--color-ink)] focus-visible:text-[var(--color-base)]",
  ghost:
    "px-1 py-1 text-[var(--color-ink-soft)] hover:text-[var(--color-ink)]",
};

/**
 * Action primitive — renders <a> when href is set, else <button>.
 * (docs/design-system.md §11 Button; motion: hover color fill + arrow nudge)
 */
export function Button(props: AsLink | AsButton) {
  const { variant = "primary", withArrow, className, children, ...rest } =
    props;
  const cls = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, ...anchorRest } =
      rest as React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
    return (
      <a href={href} className={cls} {...anchorRest}>
        {children}
        {withArrow && <Arrow />}
      </a>
    );
  }

  return (
    <button
      className={cls}
      {...(rest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
      {withArrow && <Arrow />}
    </button>
  );
}

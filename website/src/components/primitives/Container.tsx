import { cn } from "@/lib/cn";

type ContainerProps = {
  children: React.ReactNode;
  /** default = max-width + editorial margins; full = edge-to-edge; narrow = reading width */
  variant?: "default" | "full" | "narrow";
  className?: string;
};

/**
 * Layout container. Editorial margins: 20px mobile → clamp(40px,6vw,120px) desktop.
 * (docs/design-system.md §5 grid)
 */
export function Container({
  children,
  variant = "default",
  className,
}: ContainerProps) {
  const base = "w-full px-5 md:px-10 lg:px-[clamp(2.5rem,6vw,7.5rem)]";
  const widths = {
    default: "mx-auto max-w-[var(--container-max)]",
    full: "max-w-none px-0",
    narrow: "mx-auto max-w-[68ch]",
  } as const;
  return (
    <div className={cn(base, widths[variant], className)}>{children}</div>
  );
}

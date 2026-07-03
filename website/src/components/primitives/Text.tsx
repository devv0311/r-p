import { cn } from "@/lib/cn";

type Variant =
  | "display-xl" // hero statement — serif
  | "display-lg" // section headings — serif
  | "display-md" // sub-headings, work titles — serif
  | "statement" // editorial pull-line — serif
  | "metric" // large numerals — serif
  | "title" // card titles — sans
  | "body" // body — sans
  | "caption" // meta captions — sans
  | "kicker"; // overline meta — mono

type TextProps<T extends React.ElementType> = {
  as?: T;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Typographic primitive — the single home of the type scale.
 * Serif carries the design; sans stays quiet; mono is the meta voice.
 */
const variants: Record<Variant, string> = {
  "display-xl":
    "serif text-[clamp(2.875rem,8vw,6.25rem)] leading-[1.02] text-balance",
  "display-lg": "serif text-[clamp(2.125rem,4.6vw,3.75rem)] leading-[1.06]",
  "display-md": "serif text-[clamp(1.5rem,2.8vw,2.25rem)] leading-[1.12]",
  statement: "serif text-[clamp(1.75rem,3.6vw,3rem)] leading-[1.15] text-balance",
  metric:
    "serif tnum text-[clamp(3rem,6vw,5rem)] leading-none tracking-[-0.01em]",
  title: "text-[clamp(1.0625rem,1.4vw,1.1875rem)] font-medium leading-[1.35]",
  body: "text-[clamp(1rem,1vw,1.0625rem)] font-normal leading-[1.65]",
  caption: "text-[0.875rem] leading-[1.5] tracking-[0.01em]",
  kicker: "kicker",
};

export function Text<T extends React.ElementType = "p">({
  as,
  variant = "body",
  className,
  children,
  ...rest
}: TextProps<T>) {
  const Component = (as ?? "p") as React.ElementType;
  return (
    <Component className={cn(variants[variant], className)} {...rest}>
      {children}
    </Component>
  );
}

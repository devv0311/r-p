import { Text } from "@/components/primitives/Text";

/**
 * Editorial section opener — the signature composition:
 * hairline rule → mono meta row (index left · kicker right) → serif heading.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  className,
}: {
  index: string;
  kicker: string;
  title: React.ReactNode;
  className?: string;
}) {
  return (
    <header className={className}>
      <div className="border-t border-[var(--color-line)] pt-4">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <span className="kicker tnum text-[var(--color-gold-text)]">
            {index}
          </span>
          <span className="kicker">{kicker}</span>
        </div>
        <Text as="h2" variant="display-lg" className="max-w-3xl text-balance">
          {title}
        </Text>
      </div>
    </header>
  );
}

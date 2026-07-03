import Image from "next/image";
import { cn } from "@/lib/cn";
import type { Ratio } from "@/content/work";

const ratioClass: Record<Ratio, string> = {
  "16:9": "aspect-video",
  "4:5": "aspect-[4/5]",
  "9:16": "aspect-[9/16]",
  "21:9": "aspect-[21/9]",
};

/**
 * Aspect-ratio media container. Renders a real (optimized) still when `image`
 * is provided, otherwise the graded gradient placeholder. Zero-CLS either way.
 */
export function PosterFrame({
  ratio,
  poster,
  image,
  alt,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority,
  className,
  children,
}: {
  ratio: Ratio;
  poster: string;
  image?: string | null;
  alt?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-md border border-[var(--color-line)] bg-[var(--color-raised)]",
        ratioClass[ratio],
        className,
      )}
      style={{ backgroundImage: poster, backgroundSize: "cover" }}
    >
      {image && (
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {children}
    </div>
  );
}

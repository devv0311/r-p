"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type RevealProps<T extends React.ElementType> = {
  as?: T;
  /** stagger delay in ms (applied as transition-delay) */
  delay?: number;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<T>, "as" | "children" | "className">;

/**
 * Scroll-into-view entrance wrapper — CSS + IntersectionObserver (no JS anim
 * library). Reveals once, then unobserves. Reduced-motion + no-JS are handled
 * in globals.css (.js gating). (docs/interaction-and-motion.md §3.4)
 */
export function Reveal<T extends React.ElementType = "div">({
  as,
  delay = 0,
  className,
  children,
  ...rest
}: RevealProps<T>) {
  const Component = (as ?? "div") as React.ElementType;
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If IO unsupported, reveal immediately.
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("is-visible");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      data-reveal=""
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

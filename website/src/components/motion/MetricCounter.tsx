"use client";

import { useEffect, useRef } from "react";

/** Parse "88K" / "47.7K" → { num, suffix }. */
function parse(value: string) {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { num: 0, suffix: value };
  return { num: parseFloat(match[1]), suffix: match[2] };
}

/**
 * Count-up on scroll-into-view (docs/interaction-and-motion.md §3.7).
 * The final value is server-rendered (SEO / no-JS); the animation is purely
 * presentational, so it writes textContent imperatively instead of going
 * through state. Reduced-motion → final value stays. Tabular numerals
 * prevent reflow.
 */
export function MetricCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const { num, suffix } = parse(value);
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    // Small targets (e.g. "1M+") don't read as a count-up — show them static.
    if (reduce || num < 10 || typeof IntersectionObserver === "undefined")
      return;

    const fmt = (n: number) =>
      (Number.isInteger(num) ? String(Math.round(n)) : n.toFixed(1)) + suffix;

    let raf = 0;
    el.textContent = fmt(0);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          const start = performance.now();
          const duration = 1200;
          const tick = (now: number) => {
            const t = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - t, 3);
            el.textContent = fmt(num * eased);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      el.textContent = value;
    };
  }, [value]);

  return (
    <span ref={ref} className="tnum">
      {value}
    </span>
  );
}

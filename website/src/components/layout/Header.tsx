"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { site } from "@/content/site";
import { Wordmark } from "./Wordmark";
import { Button } from "@/components/primitives/Button";
import { SocialLinks } from "./SocialLinks";

const sectionIds = site.nav.map((n) => n.href.replace("#", ""));

export function Header() {
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  /* Header background + hide-on-scroll-down / reveal-on-up. The gold
     progress hairline writes its transform imperatively — presentational
     only, so no state churn at scroll frequency. */
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > window.innerHeight * 0.8);
        if (y > lastY.current && y > 200) setHidden(true);
        else setHidden(false);
        lastY.current = y;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${
            max > 0 ? Math.min(y / max, 1) : 0
          })`;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Scroll-spy — highlight the section near the top/middle of the viewport */
  useEffect(() => {
    const els = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  /* Drawer (disclosure, not a modal): lock scroll, close on Esc, move focus
     in on open and back to the toggle on close. */
  useEffect(() => {
    if (!open) return;
    const hamburger = hamburgerRef.current;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    drawerRef.current?.querySelector<HTMLElement>("a, button")?.focus();
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      hamburger?.focus();
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-[400ms] ease-[var(--ease-standard)]",
        hidden && !open ? "-translate-y-full" : "translate-y-0",
        solid || open
          ? "border-b border-[var(--color-line)] bg-[var(--color-base)]/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/* Reading-position hairline — a single gold line, the film's timecode */}
      <span
        ref={progressRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-0 block h-px origin-left bg-[var(--color-gold)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div className="mx-auto flex h-16 max-w-[var(--container-max)] items-center justify-between px-5 md:h-20 md:px-10 lg:px-[clamp(2.5rem,6vw,7.5rem)]">
        <Wordmark />

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-4 md:flex lg:gap-8">
          <ul className="flex items-center gap-4 lg:gap-7">
            {site.nav.map((item) => {
              const id = item.href.replace("#", "");
              const isActive = active === id;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "kicker relative transition-colors duration-[240ms] after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-[var(--color-gold)] after:transition-all after:duration-[240ms]",
                      isActive
                        ? "text-[var(--color-gold-text)] after:w-full"
                        : "text-[var(--color-ink-soft)] after:w-0 hover:text-[var(--color-ink)] hover:after:w-full",
                    )}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
          <Button href={site.cta.primary.href} variant="primary" withArrow>
            {site.cta.primary.label}
          </Button>
        </nav>

        {/* Mobile hamburger */}
        <button
          ref={hamburgerRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center md:hidden"
          aria-expanded={open}
          aria-controls="mobile-drawer"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3.5 w-6">
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-[var(--color-ink)] transition-all duration-[240ms]",
                open ? "top-1.5 rotate-45" : "top-0",
              )}
            />
            <span
              className={cn(
                "absolute left-0 top-1.5 block h-px w-6 bg-[var(--color-ink)] transition-opacity duration-[240ms]",
                open ? "opacity-0" : "opacity-100",
              )}
            />
            <span
              className={cn(
                "absolute left-0 block h-px w-6 bg-[var(--color-ink)] transition-all duration-[240ms]",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </span>
        </button>
      </div>

      {/* Mobile drawer */}
      {/* Disclosure region (not a modal): toggle carries aria-expanded/controls;
          inert + aria-hidden gate it while closed. */}
      <div
        id="mobile-drawer"
        ref={drawerRef}
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "fixed inset-0 top-16 origin-top bg-[var(--color-base)] transition-[opacity,transform] duration-[400ms] ease-[var(--ease-standard)] md:hidden",
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      >
        <nav
          aria-label="Mobile"
          className="flex h-full flex-col justify-between px-5 pb-10 pt-8"
        >
          <ul className="flex flex-col">
            {site.nav.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-[var(--color-line)] py-5"
                >
                  <span className="kicker tnum text-[var(--color-ink-mute)]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="serif text-[1.75rem] leading-none text-[var(--color-ink)]">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-6">
            <Button
              href={site.cta.primary.href}
              variant="primary"
              withArrow
              onClick={() => setOpen(false)}
              className="w-full"
            >
              {site.cta.primary.label}
            </Button>
            <SocialLinks />
          </div>
        </nav>
      </div>
    </header>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ButtonLink } from "./ui/button";
import { Wordmark } from "./ui/logo";

const sectionIds = site.nav.map((item) => item.href.slice(1));

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [overNight, setOverNight] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const header = useRef<HTMLElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  // The bar gains a surface once the page moves under it, and takes on the
  // night palette while a dark section sits beneath it. Sampled once per
  // frame along the line through the middle of the bar.
  useEffect(() => {
    const nightSections = Array.from(
      document.querySelectorAll<HTMLElement>('[data-nav-theme="night"]'),
    );
    let frame = 0;

    const update = () => {
      frame = 0;
      const probe = (header.current?.offsetHeight ?? 64) / 2;
      setScrolled(window.scrollY > 8);
      setOverNight(
        nightSections.some((el) => {
          const { top, bottom } = el.getBoundingClientRect();
          return top <= probe && bottom > probe;
        }),
      );
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  // Scrollspy: the section crossing the upper-middle of the viewport is
  // current. The hero is observed too, so returning to the top clears it.
  useEffect(() => {
    const targets = ["top", ...sectionIds, "contact"]
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile menu (disclosure pattern): focus stays on the toggle and the next
  // Tab enters the menu. Lock scroll, make the page behind inert, close on
  // Escape or when the viewport grows past the breakpoint.
  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    const behind = [
      document.getElementById("main"),
      document.querySelector("footer"),
    ];
    root.style.overflow = "hidden";
    behind.forEach((el) => el?.setAttribute("inert", ""));

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setOpen(false);
      menuButton.current?.focus();
    };
    const desktop = window.matchMedia("(min-width: 48rem)");
    const onResize = () => desktop.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onResize);
    return () => {
      root.style.overflow = "";
      behind.forEach((el) => el?.removeAttribute("inert"));
      window.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onResize);
    };
  }, [open]);

  const solid = scrolled || open;
  // The open menu is a paper sheet, so the bar stays light above it.
  const night = overNight && !open;

  const surface = night
    ? "border-night-line bg-night/85 backdrop-blur-md"
    : solid
      ? "border-line bg-paper/88 backdrop-blur-md backdrop-saturate-150"
      : "border-transparent bg-paper/0";

  return (
    <header ref={header} className="fixed inset-x-0 top-0 z-50">
      <div
        aria-hidden="true"
        className={`absolute inset-0 border-b transition-[background-color,border-color] duration-300 ease-out-quart ${surface}`}
      />
      <nav
        aria-label="Primary"
        className="container-page relative flex h-[var(--nav-h)] items-center justify-between"
      >
        <a
          href="#top"
          className={`-ml-1 rounded-sm px-1 py-2 text-[0.9375rem] transition-colors duration-300 ${
            night ? "text-night-ink" : "text-ink"
          }`}
          aria-label={`${site.name}, back to top`}
          onClick={() => setOpen(false)}
        >
          <Wordmark />
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {site.nav.map((item) => {
            const current = active === item.href.slice(1);
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  aria-current={current ? "true" : undefined}
                  className={`group relative flex h-9 items-center gap-2 rounded-sm px-3 text-[0.875rem] tracking-[-0.005em] transition-colors duration-300 ${
                    night
                      ? current
                        ? "text-night-ink"
                        : "text-night-muted hover:text-night-ink"
                      : current
                        ? "text-ink"
                        : "text-muted hover:text-ink"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`size-1 rounded-full bg-accent transition-[opacity,transform] duration-300 ease-out-expo ${
                      current ? "scale-100 opacity-100" : "scale-0 opacity-0"
                    }`}
                  />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <ButtonLink
              href={site.cta.href}
              size="sm"
              variant={night ? "inverse" : "primary"}
            >
              {site.cta.label}
            </ButtonLink>
          </div>

          <button
            ref={menuButton}
            type="button"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
            className={`-mr-2 flex h-10 items-center gap-3 rounded-sm px-2 text-[0.875rem] font-medium transition-colors duration-300 md:hidden ${
              night ? "text-night-ink" : "text-ink"
            }`}
          >
            <span className="tabular">{open ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-2.5 w-4">
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ease-out-expo ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-4 bg-current transition-transform duration-300 ease-out-expo ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[var(--nav-h)] overflow-y-auto bg-paper duration-300 ease-out-quart md:hidden ${
          open
            ? "visible opacity-100 transition-opacity"
            : "invisible opacity-0 transition-[opacity,visibility]"
        }`}
      >
        <div className="container-page flex min-h-full flex-col pb-10 pt-6">
          <ul className="border-t border-line">
            {site.nav.map((item, i) => (
              <li
                key={item.href}
                className={`border-b border-line transition-[opacity,transform] duration-500 ease-out-expo motion-reduce:transition-none ${
                  open ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
                }`}
                style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
              >
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5"
                >
                  <span className="font-serif text-[2rem] leading-none tracking-[-0.02em] text-ink">
                    {item.label}
                  </span>
                  <span aria-hidden="true" className="text-meta text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div
            className={`mt-auto pt-12 transition-opacity duration-500 ease-out-quart ${
              open ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: open ? "220ms" : "0ms" }}
          >
            <ButtonLink
              href={site.cta.href}
              arrow
              className="w-full"
              onClick={() => setOpen(false)}
            >
              {site.cta.label}
            </ButtonLink>
            <p className="mt-6 text-meta text-muted">{site.tagline}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

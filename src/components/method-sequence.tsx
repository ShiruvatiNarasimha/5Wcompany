"use client";

import { useEffect, useRef, useState } from "react";
import type { Question } from "@/content/site";

type MethodSequenceProps = {
  questions: readonly Question[];
  outcomeLabel: string;
};

/**
 * Desktop: a sticky index on the left tracks the question being read on the
 * right. Mobile: a plain sequence — nothing sticky, nothing dimmed.
 */
export function MethodSequence({
  questions,
  outcomeLabel,
}: MethodSequenceProps) {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = steps.current.indexOf(entry.target as HTMLLIElement);
          if (index !== -1) setActive(index);
        }
      },
      // A thin band across the middle of the viewport decides the active step.
      { rootMargin: "-48% 0px -48% 0px" },
    );
    steps.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mt-20 grid gap-x-6 md:mt-28 lg:grid-cols-12">
      {/* Sticky index — desktop only, decorative mirror of the list. */}
      <div className="hidden lg:col-span-5 lg:block">
        <div className="sticky top-[calc(var(--nav-h)+3rem)]">
          <div
            aria-hidden="true"
            className="relative h-[clamp(9rem,13vw,12.5rem)] overflow-hidden"
          >
            {questions.map((q, i) => (
              <span
                key={q.id}
                className={`absolute inset-x-0 top-0 font-serif text-[clamp(9rem,13vw,12.5rem)] font-[300] leading-[0.9] tracking-[-0.04em] tabular transition-[opacity,transform] duration-700 ease-out-expo motion-reduce:transition-none ${
                  i === active
                    ? "translate-y-0 opacity-100"
                    : i < active
                      ? "-translate-y-[30%] opacity-0"
                      : "translate-y-[30%] opacity-0"
                }`}
              >
                {q.n}
              </span>
            ))}
          </div>

          <nav aria-label="Method steps" className="mt-12 max-w-[20rem]">
            <ol className="border-t border-night-line">
              {questions.map((q, i) => (
                <li key={q.id} className="border-b border-night-line">
                  <a
                    href={`#${q.id}`}
                    aria-current={i === active ? "step" : undefined}
                    className={`group flex items-center gap-4 py-3.5 text-[0.9375rem] transition-colors duration-300 ${
                      i === active
                        ? "text-night-ink"
                        : "text-night-muted hover:text-night-ink"
                    }`}
                  >
                    <span className="text-meta tabular">{q.n}</span>
                    <span className="font-serif text-[1.25rem] leading-none tracking-[-0.01em]">
                      {q.word}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`ml-auto h-px bg-accent transition-[width] duration-500 ease-out-expo ${
                        i === active ? "w-8" : "w-0"
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </div>

      <ol className="lg:col-span-6 lg:col-start-7">
        {questions.map((q, i) => (
          <li
            key={q.id}
            id={q.id}
            ref={(el) => {
              steps.current[i] = el;
            }}
            className={`border-t border-night-line py-12 transition-opacity duration-500 ease-out-quart first:border-t-0 first:pt-0 motion-reduce:transition-none md:py-16 lg:border-t-0 lg:py-[min(15vh,8.5rem)] lg:first:pt-[min(4vh,2rem)] ${
              i === active
                ? "lg:opacity-100"
                : "lg:opacity-40 lg:hover:opacity-100 lg:focus-within:opacity-100"
            }`}
          >
            <span
              aria-hidden="true"
              className="block font-serif text-[4.5rem] font-[300] leading-[0.9] tracking-[-0.04em] tabular lg:hidden"
            >
              {q.n}
            </span>
            <h3 className="mt-6 font-serif text-heading font-[400] md:text-[2.5rem] md:leading-[1.1] lg:mt-0">
              <span className="sr-only">
                Question {i + 1} of {questions.length}:{" "}
              </span>
              {q.question}
            </h3>
            <p className="mt-5 max-w-[33em] text-body text-night-muted">
              {q.body}
            </p>
            <div className="mt-8 grid grid-cols-[6rem_1fr] items-baseline border-t border-night-line pt-5">
              <span className="text-meta text-night-muted">{outcomeLabel}</span>
              <p className="text-[1.0625rem] leading-snug text-night-ink">
                {q.outcome}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

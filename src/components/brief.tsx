import type { CSSProperties } from "react";
import { questions, site } from "@/content/site";
import { Monogram } from "./ui/logo";
import { SectionRule } from "./ui/section-rule";

export function Brief() {
  const { brief } = site;

  return (
    <section
      id="brief"
      aria-labelledby="brief-title"
      className="section-y relative overflow-hidden bg-paper-2"
    >
      {/* Drafting-table dot grid, fading toward the edges. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-line-strong)_1px,transparent_1.2px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_55%,black,transparent)] opacity-70"
      />

      <div className="container-page relative">
        <SectionRule label={brief.label} aside={brief.aside} />

        <div className="mt-14 grid items-start gap-x-6 gap-y-16 md:mt-20 lg:grid-cols-12">
          <div className="lg:sticky lg:top-[calc(var(--nav-h)+3rem)] lg:col-span-5">
            <h2
              id="brief-title"
              data-reveal
              className="max-w-[11em] font-serif text-title font-[380]"
            >
              {brief.title}
            </h2>
            <p data-reveal className="mt-6 max-w-[30em] text-lede text-ink-2">
              {brief.lede}
            </p>
            <ul
              data-reveal
              className="mt-10 max-w-[26rem] border-t border-line"
            >
              {brief.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-3 border-b border-line py-3.5 text-[0.9375rem] text-ink"
                >
                  <span
                    aria-hidden="true"
                    className="size-1 shrink-0 bg-accent"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 lg:col-start-7">
            <BriefDocument />
          </div>
        </div>
      </div>
    </section>
  );
}

/** A typeset sheet showing where the five outcomes land. */
function BriefDocument() {
  const doc = site.brief.document;

  return (
    <figure
      data-reveal
      aria-label="Example layout of a 5W project brief"
      className="rounded-sheet border border-line bg-surface shadow-[0_1px_0_rgba(18,18,16,0.04),0_30px_60px_-30px_rgba(18,18,16,0.22)]"
    >
      <div className="flex items-center justify-between border-b border-line px-6 py-4 md:px-10">
        <Monogram className="h-3.5 w-auto text-ink" />
        <span className="text-meta text-muted">
          {doc.kicker} <span aria-hidden="true">·</span> {doc.meta}
        </span>
      </div>

      <div className="px-6 pb-4 pt-10 md:px-10 md:pt-14">
        <p className="font-serif text-[2rem] leading-none tracking-[-0.02em] text-ink md:text-[2.5rem]">
          {doc.title}
        </p>
        <p className="mt-3 text-[0.9375rem] text-muted">{doc.subtitle}</p>
      </div>

      <ol className="px-6 pb-2 md:px-10">
        {questions.map((q, i) => (
          <li
            key={q.id}
            data-reveal
            style={{ "--d": `${120 + i * 90}ms` } as CSSProperties}
            className="relative grid grid-cols-[2.25rem_1fr] gap-x-3 py-5 first:mt-6 md:grid-cols-[3rem_1fr] md:py-6"
          >
            <span
              aria-hidden="true"
              data-rule
              className="absolute inset-x-0 top-0 h-px bg-line"
            />
            <span className="pt-1 text-meta text-muted tabular">{q.n}</span>
            <div>
              <p className="font-serif text-[1.25rem] leading-tight tracking-[-0.01em] text-ink md:text-[1.375rem]">
                {q.question}
              </p>
              <p className="mt-2 text-[0.9375rem] leading-snug text-ink-2">
                {q.outcome}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <figcaption className="flex items-center gap-3 border-t border-line px-6 py-4 text-meta text-muted md:px-10">
        <span aria-hidden="true" className="size-1 shrink-0 bg-accent" />
        {doc.footer}
      </figcaption>
    </figure>
  );
}

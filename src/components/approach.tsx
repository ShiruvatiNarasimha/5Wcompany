import type { CSSProperties } from "react";
import { questions, site } from "@/content/site";
import { SectionRule } from "./ui/section-rule";

export function Approach() {
  const { approach } = site;

  return (
    <section
      id="approach"
      aria-labelledby="approach-title"
      className="section-y"
    >
      <div className="container-page">
        <SectionRule label={approach.label} aside={approach.aside} />

        <h2
          id="approach-title"
          data-reveal
          className="mt-14 font-serif text-headline font-[380] md:mt-20"
        >
          <span className="block text-muted">{approach.leadIn}</span>
          <span className="block text-ink">{approach.statement}</span>
        </h2>

        <div className="mt-16 grid gap-x-6 gap-y-14 md:mt-24 lg:grid-cols-12">
          <div className="space-y-5 lg:col-span-4" data-reveal>
            {approach.body.map((paragraph) => (
              <p key={paragraph} className="max-w-[34em] text-body text-ink-2">
                {paragraph}
              </p>
            ))}
          </div>

          {/* The five failure modes, one per unasked question. */}
          <div className="lg:col-span-7 lg:col-start-6">
            <div
              aria-hidden="true"
              className="grid grid-cols-[5.5rem_1fr] pb-3 text-meta text-muted sm:grid-cols-[8rem_1fr]"
            >
              <span>{approach.tableHeads[0]}</span>
              <span>{approach.tableHeads[1]}</span>
            </div>
            <dl className="border-t border-ink">
              {questions.map((q, i) => (
                <div
                  key={q.id}
                  data-reveal
                  style={{ "--d": `${i * 70}ms` } as CSSProperties}
                  className="grid grid-cols-[5.5rem_1fr] items-baseline border-b border-line py-5 sm:grid-cols-[8rem_1fr] md:py-6"
                >
                  <dt className="font-serif text-[1.5rem] leading-none tracking-[-0.015em] text-ink md:text-[1.75rem]">
                    {q.word}
                  </dt>
                  <dd className="text-lede text-ink-2">{q.unasked}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

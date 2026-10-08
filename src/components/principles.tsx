import type { CSSProperties } from "react";
import { site } from "@/content/site";
import { SectionRule } from "./ui/section-rule";

export function Principles() {
  const { principles } = site;

  return (
    <section
      id="principles"
      aria-labelledby="principles-title"
      className="section-y"
    >
      <div className="container-page">
        <SectionRule label={principles.label} aside={principles.aside} />

        <h2
          id="principles-title"
          data-reveal
          className="mt-14 max-w-[12em] font-serif text-title font-[380] md:mt-20"
        >
          {principles.title}
        </h2>

        {/* A ruled two-by-two, not a grid of cards: the hairlines do the work. */}
        <ol className="mt-14 grid border-t border-ink md:mt-20 md:grid-cols-2">
          {principles.items.map((item, i) => (
            <li
              key={item.title}
              data-reveal
              style={{ "--d": `${(i % 2) * 90}ms` } as CSSProperties}
              className="flex flex-col border-b border-line py-10 md:py-14 md:odd:border-r md:odd:pr-12 md:even:pl-12 lg:odd:pr-20 lg:even:pl-20"
            >
              <span className="text-meta text-muted tabular">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-10 font-serif text-heading font-[400] md:mt-16">
                {item.title}
              </h3>
              <p className="mt-4 max-w-[30em] text-body text-ink-2">
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

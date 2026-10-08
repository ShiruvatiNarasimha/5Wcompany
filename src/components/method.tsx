import { questions, site } from "@/content/site";
import { MethodSequence } from "./method-sequence";
import { SectionRule } from "./ui/section-rule";

export function Method() {
  const { method } = site;

  return (
    <section
      id="method"
      data-nav-theme="night"
      aria-labelledby="method-title"
      className="section-y bg-night text-night-ink"
    >
      <div className="container-page">
        <SectionRule label={method.label} aside={method.aside} tone="night" />

        <div className="mt-14 grid gap-x-6 gap-y-8 md:mt-20 lg:grid-cols-12">
          <h2
            id="method-title"
            data-reveal
            className="max-w-[12em] font-serif text-title font-[380] lg:col-span-6"
          >
            {method.title}
          </h2>
          <p
            data-reveal
            className="max-w-[30em] text-lede text-night-muted lg:col-span-5 lg:col-start-8 lg:pt-2"
          >
            {method.lede}
          </p>
        </div>

        <MethodSequence
          questions={questions}
          outcomeLabel={method.outcomeLabel}
        />
      </div>
    </section>
  );
}

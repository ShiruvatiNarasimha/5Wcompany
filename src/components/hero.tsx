import type { CSSProperties } from "react";
import { questions, site } from "@/content/site";
import { ButtonLink, TextLink } from "./ui/button";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Hero() {
  const { hero } = site;
  const words = hero.headline.split(" ");

  return (
    <section
      id="top"
      aria-labelledby="hero-title"
      className="relative flex flex-col lg:min-h-[100svh]"
    >
      <div className="container-page flex flex-1 flex-col pt-[calc(var(--nav-h)+clamp(3.5rem,2rem+6vw,7.5rem))]">
        <p className="intro text-meta text-muted" style={delay(0)}>
          {hero.eyebrow}
        </p>

        <h1
          id="hero-title"
          className="mt-7 max-w-[10.5em] font-serif text-display font-[380] text-ink md:mt-9"
        >
          {words.map((word, i) => (
            <span key={i}>
              <span className="mask-word">
                <span style={{ "--i": i } as CSSProperties}>{word}</span>
              </span>
              {i < words.length - 1 && " "}
            </span>
          ))}
        </h1>

        <div className="mt-10 grid gap-x-6 md:mt-14 md:grid-cols-12">
          <div className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7">
            <p
              className="intro max-w-[31em] text-lede text-ink-2"
              style={delay(520)}
            >
              {hero.lede}
            </p>
            <div
              className="intro mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
              style={delay(640)}
            >
              <ButtonLink href={site.cta.href} arrow>
                {site.cta.label}
              </ButtonLink>
              <TextLink
                href={hero.secondary.href}
                icon="down"
                className="text-ink"
              >
                {hero.secondary.label}
              </TextLink>
            </div>
          </div>
        </div>

        <nav aria-label={hero.indexLabel} className="mt-auto pt-20 md:pt-24">
          <div className="relative">
            <span
              aria-hidden="true"
              className="intro-rule absolute inset-x-0 top-0 h-px bg-line"
              style={delay(700)}
            />
            <ol className="-mx-[var(--gutter)] flex snap-x snap-mandatory scroll-px-[var(--gutter)] overflow-x-auto px-[var(--gutter)] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-5 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {questions.map((q, i) => (
                <li
                  key={q.id}
                  className="intro w-[46%] shrink-0 snap-start md:w-auto"
                  style={delay(760 + i * 70)}
                >
                  <a
                    href={`#${q.id}`}
                    className="group relative block pb-8 pr-5 pt-5 md:pb-10 md:pt-6"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-ink transition-transform duration-500 ease-out-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                    />
                    <span className="text-meta text-muted transition-colors duration-300 group-hover:text-accent-ink">
                      {q.n}
                    </span>
                    <span className="mt-4 block font-serif text-[1.3125rem] leading-[1.2] tracking-[-0.012em] text-ink lg:text-[1.5rem]">
                      {q.question}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </div>
    </section>
  );
}

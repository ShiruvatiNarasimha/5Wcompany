import { cacheLife } from "next/cache";
import { site } from "@/content/site";
import { ArrowUp } from "./ui/icons";
import { Wordmark } from "./ui/logo";

// Resolved at build time and refreshed with the cache, rather than on every
// request — the year is the only moving part of an otherwise static page.
async function CurrentYear() {
  "use cache";
  cacheLife("max");
  return new Date().getFullYear();
}

export async function Footer() {
  const year = await CurrentYear();

  return (
    <footer data-nav-theme="night" className="bg-night text-night-ink">
      <div className="container-page">
        <div className="mt-[clamp(6rem,4rem+8vw,10rem)] grid gap-x-6 gap-y-12 border-t border-night-line pt-12 md:grid-cols-12 md:pt-14">
          <div className="md:col-span-5">
            <a
              href="#top"
              className="inline-block rounded-sm text-[1.0625rem]"
              aria-label={`${site.name}, back to top`}
            >
              <Wordmark />
            </a>
            <p className="mt-5 font-serif text-[1.375rem] leading-snug tracking-[-0.01em] text-night-muted">
              {site.tagline}
            </p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3 md:col-start-7">
            <ul className="space-y-3">
              {site.nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="link-underline text-[0.9375rem] text-night-muted transition-colors duration-200 hover:text-night-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <p className="text-meta text-night-muted">Contact</p>
            <a
              href={`mailto:${site.email}`}
              className="link-underline mt-3 inline-block text-[0.9375rem] text-night-ink"
            >
              {site.email}
            </a>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between gap-6 border-t border-night-line py-6 text-meta text-night-muted md:mt-24">
          <p>
            © {year} {site.name}
          </p>
          <a
            href="#top"
            className="group inline-flex items-center gap-2 transition-colors duration-200 hover:text-night-ink"
          >
            {site.footer.backToTop}
            <ArrowUp className="size-3 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

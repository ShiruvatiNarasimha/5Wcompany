import { site } from "@/content/site";
import { CopyEmail } from "./copy-email";
import { ButtonLink } from "./ui/button";
import { SectionRule } from "./ui/section-rule";

export function Contact() {
  const { contact, email } = site;

  return (
    <section
      id="contact"
      data-nav-theme="night"
      aria-labelledby="contact-title"
      className="bg-night pt-[var(--section-y)] text-night-ink"
    >
      <div className="container-page">
        <SectionRule label={contact.label} aside={contact.aside} tone="night" />

        <h2
          id="contact-title"
          data-reveal
          className="mt-16 max-w-[9em] font-serif text-display font-[360] md:mt-24"
        >
          {contact.title}
        </h2>

        <div className="mt-12 grid gap-x-6 md:mt-16 md:grid-cols-12">
          <div
            data-reveal
            className="md:col-span-8 md:col-start-5 lg:col-span-6 lg:col-start-7"
          >
            <p className="max-w-[30em] text-lede text-night-muted">
              {contact.lede}
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <ButtonLink href={`mailto:${email}`} variant="inverse" arrow>
                {contact.primary}
              </ButtonLink>
              <CopyEmail
                email={email}
                idleLabel={contact.copy.idle}
                doneLabel={contact.copy.done}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

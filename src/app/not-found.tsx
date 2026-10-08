import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/logo";

export default function NotFound() {
  return (
    <main
      id="main"
      className="container-page flex min-h-[100svh] flex-col justify-between py-10"
    >
      <Link
        href="/"
        className="self-start text-[0.9375rem]"
        aria-label="5W Company, home"
      >
        <Wordmark />
      </Link>
      <div>
        <p className="text-meta text-muted">404</p>
        <h1 className="mt-6 max-w-[10em] font-serif text-headline font-[380]">
          Where? Not here.
        </h1>
        <p className="mt-6 max-w-[28em] text-lede text-ink-2">
          This page doesn’t exist. The rest of the site does.
        </p>
        <div className="mt-10">
          <ButtonLink href="/" arrow>
            Back to the start
          </ButtonLink>
        </div>
      </div>
      <span />
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";

type CopyEmailProps = {
  email: string;
  idleLabel: string;
  doneLabel: string;
};

/** The address, visible and one click from the clipboard. */
export function CopyEmail({ email, idleLabel, doneLabel }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
    } catch {
      // Clipboard can be unavailable (permissions, insecure context); the
      // address stays visible and selectable, so there's nothing to recover.
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className="group inline-flex h-12 items-center justify-between gap-5 rounded-control border border-night-line px-5 text-left transition-colors duration-200 hover:border-night-muted sm:justify-start"
      >
        <span className="font-mono text-[0.875rem] tracking-[-0.01em] text-night-ink">
          {email}
        </span>
        <span
          aria-hidden="true"
          className={`text-meta transition-colors duration-200 ${
            copied
              ? "text-accent"
              : "text-night-muted group-hover:text-night-ink"
          }`}
        >
          {copied ? doneLabel : idleLabel}
        </span>
        <span className="sr-only">{idleLabel} email address</span>
      </button>
      <span role="status" className="sr-only">
        {copied ? `${email} copied to clipboard` : ""}
      </span>
    </>
  );
}

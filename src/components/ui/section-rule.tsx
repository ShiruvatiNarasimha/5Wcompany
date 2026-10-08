type SectionRuleProps = {
  label: string;
  /** Short running-header note, shown at the far end of the rule. */
  aside?: string;
  tone?: "paper" | "night";
};

/**
 * The ruled header that opens every section, like the running head of a
 * printed report: label, hairline, note.
 */
export function SectionRule({
  label,
  aside,
  tone = "paper",
}: SectionRuleProps) {
  const night = tone === "night";
  return (
    <div data-reveal className="flex items-center gap-4 text-meta">
      <span className={night ? "text-night-ink" : "text-ink"}>{label}</span>
      <span
        aria-hidden="true"
        data-rule
        className={`h-px flex-1 ${night ? "bg-night-line" : "bg-line"}`}
      />
      {aside && (
        <span
          aria-hidden="true"
          className={`hidden sm:inline ${night ? "text-night-muted" : "text-muted"}`}
        >
          {aside}
        </span>
      )}
    </div>
  );
}

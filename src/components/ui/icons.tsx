type IconProps = { className?: string };

// Drawn on a 16px grid with square caps to match the hairline language of
// the page. All icons are decorative; the surrounding text carries meaning.

export function ArrowRight({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M2 8h11M9 4l4 4-4 4" />
    </svg>
  );
}

export function ArrowDown({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 2v11M4 9l4 4 4-4" />
    </svg>
  );
}

export function ArrowUp({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M8 14V3M4 7l4-4 4 4" />
    </svg>
  );
}

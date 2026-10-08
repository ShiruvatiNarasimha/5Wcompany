import type { ComponentProps, ReactNode } from "react";
import { ArrowDown, ArrowRight } from "./icons";

type Variant = "primary" | "inverse";
type Size = "sm" | "md";

const base =
  "group inline-flex items-center justify-center gap-3 whitespace-nowrap rounded-control font-medium tracking-[-0.005em] select-none transition-[background-color,color,transform] duration-200 ease-out-quart active:scale-[0.985]";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-paper hover:bg-ink-2",
  inverse: "bg-night-ink text-night hover:bg-white",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-[0.875rem]",
  md: "h-12 px-5 text-[0.9375rem]",
};

type ButtonLinkProps = Omit<ComponentProps<"a">, "children"> & {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  /** Trailing arrow that nudges forward on hover. */
  arrow?: boolean;
};

export function ButtonLink({
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className = "",
  ...rest
}: ButtonLinkProps) {
  return (
    <a
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...rest}
    >
      {children}
      {arrow && (
        <ArrowRight className="size-3.5 transition-transform duration-300 ease-out-expo group-hover:translate-x-0.5" />
      )}
    </a>
  );
}

type TextLinkProps = Omit<ComponentProps<"a">, "children"> & {
  children: ReactNode;
  icon?: "right" | "down";
};

/** Quiet secondary action: text with a drawn underline and a moving arrow. */
export function TextLink({
  children,
  icon = "right",
  className = "",
  ...rest
}: TextLinkProps) {
  const Icon = icon === "down" ? ArrowDown : ArrowRight;
  const nudge =
    icon === "down"
      ? "group-hover:translate-y-0.5"
      : "group-hover:translate-x-0.5";
  return (
    <a
      className={`group inline-flex h-12 items-center gap-2.5 text-[0.9375rem] font-medium tracking-[-0.005em] ${className}`}
      {...rest}
    >
      <span className="link-underline pb-0.5">{children}</span>
      <Icon
        className={`size-3.5 transition-transform duration-300 ease-out-expo ${nudge}`}
      />
    </a>
  );
}

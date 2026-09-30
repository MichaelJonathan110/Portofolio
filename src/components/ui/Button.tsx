"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "quiet";
type Size = "sm" | "md" | "lg";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  trailing?: ReactNode;
}

interface LinkProps extends CommonProps { href: string }
interface ActionProps extends CommonProps { href?: undefined; onClick?: () => void }

type Props = LinkProps | ActionProps;

const SIZES: Record<Size, string> = {
  sm: "h-9 px-4 text-[0.68rem]",
  md: "h-11 px-6 text-[0.72rem]",
  lg: "h-14 px-8 text-[0.78rem]",
};

/**
 * Expert CTA. Keeps the original variant/size API so call sites are untouched.
 * Adds: pointer-tracked sheen, curtain fill that wipes up, arrow that travels,
 * and a hard focus ring. No border-radius soup, no bouncy easing.
 */
export function Button({ children, variant = "primary", size = "md", className, trailing, ...rest }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  const primary = variant === "primary";
  const quiet = variant === "quiet";

  const cls = cn(
    "mjs-btn group relative inline-flex select-none items-center justify-center gap-3",
    "overflow-hidden whitespace-nowrap font-medium uppercase tracking-[0.2em]",
    "transition-colors duration-300 ease-editorial",
    SIZES[size],
    quiet
      ? "text-muted hover:text-paper"
      : primary
        ? "border border-signal text-signal hover:text-ink"
        : "border border-white/20 text-paper hover:border-white/50",
    className
  );

  const inner = (
    <>
      {!quiet && (
        <span
          aria-hidden="true"
          className={cn(
            "absolute inset-0 z-0 origin-bottom scale-y-0 transition-transform duration-500 ease-editorial group-hover:scale-y-100",
            primary ? "bg-signal" : "bg-paper"
          )}
        />
      )}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(200px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.28), transparent 62%)" }}
      />
      <span className="relative z-10 flex items-center gap-3">
        {children}
        {trailing !== undefined ? (
          trailing
        ) : (
          <span
            aria-hidden="true"
            className="transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
          >
            &rarr;
          </span>
        )}
      </span>
    </>
  );

  if ("href" in rest && rest.href) {
    const href = rest.href;
    if (/^https?:|^mailto:/.test(href)) {
      return (
        <a ref={ref as React.RefObject<HTMLAnchorElement>} href={href} target="_blank" rel="noreferrer"
           onMouseMove={onMove} className={cls}>
          {inner}
        </a>
      );
    }
    return (
      <Link ref={ref as React.RefObject<HTMLAnchorElement>} href={href} onMouseMove={onMove} className={cls}>
        {inner}
      </Link>
    );
  }

  return (
    <button ref={ref as React.RefObject<HTMLButtonElement>} type="button"
            onClick={(rest as ActionProps).onClick} onMouseMove={onMove} className={cls}>
      {inner}
    </button>
  );
}

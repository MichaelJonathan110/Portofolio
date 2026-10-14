"use client";

import { cn } from "@/lib/utils";
import { DownloadIcon } from "@/components/ui/Icons";

interface Props {
  href: string;
  label?: string;
  hint?: string;
  size?: "md" | "lg";
  className?: string;
}

const SIZES = {
  md: {
    root: "h-12",
    action: "gap-2.5 pl-5 pr-4 text-[0.7rem]",
    glyph: "h-4 w-4",
    meta: "px-3.5 text-[0.6rem]",
  },
  lg: {
    root: "h-14",
    action: "gap-3 pl-7 pr-5 text-[0.78rem]",
    glyph: "h-[1.05rem] w-[1.05rem]",
    meta: "px-5 text-[0.66rem]",
  },
} as const;

/**
 * The CV action. A single solid signal block split by a hairline: the action on
 * the left, the real file spec on the right. Resting state carries the accent so
 * it reads as the page's primary action; hover inverts to paper, and that state
 * change IS the feedback. No cursor gradient, no shine sweep, no glow, no lift.
 * The one download glyph is a direction cue (the action genuinely has a
direction), not decoration.
 */
export function CvButton({ href, label = "Download CV", hint, size = "lg", className }: Props) {
  const s = SIZES[size];

  return (
    <a
      href={href}
      download
      aria-label={hint ? `${label} — ${hint}` : label}
      className={cn(
        "mjs-cv group inline-flex select-none items-stretch",
        "bg-signal text-ink transition-colors duration-200 ease-editorial hover:bg-paper",
        "outline-none focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        s.root,
        className
      )}
    >
      <span className={cn("flex items-center font-medium uppercase tracking-[0.2em]", s.action)}>
        <DownloadIcon
          aria-hidden="true"
          className={cn("shrink-0 transition-transform duration-300 ease-editorial group-hover:translate-y-0.5", s.glyph)}
        />
        {label}
      </span>

      {hint ? (
        <>
          <span aria-hidden="true" className="my-3 w-px shrink-0 bg-ink/25" />
          <span className={cn("flex items-center font-mono uppercase tracking-[0.18em] text-ink/70", s.meta)}>
            {hint}
          </span>
        </>
      ) : null}
    </a>
  );
}

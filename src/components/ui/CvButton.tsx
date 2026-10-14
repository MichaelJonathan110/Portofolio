"use client";

import { useRef } from "react";
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
  md: "h-12 gap-4 pl-5 pr-4 text-[0.72rem]",
  lg: "h-14 gap-6 pl-7 pr-5 text-[0.78rem]",
} as const;

const BADGE = {
  md: "h-8 w-8",
  lg: "h-10 w-10",
} as const;

/**
 * The CV call-to-action. Solid signal fill so it reads as the single most
 * important action on the page; hard edges, tracked mono caps, and a download
 * arrow that drops on hover. No rounded corners, no bounce.
 */
export function CvButton({ href, label = "Download CV", hint, size = "lg", className }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
    el.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
  };

  return (
    <a
      ref={ref}
      href={href}
      download
      onMouseMove={onMove}
      aria-label={hint ? `${label} (${hint})` : label}
      className={cn(
        "mjs-cv group relative inline-flex select-none items-center justify-between overflow-hidden",
        "bg-signal font-medium uppercase tracking-[0.2em] text-ink",
        "outline-none transition-transform duration-300 ease-editorial hover:-translate-y-0.5",
        "focus-visible:ring-2 focus-visible:ring-paper focus-visible:ring-offset-2 focus-visible:ring-offset-ink",
        SIZES[size],
        className
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: "radial-gradient(220px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.5), transparent 62%)" }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 z-0 w-1/3 -skew-x-12 bg-white/30 opacity-0 transition-all duration-700 ease-editorial group-hover:left-[130%] group-hover:opacity-100"
      />

      <span className="relative z-10 flex flex-col items-start leading-none">
        <span className="flex items-center gap-2 whitespace-nowrap">{label}</span>
        {hint ? (
          <span className="mt-1.5 font-mono text-[0.58rem] font-normal tracking-[0.24em] text-ink/65">
            {hint}
          </span>
        ) : null}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "relative z-10 grid shrink-0 place-items-center bg-ink text-signal transition-transform duration-500 ease-editorial group-hover:translate-y-1",
          BADGE[size]
        )}
      >
        <DownloadIcon className="h-4 w-4" />
      </span>
    </a>
  );
}

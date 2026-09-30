"use client";

import { useEffect, useRef, useState } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Reveal } from "@/components/ui/Reveal";

/** Line-art drawn in-house: honest visuals, no stock-photo stand-ins. */
const GYM = (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round">
      <path d="M20 60h160" />
      <rect x="8" y="42" width="12" height="36" rx="2" />
      <rect x="180" y="42" width="12" height="36" rx="2" />
      <rect x="30" y="46" width="9" height="28" rx="2" />
      <rect x="161" y="46" width="9" height="28" rx="2" />
      <circle cx="100" cy="60" r="14" />
      <path d="M92 60h16M100 52v16" />
    </g>
  </svg>
);

const COURT = (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2.5" fill="none">
      <rect x="14" y="16" width="172" height="88" />
      <path d="M100 16v88" />
      <circle cx="100" cy="60" r="18" />
      <path d="M14 42h30v36H14M186 42h-30v36h30" />
      <path d="M60 20l-8 8M140 100l8-8" strokeLinecap="round" />
    </g>
  </svg>
);

const NODES = (
  <svg viewBox="0 0 200 120" className="h-full w-full" aria-hidden="true">
    <g stroke="currentColor" strokeWidth="2" fill="none">
      <path d="M40 30l50 30M90 60l50-30M90 60l40 34M40 30l-4 46M36 76l54-16M130 94l-40-34" />
      <circle cx="40" cy="30" r="7" fill="currentColor" />
      <circle cx="90" cy="60" r="9" fill="currentColor" />
      <circle cx="140" cy="30" r="6" />
      <circle cx="130" cy="94" r="7" />
      <circle cx="36" cy="76" r="6" />
    </g>
  </svg>
);

const PANELS = [
  {
    id: "gym",
    title: "The gym",
    tag: "CONSISTENCY",
    body: "Most of my week is split between a keyboard and a rack. Training is the part of my life where progress is measured in months, not sprints, and I like that it works the same way as learning a dataset: show up, repeat, adjust.",
    art: GYM,
  },
  {
    id: "court",
    title: "Court sport",
    tag: "RESET",
    body: "I play whenever there is a game to be had. It is the fastest way I know to stop thinking about a bug and come back to it with a clearer head.",
    art: COURT,
  },
  {
    id: "curiosity",
    title: "Learning by curiosity",
    tag: "PULL",
    body: "I pick things up because they annoy me until I understand them - how a database decides on an index, why a model overfits, how a web page can move the way it does. That curiosity is what pulls me into new stacks.",
    art: NODES,
  },
];

function Panel({ p, i, onOpen }: { p: (typeof PANELS)[number]; i: number; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement | null>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg) translateY(-4px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "";
  };

  return (
    <Reveal delay={i * 0.1}>
      <button
        ref={ref}
        type="button"
        onClick={onOpen}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        aria-label={`Open ${p.title} in detail`}
        className="mjs-card group flex h-full w-full flex-col text-left transition-transform duration-300 ease-editorial will-change-transform"
      >
        <div className="relative h-40 w-full overflow-hidden border-b border-white/10 bg-white/[0.02] text-paper/45">
          <div className="mjs-grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative flex h-full items-center justify-center p-6 transition-colors duration-500 group-hover:text-signal">
            {p.art}
          </div>
        </div>

        <div className="flex flex-1 flex-col p-7">
          <span className="mjs-num">{String(i + 1).padStart(2, "0")} / {p.tag}</span>
          <h3 className="mjs-stamp mt-4 text-2xl text-paper">{p.title}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted">{p.body}</p>
          <span className="mt-6 inline-flex items-center gap-2 font-mono text-[0.64rem] uppercase tracking-[0.24em] text-signal opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            Zoom in <span aria-hidden="true">&rarr;</span>
          </span>
        </div>
      </button>
    </Reveal>
  );
}

export function BeyondCode() {
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open === null ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const active = open === null ? null : PANELS[open];

  return (
    <section id="beyond" className="relative mx-auto w-full max-w-shell px-6 py-24 sm:py-32">
      <SectionHeader
        index="06"
        eyebrow="Away from the screen"
        title="The rest of the week shapes the work more than any tool."
        description="Three things outside the terminal. Open one to look closer."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {PANELS.map((p, i) => (
          <Panel key={p.id} p={p} i={i} onOpen={() => setOpen(i)} />
        ))}
      </div>

      {active ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/85 p-4 backdrop-blur-md sm:p-8"
          onClick={() => setOpen(null)}
        >
          <div
            className="mjs-card relative w-full max-w-3xl overflow-hidden bg-ink-soft p-8 sm:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute right-5 top-5 font-mono text-xs uppercase tracking-[0.24em] text-muted transition-colors hover:text-signal"
            >
              Close [esc]
            </button>

            <span className="mjs-num">{active.tag}</span>
            <h3 className="mjs-display mt-5 text-4xl sm:text-5xl">
              {active.title}
            </h3>

            <div className="mt-8 h-56 w-full text-signal/70 sm:h-72">
              <div className="relative h-full w-full">
                <div className="mjs-grid-bg absolute inset-0 opacity-40" aria-hidden="true" />
                <div className="relative flex h-full items-center justify-center">{active.art}</div>
              </div>
            </div>

            <p className="mt-8 max-w-prose text-base leading-relaxed text-muted">{active.body}</p>
          </div>
        </div>
      ) : null}
    </section>
  );
}

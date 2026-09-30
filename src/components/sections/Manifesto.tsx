"use client";

import { useEffect, useRef, useState } from "react";

const LINES = [
  "MOST OF WHAT I BUILD",
  "STARTS WITH A MESSY",
  "DATASET AND ONE",
  "QUESTION WORTH",
  "ASKING.",
];

/**
 * Pinned expand section. The block stays fixed while the page scrolls past a
 * tall wrapper; scroll progress drives scale, letter-spacing and per-line
 * reveal, so the statement opens up instead of sliding by.
 */
export function Manifesto() {
  const wrap = useRef<HTMLDivElement | null>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setP(1);
      return;
    }
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const done = -r.top;
        setP(total <= 0 ? 1 : Math.min(1, Math.max(0, done / total)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  const eased = p * p * (3 - 2 * p);

  return (
    <section id="manifesto" aria-label="Statement" className="relative border-y border-white/10 bg-ink-soft">
      <div ref={wrap} className="relative h-[240vh]">
        <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
          <div
            aria-hidden="true"
            className="mjs-grid-bg pointer-events-none absolute inset-0 opacity-40"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ background: `radial-gradient(circle, rgba(255,92,40,${0.05 + eased * 0.16}), transparent 70%)` }}
          />

          <div className="relative mx-auto w-full max-w-shell px-6">
            <div className="flex items-center gap-4">
              <span className="mjs-dot" aria-hidden="true" />
              <span className="mjs-pixel text-[0.62rem] tracking-[0.2em] text-signal">
                {String(Math.round(eased * 100)).padStart(3, "0")}%
              </span>
              <span className="mjs-num">The approach</span>
            </div>

            <p className="mt-8 font-display font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-paper">
              {LINES.map((line, i) => {
                const local = Math.min(1, Math.max(0, eased * LINES.length - i));
                return (
                  <span
                    key={line}
                    className="block"
                    style={{
                      fontSize: `clamp(1.6rem, ${4.2 + eased * 3.4}vw, ${5.4 + eased * 3}rem)`,
                      opacity: 0.14 + local * 0.86,
                      letterSpacing: `${(1 - eased) * 0.06}em`,
                    }}
                  >
                    {line}
                  </span>
                );
              })}
            </p>

            <div className="mt-10 h-px w-full bg-white/10">
              <div
                className="h-px bg-signal transition-[width] duration-150 ease-out"
                style={{ width: `${eased * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

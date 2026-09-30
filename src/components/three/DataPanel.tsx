"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useWebGL } from "./useWebGL";
import { useDeviceTier } from "@/hooks/useDeviceTier";

const PanelScene = dynamic(() => import("./PanelScene").then((m) => m.PanelScene), {
  ssr: false,
  loading: () => null,
});

/**
 * A framed 3D viewport for the About section. Unlike the hero layer, this is a
 * real, visible panel: it owns its box, its border and its own hover state, so
 * the graph is the subject rather than a background behind text.
 */
export function DataPanel({ className }: { className?: string }) {
  const webgl = useWebGL();
  const tier = useDeviceTier();
  const [armed, setArmed] = useState(false);
  const [hover, setHover] = useState(false);
  const host = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), 80);
    return () => window.clearTimeout(id);
  }, []);

  // Only render while the panel is actually on screen.
  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver((es) => es.forEach((e) => setInView(e.isIntersecting)), {
      rootMargin: "120px",
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const live = armed && webgl === "ready" && inView;

  return (
    <div
      ref={host}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={`mjs-card relative overflow-hidden ${className ?? ""}`}
      style={{ aspectRatio: "1 / 1" }}
    >
      <div className="mjs-grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,40,.22), transparent 70%)" }}
      />

      {live ? (
        <PanelScene tier={tier} hover={hover} />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
          <span className="mjs-pixel text-[0.6rem] tracking-[0.24em] text-signal">DATA GRAPH</span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-white/10 bg-ink/70 px-4 py-3 backdrop-blur-sm">
        <span className="mjs-pixel text-[0.58rem] tracking-[0.2em] text-signal">RELATIONAL VIEW</span>
        <span className="mjs-num">{hover ? "INTERACTING" : "MOVE CURSOR"}</span>
      </div>
    </div>
  );
}

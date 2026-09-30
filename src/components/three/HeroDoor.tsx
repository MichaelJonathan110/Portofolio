"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { useWebGL } from "./useWebGL";
import { useDeviceTier } from "@/hooks/useDeviceTier";
import { DoorFallback } from "./DoorFallback";

const HeroDoorScene = dynamic(() => import("./HeroDoorScene").then((m) => m.HeroDoorScene), {
  ssr: false,
  loading: () => <DoorFallback />,
});

/**
 * The front door. Sits behind the hero copy, owns its own render loop, and
 * reports scroll progress through a ref so the scene never re-renders React.
 */
export function HeroDoor() {
  const webgl = useWebGL();
  const tier = useDeviceTier();
  const [armed, setArmed] = useState(false);
  const progressRef = useRef(0);
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);

  // Arm after first paint so the portfolio text is usable immediately.
  useEffect(() => {
    const id = window.setTimeout(() => setArmed(true), 60);
    return () => window.clearTimeout(id);
  }, []);

  // Feed scroll progress (0 -> 1 across the hero's own height) into the ref.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = window.innerHeight || 1;
        progressRef.current = Math.min(1, Math.max(0, window.scrollY / h));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Stop rendering when the hero is off-screen: it is a front door, not a backdrop.
  useEffect(() => {
    const el = hostRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setVisible(e.isIntersecting)),
      { threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const live = armed && webgl === "ready";

  return (
    <div ref={hostRef} className="absolute inset-0" aria-hidden="true">
      {live ? (
        <HeroDoorScene tier={tier} progressRef={progressRef} paused={!visible} />
      ) : (
        <DoorFallback />
      )}
    </div>
  );
}

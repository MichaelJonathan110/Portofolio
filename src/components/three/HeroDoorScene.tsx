"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { DataGraph } from "./DataGraph";

interface Props {
  tier: string;
  progressRef: React.MutableRefObject<number>;
  paused?: boolean;
}

/** Renderer host. Owns DPR, frameloop policy and pointer wiring for the door. */
export function HeroDoorScene({ tier, progressRef, paused = false }: Props) {
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  // Tab visibility: pause the loop entirely when the page is hidden.
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const dpr: [number, number] = tier === "high" ? [1, 1.75] : tier === "balanced" ? [1, 1.4] : [0.85, 1];

  const frozen = paused || hidden || reduced;

  return (
    <Canvas
      frameloop={frozen ? "demand" : "always"}
      dpr={dpr}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 12.5], fov: 52, near: 0.1, far: 60 }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <DataGraph tier={tier} progressRef={progressRef} reduced={reduced} />
      </Suspense>
    </Canvas>
  );
}

"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useMemo, useState } from "react";
import { DataGraph } from "./DataGraph";

interface Props {
  tier: "high" | "mid" | "low";
  hover: boolean;
}

export function PanelScene({ tier, hover }: Props) {
  const reduced = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    const onVis = () => setHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const dpr: [number, number] = tier === "high" ? [1, 1.8] : tier === "mid" ? [1, 1.45] : [1, 1.1];
  const frozen = hidden || reduced;

  return (
    <Canvas
      frameloop={frozen ? "demand" : "always"}
      dpr={dpr}
      gl={{ antialias: tier === "high", alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 11], fov: 50, near: 0.1, far: 60 }}
      onCreated={({ gl }) => gl.setClearAlpha(0)}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <DataGraph tier={tier} reduced={reduced} boost={hover ? 1 : 0} />
      </Suspense>
    </Canvas>
  );
}

'use client';

import { Canvas } from '@react-three/fiber';
import * as THREE from 'three';
import { Lattice } from './Lattice';
import { CameraRig } from './CameraRig';
import type { DeviceTier } from '@/lib/motion';

const DPR: Record<DeviceTier, [number, number]> = {
  high: [1, 2],
  mid: [1, 1.5],
  low: [1, 1],
};

export interface HeroSceneProps {
  tier: DeviceTier;
}

export function HeroScene({ tier }: HeroSceneProps) {
  return (
    <Canvas
      dpr={DPR[tier]}
      camera={{ position: [0, 0, 8.4], fov: 42, near: 0.1, far: 40 }}
      gl={{
        antialias: tier === 'high',
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
      style={{ pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[4.5, 5, 6]} intensity={1.5} color="#dce8f2" />
      <directionalLight position={[-5, -2.5, -4]} intensity={0.9} color="#ff8a5c" />
      <pointLight position={[0, -3.4, 2.4]} intensity={6} distance={12} color="#ff5c28" />
      <Lattice tier={tier} />
      <CameraRig />
    </Canvas>
  );
}

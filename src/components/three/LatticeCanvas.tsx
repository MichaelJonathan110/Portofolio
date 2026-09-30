'use client';

import dynamic from 'next/dynamic';
import { LatticeFallback } from './LatticeFallback';
import { useWebGL } from './useWebGL';
import { useDeviceTier } from '@/hooks/useDeviceTier';

// Code-split: three.js is only fetched once the browser is known to support it.
const HeroScene = dynamic(() => import('./HeroScene').then((m) => m.HeroScene), {
  ssr: false,
  loading: () => <LatticeFallback />,
});

/**
 * Decides between the live scene and the static composition. The fallback is
 * rendered first (server-side and during the capability check), so the hero is
 * never empty and there is no layout shift when WebGL takes over.
 */
export function LatticeCanvas() {
  const webgl = useWebGL();
  const tier = useDeviceTier();

  return (
    <div className="absolute inset-0" aria-hidden={webgl === 'ready' ? true : undefined}>
      {webgl === 'ready' ? <HeroScene tier={tier} /> : <LatticeFallback />}
    </div>
  );
}

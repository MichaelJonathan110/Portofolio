'use client';

import { useEffect, useState } from 'react';
import { setTier, type DeviceTier } from '@/lib/motion';

interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
}

/**
 * Coarse capability tier. Drives node count, DPR ceiling and whether edges
 * render at all, so a low-end phone never receives the desktop scene.
 */
export function useDeviceTier(): DeviceTier {
  const [tier, setLocal] = useState<DeviceTier>('mid');

  useEffect(() => {
    const measure = () => {
      const nav = navigator as NavigatorWithMemory;
      const cores = nav.hardwareConcurrency ?? 4;
      const memory = nav.deviceMemory ?? 4;
      const width = window.innerWidth;
      const coarse = window.matchMedia('(pointer: coarse)').matches;

      let next: DeviceTier = 'high';
      if (width < 1024 || cores <= 4 || memory <= 4 || coarse) next = 'mid';
      if (width < 600 || cores <= 2 || memory <= 2) next = 'low';

      setLocal(next);
      setTier(next);
    };

    measure();
    window.addEventListener('resize', measure, { passive: true });
    return () => window.removeEventListener('resize', measure);
  }, []);

  return tier;
}

'use client';

import { useEffect } from 'react';
import { setPointerTarget, startMotionLoop } from '@/lib/motion';

/** Mounts the single page-wide motion loop and pointer listener. */
export function useScrollDriver(): void {
  useEffect(() => {
    const stop = startMotionLoop();

    const onPointer = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = (event.clientY / window.innerHeight) * 2 - 1;
      setPointerTarget(x, -y);
    };

    window.addEventListener('pointermove', onPointer, { passive: true });
    return () => {
      stop();
      window.removeEventListener('pointermove', onPointer);
    };
  }, []);
}

'use client';

import { useEffect, useState } from 'react';
import { detectWebGL, prefersReducedMotion } from '@/lib/utils';

export type WebGLState = 'checking' | 'ready' | 'unavailable';

/**
 * Resolves on the client only, so the server render is never asked to guess at
 * GPU support and the first paint stays static and cheap.
 */
export function useWebGL(): WebGLState {
  const [state, setState] = useState<WebGLState>('checking');

  useEffect(() => {
    if (!detectWebGL() || prefersReducedMotion()) {
      setState('unavailable');
      return;
    }
    setState('ready');
  }, []);

  return state;
}

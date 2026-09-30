'use client';

import { useEffect, useState } from 'react';
import { setReduced } from '@/lib/motion';

export function useReducedMotion(): boolean {
  const [reduced, setLocal] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    const apply = () => {
      setLocal(query.matches);
      setReduced(query.matches);
    };
    apply();
    query.addEventListener('change', apply);
    return () => query.removeEventListener('change', apply);
  }, []);

  return reduced;
}

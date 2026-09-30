'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { damp } from '@/lib/utils';

interface MagneticCTAProps {
  children: ReactNode;
  className?: string;
  /** Maximum pull in pixels. Kept small on purpose. */
  strength?: number;
}

/**
 * Magnetic pull toward the cursor, desktop pointers only. The wrapper moves a
 * few pixels at most; the link inside stays a normal, fully clickable element.
 */
export function MagneticCTA({ children, className, strength = 10 }: MagneticCTAProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let last = performance.now();

    const onMove = (event: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = event.clientX - cx;
      const dy = event.clientY - cy;
      const distance = Math.hypot(dx, dy);
      const radius = Math.max(rect.width, rect.height) * 1.1;
      if (distance < radius) {
        const falloff = 1 - distance / radius;
        target.x = (dx / radius) * strength * falloff * 2;
        target.y = (dy / radius) * strength * falloff * 2;
      } else {
        target.x = 0;
        target.y = 0;
      }
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      pos.x = damp(pos.x, target.x, 8, dt);
      pos.y = damp(pos.y, target.y, 8, dt);
      node.style.transform = `translate3d(${pos.x.toFixed(2)}px, ${pos.y.toFixed(2)}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [strength]);

  return (
    <div ref={ref} className={className} style={{ willChange: 'transform' }}>
      {children}
    </div>
  );
}

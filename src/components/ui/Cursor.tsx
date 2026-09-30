'use client';

import { useEffect, useRef } from 'react';
import { damp } from '@/lib/utils';

/**
 * A small ring that trails the pointer on fine-pointer devices. It never
 * replaces the native cursor and is skipped entirely on touch or reduced
 * motion, so usability is unaffected either way.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { x: target.x, y: target.y };
    let raf = 0;
    let last = performance.now();
    let shown = false;

    const setOpacity = (value: string) => {
      if (ring.current) ring.current.style.opacity = value;
      if (dot.current) dot.current.style.opacity = value;
    };

    const onMove = (event: PointerEvent) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!shown) {
        shown = true;
        setOpacity('1');
      }
    };

    const onLeave = () => {
      shown = false;
      setOpacity('0');
    };

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      pos.x = damp(pos.x, target.x, 16, dt);
      pos.y = damp(pos.y, target.y, 16, dt);
      if (ring.current) {
        ring.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${target.x}px, ${target.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <div
        ref={ring}
        className="absolute left-0 top-0 h-7 w-7 rounded-full border border-white/35 opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={dot}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-signal opacity-0 transition-opacity duration-300"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}

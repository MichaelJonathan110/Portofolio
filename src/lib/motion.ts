import { clamp, damp } from './utils';

export type DeviceTier = 'high' | 'mid' | 'low';

export interface MotionStore {
  pointer: { x: number; y: number };
  pointerTarget: { x: number; y: number };
  scroll: number;
  velocity: number;
  story: number;
  reduced: boolean;
  tier: DeviceTier;
}

/**
 * Module-level motion store. Deliberately NOT React state: the WebGL loop reads
 * it every frame, and routing that through setState would re-render the tree
 * 60 times a second for no reason.
 */
export const motion: MotionStore = {
  pointer: { x: 0, y: 0 },
  pointerTarget: { x: 0, y: 0 },
  scroll: 0,
  velocity: 0,
  story: 0,
  reduced: false,
  tier: 'mid',
};

let storyElement: HTMLElement | null = null;

/** Marks the element whose scroll range drives the 3D story. */
export function registerStoryElement(element: HTMLElement | null): void {
  storyElement = element;
}

export function setPointerTarget(x: number, y: number): void {
  motion.pointerTarget.x = clamp(x, -1, 1);
  motion.pointerTarget.y = clamp(y, -1, 1);
}

export function setReduced(value: boolean): void {
  motion.reduced = value;
}

export function setTier(tier: DeviceTier): void {
  motion.tier = tier;
}

/** One rAF loop for the whole page. */
export function startMotionLoop(): () => void {
  if (typeof window === 'undefined') return () => {};

  let raf = 0;
  let last = performance.now();
  let lastScroll = window.scrollY;

  const tick = (now: number) => {
    const dt = Math.min(0.05, Math.max(0.0001, (now - last) / 1000));
    last = now;

    const y = window.scrollY;
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    motion.scroll = clamp(y / max);
    motion.velocity = damp(
      motion.velocity,
      clamp((y - lastScroll) / Math.max(1, window.innerHeight), -1, 1),
      8,
      dt,
    );
    lastScroll = y;

    motion.pointer.x = damp(motion.pointer.x, motion.pointerTarget.x, 6, dt);
    motion.pointer.y = damp(motion.pointer.y, motion.pointerTarget.y, 6, dt);

    if (storyElement) {
      const rect = storyElement.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      motion.story = travel > 0 ? clamp(-rect.top / travel) : 0;
    }

    raf = window.requestAnimationFrame(tick);
  };

  raf = window.requestAnimationFrame(tick);
  return () => window.cancelAnimationFrame(raf);
}

import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

/** A small mono chip. Used for technologies and usage lines, never as a badge. */
export function Tag({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-white/12 px-3 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.12em] text-muted',
        className,
      )}
    >
      {children}
    </span>
  );
}

import { cn } from '@/lib/utils';

interface SectionHeaderProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}

/** The shared editorial section head: index, eyebrow, then a display title. */
export function SectionHeader({ index, eyebrow, title, description, className }: SectionHeaderProps) {
  return (
    <header className={cn('flex flex-col gap-5', className)}>
      <div className="flex items-baseline gap-4">
        <span className="mjs-pixel text-[0.6875rem] tabular-nums text-signal">{index}</span>
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px flex-1 bg-white/10" aria-hidden="true" />
      </div>
      <h2 className="max-w-3xl text-balance font-display text-3xl font-extrabold uppercase leading-[1.02] tracking-[-0.03em] sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-prose text-base leading-relaxed text-muted">{description}</p>
      ) : null}
    </header>
  );
}

'use client';

import { useState } from 'react';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { stack } from '@/content/stack';
import { cn } from '@/lib/utils';

/**
 * Six languages, and what each one is actually used for. No proficiency
 * percentages, because there is no evidence behind a number like that.
 */
export function Stack() {
  const [active, setActive] = useState(0);
  const current = stack[active];

  return (
    <section id="stack" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="04"
            eyebrow="Stack"
            title="Six languages, and what each one is actually for."
          />
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-16">
          <Reveal delay={0.05}>
            <ul className="divide-y divide-white/10 border-y border-white/10">
              {stack.map((item, index) => {
                const isActive = index === active;
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(index)}
                      onFocus={() => setActive(index)}
                      onClick={() => setActive(index)}
                      aria-pressed={isActive}
                      className={cn(
                        'flex w-full items-center justify-between gap-4 py-5 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal',
                        isActive ? 'text-paper' : 'text-muted hover:text-paper',
                      )}
                    >
                      <span className="text-xl font-medium tracking-tight sm:text-2xl">
                        {item.name}
                      </span>
                      <span className="font-mono text-[0.6875rem] tabular-nums text-signal">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-7 sm:p-8">
                <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-signal">
                  {current.name}
                </p>
                <ul className="mt-6 space-y-3">
                  {current.usage.map((line) => (
                    <li key={line} className="text-lg tracking-tight text-paper">
                      {line}
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-6 text-sm leading-relaxed text-muted">
                  {current.context}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

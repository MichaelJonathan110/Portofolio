import { DataCounter } from '@/components/ui/DataCounter';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { metrics } from '@/content/metrics';

/**
 * The four figures. These are the only numbers on the site, and every one of
 * them is checkable against another part of the page.
 */
export function MyData() {
  return (
    <section id="data" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="03"
            eyebrow="My data"
            title="Four numbers, and nothing invented to pad them out."
          />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <div key={metric.label} className="bg-ink p-7 sm:p-8">
                <p className="font-mono text-[clamp(2.25rem,4.5vw,3.25rem)] leading-none tracking-[-0.03em] text-paper tabular-nums">
                  <DataCounter value={metric.value} decimals={metric.decimals} />
                </p>
                <p className="mt-5 text-sm font-medium tracking-tight text-paper">
                  {metric.label}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{metric.note}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

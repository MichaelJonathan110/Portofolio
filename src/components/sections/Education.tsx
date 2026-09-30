import { education } from '@/content/education';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Reveal } from '@/components/ui/Reveal';

export function Education() {
  return (
    <section id="education" className="relative mx-auto w-full max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeader
        index="05"
        eyebrow="Education"
        title="Where I study"
        description="Formal training, and what I actually took from it."
      />

      <ul className="mt-14 border-t border-white/[0.08]">
        {education.map((entry, i) => (
          <li key={entry.institution} className="border-b border-white/[0.08]">
            <Reveal delay={i * 0.06}>
              <div className="grid grid-cols-1 gap-4 py-8 md:grid-cols-12 md:gap-6">
                <div className="md:col-span-3">
                  <p className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-faint">
                    {entry.period}
                  </p>
                  {entry.current && (
                    <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-signal">
                      <span className="h-1 w-1 rounded-full bg-signal" />
                      Current
                    </p>
                  )}
                </div>

                <div className="md:col-span-6">
                  <h3 className="font-display text-xl tracking-tight text-paper">
                    {entry.institution}
                  </h3>
                  <p className="mt-1 font-sans text-sm text-muted">{entry.programme}</p>
                  {entry.focus && entry.focus.length > 0 && (
                    <p className="mt-3 font-sans text-sm leading-relaxed text-faint">
                      Focus: {entry.focus.join(' · ')}
                    </p>
                  )}
                </div>

                <div className="md:col-span-3 md:text-right">
                  {entry.gpa && (
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
                      GPA {entry.gpa}
                    </p>
                  )}
                  <p className="mt-3 font-sans text-sm leading-relaxed text-faint md:mt-4">
                    {entry.note}
                  </p>
                </div>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}

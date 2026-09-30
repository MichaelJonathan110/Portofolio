import { Reveal } from '@/components/ui/Reveal';
import { SectionHeader } from '@/components/ui/SectionHeader';

const interests = [
  {
    label: 'Data & Databases',
    detail: 'Where most of my technical attention goes.',
  },
  {
    label: 'Creative Development',
    detail: 'Building the thing, not only the query behind it.',
  },
  {
    label: 'Sport & Fitness',
    detail: 'The part of my week that is not negotiable.',
  },
  {
    label: 'Always learning',
    detail: 'Coursework, side projects, and whatever I am reading next.',
  },
];

export function About() {
  return (
    <section id="about" className="relative border-t border-white/10 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeader
            index="01"
            eyebrow="About"
            title="A Computer Science student who likes the messy middle of a dataset."
          />
        </Reveal>

        <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
          <Reveal delay={0.05}>
            <div className="space-y-6 text-pretty text-lg leading-relaxed text-muted">
              <p>
                I am studying Computer Science at BINUS University, based in Indonesia. Most of
                what I build starts with data: pulling it apart, cleaning it, and working out what
                it is actually saying. Databases are the part I keep coming back to, because a
                schema that still holds up under real questions is a satisfying thing to get right.
              </p>
              <p>
                Away from a keyboard I am usually training or playing sport. It is the same
                instinct in a different form: show up, keep track, and let consistency do the work
                that motivation will not.
              </p>
              <p>
                Right now I am building LangitNusa and Trinity, and learning as much as I can along
                the way.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            

        <dl className="divide-y divide-white/10 border-y border-white/10">
              {interests.map((interest) => (
                <div key={interest.label} className="flex flex-col gap-1 py-5">
                  <dt className="text-base font-medium tracking-tight text-paper">
                    {interest.label}
                  </dt>
                  <dd className="text-sm leading-relaxed text-muted">{interest.detail}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

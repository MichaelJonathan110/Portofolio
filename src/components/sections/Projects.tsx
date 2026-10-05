import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { projects } from "@/content/projects";

/**
 * Only real builds are highlighted. Placeholder entries are filtered out
 * rather than shipped as filler cards.
 */
export function Projects() {
  const featured = projects.filter((p) => !p.placeholder);

  return (
    <section id="work" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto w-full max-w-shell px-6">
        <SectionHeader index="02" eyebrow="Selected Work" title="Three builds, taken seriously." />

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.12}>
              <Link
                href={`/projects/${p.id}`}
                className="mjs-card group relative flex h-full flex-col justify-between overflow-hidden p-8 sm:p-10"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100"
                  style={{ background: `radial-gradient(circle, ${p.accent}66, transparent 70%)` }}
                />

                <div className="relative z-10">
                  <div className="flex items-center justify-between">
                    <span className="mjs-num">
                      {String(i + 1).padStart(2, "0")} / {String(featured.length).padStart(2, "0")}
                    </span>
                    <span className="h-2 w-2 rounded-full" style={{ background: p.accent }} aria-hidden="true" />
                  </div>

                  <h3 className="mjs-display mt-8 text-4xl sm:text-5xl">
                    <ScrambleText text={p.name} as="span" />
                  </h3>

                  <p className="mt-3 font-mono text-[0.7rem] uppercase tracking-[0.26em] text-faint">
                    {p.category}
                  </p>

                  <p className="mt-6 max-w-prose text-sm leading-relaxed text-muted sm:text-base">
                    {p.summary}
                  </p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {p.technologies.slice(0, 5).map((t) => (
                      <li
                        key={t}
                        className="border border-white/15 px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.18em] text-muted"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="relative z-10 mt-10 flex items-center justify-between border-t border-white/10 pt-5">
                  <span className="font-mono text-[0.68rem] uppercase tracking-[0.24em] text-paper">
                    Read case study
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-signal transition-transform duration-500 ease-editorial group-hover:translate-x-1.5"
                  >
                    &rarr;
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

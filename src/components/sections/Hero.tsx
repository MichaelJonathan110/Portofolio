import { HeroDoor } from "@/components/three/HeroDoor";
import { Button } from "@/components/ui/Button";
import { Marquee } from "@/components/ui/Marquee";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { GlitchText } from "@/components/ui/GlitchText";
import { WordCycler } from "@/components/ui/WordCycler";
import { SocialIcon } from "@/components/ui/Icons";
import { site, socials } from "@/content/site";

const TICKER = [
  "PYTHON", "SQL", "TYPESCRIPT", "JAVASCRIPT", "JAVA", "C",
  "DATA MODELLING", "SCHEMA DESIGN", "MACHINE LEARNING", "DATA ANALYSIS",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden pb-14 pt-36 sm:pb-20 lg:pb-24"
    >
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
        <HeroDoor />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
      </div>

      <div className="mx-auto w-full max-w-[1400px] px-6 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <span className="mjs-dot" aria-hidden="true" />
          <p className="mjs-num">{site.location} &middot; Portfolio</p>
        </div>

        <h1 className="mjs-display mt-10 text-[clamp(2.7rem,9.6vw,9.5rem)] text-paper">
          <ScrambleText text="Michael" as="span" className="block" />
          <ScrambleText text="Jonathan" as="span" className="block text-signal" duration={1100} />
          <GlitchText text="SUSILO" className="block text-paper" />
        </h1>

        <div className="mt-9 flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-[0.28em] text-muted sm:text-sm">
          <span className="text-signal" aria-hidden="true">&gt;</span>
          <WordCycler words={site.roles} className="text-paper" />
        </div>

        <p className="mt-8 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
          {site.intro}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#work" variant="primary" size="lg">View projects</Button>
          <Button href="#contact" variant="outline" size="lg">Get in touch</Button>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-7">
          {socials.map((s) => (
            <a
              key={s.kind}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${s.label} - ${s.handle}`}
              className="mjs-link-underline text-faint transition-colors duration-300 hover:text-paper"
            >
              <SocialIcon kind={s.kind} className="h-5 w-5" />
            </a>
          ))}
        </div>
      </div>

      <div className="relative mt-16 border-t border-white/10 py-5">
        <Marquee items={TICKER} speed={34} />
      </div>
    </section>
  );
}

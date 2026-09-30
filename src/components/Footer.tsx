import { socials, site } from '@/content/site';
import { SocialIcon } from '@/components/ui/Icons';

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-ink-soft">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-lg text-paper">
            {site.name}
            <span className="text-signal">.</span>
          </p>
          <p className="mt-2 max-w-sm font-sans text-sm text-faint">{site.tagline}</p>
        </div>

        <div className="flex flex-col gap-4 sm:items-end">
          <ul className="flex items-center gap-4">
            {socials.map((social) => (
              <li key={social.kind}>
                <a
                  href={social.href}
                  target={social.kind === 'email' ? undefined : '_blank'}
                  rel={social.kind === 'email' ? undefined : 'noreferrer'}
                  aria-label={`${social.label} — ${social.handle}`}
                  className="text-faint transition-colors duration-300 hover:text-paper"
                >
                  <SocialIcon kind={social.kind} className="h-[1.05rem] w-[1.05rem]" />
                </a>
              </li>
            ))}
          </ul>
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-faint">
            © {new Date().getFullYear()} {site.shortName} · {site.location}
          </p>
        </div>
      </div>
    </footer>
  );
}

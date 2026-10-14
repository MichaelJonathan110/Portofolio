'use client';

import { useEffect, useState } from 'react';
import { navItems, site } from '@/content/site';
import { DownloadIcon } from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

export function SiteNav() {
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const nodes = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);
    if (nodes.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0.01, 0.25, 0.5, 1] },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled && 'border-b border-white/[0.06] bg-ink/75 backdrop-blur-xl',
      )}
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4"
      >
        <a href="#top" className="font-display text-[0.95rem] font-medium tracking-tight text-paper">
          {site.shortName}
          <span className="text-signal">.</span>
        </a>

        <ul className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <a
                href={'#' + item.id}
                aria-current={active === item.id ? 'true' : undefined}
                className={cn(
                  'font-mono text-[0.68rem] uppercase tracking-[0.18em] transition-colors duration-300',
                  active === item.id ? 'text-paper' : 'text-faint hover:text-muted',
                )}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href={site.cvHref}
          download
          className="group ml-8 hidden items-center gap-2 border border-signal px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal transition-colors duration-300 hover:bg-signal hover:text-ink md:inline-flex"
        >
          <DownloadIcon className="h-3.5 w-3.5 transition-transform duration-500 ease-editorial group-hover:translate-y-0.5" />
          CV
        </a>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted md:hidden"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </nav>

      {open && (
        <ul
          id="mobile-nav"
          className="border-t border-white/[0.06] bg-ink/95 px-6 py-4 backdrop-blur-xl md:hidden"
        >
          {navItems.map((item) => (
            <li key={item.id} className="py-2">
              <a
                href={'#' + item.id}
                onClick={() => setOpen(false)}
                className="font-mono text-xs uppercase tracking-[0.18em] text-muted"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={site.cvHref}
              download
              className="inline-flex items-center gap-2 border border-signal px-4 py-2 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-signal"
            >
              <DownloadIcon className="h-3.5 w-3.5" />
              Download CV
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

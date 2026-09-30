"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/ScrambleText";
import { SocialIcon } from "@/components/ui/Icons";
import { site, socials } from "@/content/site";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden border-t border-white/10">
      <div className="mjs-grid-bg pointer-events-none absolute inset-0 opacity-[0.35]" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(255,92,40,.18), transparent 70%)" }}
      />

      <div className="relative mx-auto w-full max-w-shell px-6 py-24 sm:py-32">
        <div className="flex items-center gap-4">
          <span className="mjs-dot" aria-hidden="true" />
          <span className="mjs-num">Available for internships &amp; collaboration</span>
        </div>

        <h2 className="mjs-display mt-8 text-[clamp(2.4rem,7vw,6rem)]">
          <ScrambleText text={site.contactHeadline} as="span" className="block" />
        </h2>

        <p className="mt-8 max-w-prose text-base leading-relaxed text-muted sm:text-lg">
          {site.contactNote}
        </p>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Button href={`mailto:${site.email}`} variant="primary" size="lg">
            {site.email}
          </Button>
          <Button variant="outline" size="lg" onClick={copy}>
            {copied ? "Copied" : "Copy email"}
          </Button>
        </div>

        <div className="mt-16 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {socials.map((s) => (
            <a
              key={s.kind}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col gap-3 bg-ink p-6 transition-colors duration-300 hover:bg-ink-soft"
            >
              <span className="flex items-center justify-between">
                <SocialIcon kind={s.kind} className="h-5 w-5 text-muted transition-colors duration-300 group-hover:text-signal" />
                <span
                  aria-hidden="true"
                  className="text-faint transition-transform duration-500 ease-editorial group-hover:translate-x-1 group-hover:text-signal"
                >
                  &rarr;
                </span>
              </span>
              <span className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-faint">{s.label}</span>
              <span className="truncate text-sm text-paper">{s.handle}</span>
            </a>
          ))}
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <a
            href="#hero"
            className="mjs-link-underline font-mono text-[0.64rem] uppercase tracking-[0.24em] text-muted transition-colors duration-300 hover:text-paper"
          >
            &uarr; Back to top
          </a>
          <p className="font-mono text-[0.62rem] uppercase tracking-[0.24em] text-faint">
            Currently open to internships &amp; collaboration
          </p>
        </div>
      </div>
    </section>
  );
}

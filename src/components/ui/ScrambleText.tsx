"use client";

import { useEffect, useRef, useState } from "react";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/\<>*#@$%&=";

interface ScrambleTextProps {
  text: string;
  className?: string;
  duration?: number;
  as?: "span" | "div" | "p" | "h1" | "h2" | "h3";
}

/** Decodes text from random glyphs to the real string, once, on view. */
export function ScrambleText({ text, className, duration = 900, as = "span" }: ScrambleTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [out, setOut] = useState(text);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    const run = () => {
      if (done.current) return;
      done.current = true;
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min(1, (now - start) / duration);
        const solved = Math.floor(p * text.length);
        let s = "";
        for (let i = 0; i < text.length; i++) {
          const ch = text[i];
          if (ch === " ") s += " ";
          else if (i < solved) s += ch;
          else s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOut(s);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setOut(text);
      };
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && run()),
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [text, duration]);

  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true">{out}</span>
    </Tag>
  );
}

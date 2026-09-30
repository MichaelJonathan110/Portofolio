"use client";

import { useEffect, useRef, useState } from "react";

/** Block glyphs, the kind a corrupted ROM or a broken save file shows. */
const GLYPHS = "▓▒░█■□#@$%&*+=<>/\|_";

interface Props {
  text: string;
  className?: string;
}

/**
 * Retro video-game glitch: the word drops out and snaps back in fast, with
 * glyphs briefly corrupting. Built for legibility - a hidden sizer holds the
 * width so the layout never jumps while the visible layer flickers.
 */
export function GlitchText({ text, className }: Props) {
  const [out, setOut] = useState(text);
  const [live, setLive] = useState(false);
  const stopped = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setLive(true);

    const corrupt = () =>
      text
        .split("")
        .map((c) =>
          c === " " ? " " : Math.random() < 0.45 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : c
        )
        .join("");

    let timer = 0;
    const tick = () => {
      if (stopped.current) return;
      const r = Math.random();
      if (r < 0.07) {
        setOut(""); // hard dropout - the whole word vanishes for a beat
      } else if (r < 0.42) {
        setOut(corrupt()); // partial glyph corruption
      } else if (r < 0.52) {
        setOut(text.slice(0, Math.max(1, Math.floor(Math.random() * text.length)))); // truncation
      } else {
        setOut(text);
      }
      timer = window.setTimeout(tick, 60 + Math.random() * 150);
    };

    timer = window.setTimeout(tick, 700);
    return () => {
      stopped.current = true;
      window.clearTimeout(timer);
    };
  }, [text]);

  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {/* invisible sizer: keeps the box steady while the word flickers */}
      <span aria-hidden="true" className="invisible">
        {text}
      </span>
      <span
        aria-hidden="true"
        className={live ? "mjs-retro absolute inset-0" : "absolute inset-0"}
        data-text={text}
      >
        {out || " "}
      </span>
      <span className="sr-only">{text}</span>
    </span>
  );
}

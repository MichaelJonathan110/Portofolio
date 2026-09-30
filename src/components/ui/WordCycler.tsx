"use client";

import { useEffect, useState } from "react";

interface WordCyclerProps {
  words: readonly string[];
  className?: string;
  interval?: number;
}

/** Types a word out, holds it, deletes it, moves to the next. Loops. */
export function WordCycler({ words, className, interval = 2600 }: WordCyclerProps) {
  const [i, setI] = useState(0);
  const [len, setLen] = useState(0);
  const [del, setDel] = useState(false);
  const list = words;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setLen(list[0].length);
      return;
    }
    const word = list[i % list.length];
    if (!del && len === word.length) {
      const t = setTimeout(() => setDel(true), interval);
      return () => clearTimeout(t);
    }
    if (del && len === 0) {
      setDel(false);
      setI((v) => (v + 1) % list.length);
      return;
    }
    const t = setTimeout(() => setLen((v) => v + (del ? -1 : 1)), del ? 45 : 85);
    return () => clearTimeout(t);
  }, [len, del, i, list, interval]);

  const word = list[i % list.length];
  return (
    <span className={className}>
      <span aria-live="polite">{word.slice(0, len)}</span>
      <span className="mjs-caret" aria-hidden="true">
        _
      </span>
    </span>
  );
}

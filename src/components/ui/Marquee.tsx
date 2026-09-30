"use client";

interface MarqueeProps {
  items: string[];
  className?: string;
  speed?: number;
  reverse?: boolean;
}

/** Infinite horizontal ticker. Duplicated track so the loop is seamless. */
export function Marquee({ items, className, speed = 28, reverse = false }: MarqueeProps) {
  const track = [...items, ...items];
  return (
    <div className={`mjs-marquee ${className ?? ""}`}>
      <div
        className="mjs-marquee-track"
        style={{
          animationDuration: `${speed}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {track.map((it, i) => (
          <span key={i} className="mjs-marquee-item">
            {it}
            <span className="mjs-marquee-dot" aria-hidden="true">
              /
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

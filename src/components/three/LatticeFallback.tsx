const NODES: Array<[number, number]> = [
  [50, 18], [22, 32], [78, 32], [36, 52], [64, 52], [50, 40],
  [14, 58], [86, 58], [28, 74], [72, 74], [50, 66], [50, 86],
];

const EDGES: Array<[number, number]> = [
  [0, 1], [0, 2], [0, 5], [1, 3], [2, 4], [3, 5], [4, 5], [1, 6],
  [2, 7], [3, 8], [4, 9], [6, 8], [7, 9], [5, 10], [8, 10], [9, 10],
  [8, 11], [9, 11], [10, 11], [6, 3], [7, 4],
];

/**
 * Static stand-in for the WebGL lattice: the same node-and-edge idea drawn as a
 * fixed SVG, so the hero still reads as art-directed when WebGL or motion is off.
 */
export function LatticeFallback() {
  return (
    <svg
      viewBox="0 0 100 100"
      className="h-full w-full"
      role="img"
      aria-label="Abstract node-and-edge lattice representing connected data structures"
    >
      <defs>
        <radialGradient id="lattice-glow" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#FF5C28" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#FF5C28" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="48" r="46" fill="url(#lattice-glow)" />
      <g stroke="#EDEDEA" strokeOpacity="0.22" strokeWidth="0.35">
        {EDGES.map(([a, b], i) => (
          <line key={i} x1={NODES[a][0]} y1={NODES[a][1]} x2={NODES[b][0]} y2={NODES[b][1]} />
        ))}
      </g>
      <g fill="#EDEDEA">
        {NODES.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 1.5 : 0.9} fillOpacity={0.5 + (i % 5) * 0.1} />
        ))}
      </g>
    </svg>
  );
}

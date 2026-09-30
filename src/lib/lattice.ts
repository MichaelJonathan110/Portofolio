/**
 * The Lattice: one node-and-edge structure whose arrangement carries the
 * scroll story. Nodes are records, edges are relationships; the topology is
 * fixed while the geometry moves. That is the database metaphor, and it is
 * also why the edges never need recomputing mid-scroll.
 */

export const STATE_COUNT = 5;

export const STATE_LABELS = [
  'structure',
  'data',
  'schema',
  'motion',
  'field',
] as const;

export type LatticeStateLabel = (typeof STATE_LABELS)[number];

export interface LatticeData {
  count: number;
  states: Float32Array[];
  edges: Uint16Array;
}

/** Deterministic PRNG so every device renders the same structure. */
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function smoothstep(t: number): number {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
}

function write(state: Float32Array, i: number, x: number, y: number, z: number): void {
  const o = i * 3;
  state[o] = x;
  state[o + 1] = y;
  state[o + 2] = z;
}

export function buildLattice(count: number, seed = 110): LatticeData {
  const rand = mulberry32(seed);
  const states: Float32Array[] = [];
  for (let s = 0; s < STATE_COUNT; s += 1) states.push(new Float32Array(count * 3));

  const structure = states[0];
  const data = states[1];
  const schema = states[2];
  const motion = states[3];
  const field = states[4];

  const side = Math.max(2, Math.ceil(Math.cbrt(count)));
  const span = 1.9;
  const step = (span * 2) / Math.max(1, side - 1);

  for (let i = 0; i < count; i += 1) {
    const gx = i % side;
    const gy = Math.floor(i / side) % side;
    const gz = Math.floor(i / (side * side));

    const jitter = 0.1;
    const bx = -span + gx * step + (rand() - 0.5) * jitter;
    const by = -span + gy * step + (rand() - 0.5) * jitter;
    const bz = -span + gz * step + (rand() - 0.5) * jitter;

    // 01 structure: a compact crystalline block.
    write(structure, i, bx, by, bz);

    // 02 data: the same records laid out as ordered columns.
    const col = (i % side) - (side - 1) / 2;
    const row = Math.floor(i / side) % side;
    const lift = (i / Math.max(1, count - 1) - 0.5) * 3.4;
    write(data, i, col * 0.72, lift, row * 0.5 - 0.75);

    // 03 schema: two related tables and the bridge between them.
    const left = i % 2 === 0;
    const local = Math.floor(i / 2);
    const ring = 0.42 + (local % 6) * 0.16;
    const angle = local * 2.399963;
    const cx = left ? -1.35 : 1.35;
    const cy = (local % 5) * 0.26 - 0.52;
    const spread = left ? 1 : 0.82;
    write(
      schema,
      i,
      cx + Math.cos(angle) * ring * spread,
      cy,
      Math.sin(angle) * ring * spread,
    );

    // 04 motion: a helix, for the training side of the identity.
    const t = i / Math.max(1, count - 1);
    const turns = 3.1;
    const theta = t * Math.PI * 2 * turns;
    const radius = 1.15 + Math.sin(t * Math.PI * 6) * 0.16;
    write(motion, i, Math.cos(theta) * radius, (t - 0.5) * 3.6, Math.sin(theta) * radius);

    // 05 field: released outward into a wide shell.
    const u = rand() * 2 - 1;
    const phi = rand() * Math.PI * 2;
    const r = 2.15 + rand() * 1.35;
    const sq = Math.sqrt(1 - u * u);
    write(field, i, Math.cos(phi) * sq * r, u * r * 0.72, Math.sin(phi) * sq * r);
  }

  // Fixed topology: each node keeps its two nearest neighbours from the
  // structure state. Relationships persist while the arrangement changes.
  const pairs: number[] = [];
  const seen = new Set<string>();
  for (let i = 0; i < count; i += 1) {
    const dists: Array<{ j: number; d: number }> = [];
    for (let j = 0; j < count; j += 1) {
      if (i === j) continue;
      const dx = structure[i * 3] - structure[j * 3];
      const dy = structure[i * 3 + 1] - structure[j * 3 + 1];
      const dz = structure[i * 3 + 2] - structure[j * 3 + 2];
      dists.push({ j, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((a, b) => a.d - b.d);
    for (let k = 0; k < 2 && k < dists.length; k += 1) {
      const j = dists[k].j;
      const key = i < j ? i + ':' + j : j + ':' + i;
      if (seen.has(key)) continue;
      seen.add(key);
      pairs.push(i, j);
    }
  }

  return { count, states, edges: Uint16Array.from(pairs) };
}

/** Interpolates the node positions for a 0..1 scroll progress. */
export function sampleLattice(data: LatticeData, progress: number, out: Float32Array): void {
  const segments = STATE_COUNT - 1;
  const p = Math.min(0.9999, Math.max(0, progress)) * segments;
  const from = Math.floor(p);
  const t = smoothstep(p - from);
  const a = data.states[from];
  const b = data.states[Math.min(STATE_COUNT - 1, from + 1)];
  for (let i = 0; i < out.length; i += 1) out[i] = a[i] + (b[i] - a[i]) * t;
}

/** Colour of the key light per state, so lighting tracks the story. */
export const STATE_TINTS: ReadonlyArray<readonly [number, number, number]> = [
  [0.94, 0.94, 0.92],
  [0.78, 0.84, 0.9],
  [0.62, 0.8, 0.87],
  [0.65, 0.9, 0.21],
  [1.0, 0.36, 0.16],
];

export function tintAt(progress: number): [number, number, number] {
  const segments = STATE_COUNT - 1;
  const p = Math.min(0.9999, Math.max(0, progress)) * segments;
  const from = Math.floor(p);
  const t = smoothstep(p - from);
  const a = STATE_TINTS[from];
  const b = STATE_TINTS[Math.min(STATE_COUNT - 1, from + 1)];
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

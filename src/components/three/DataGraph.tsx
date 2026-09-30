"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * The front-door visual: a database schema you can walk into.
 *
 * Not a sphere, not a galaxy, not floating cubes. It is a relational graph -
 * record nodes joined by edges, with signal pulses travelling the joins and a
 * few wireframe "tables" standing in for real entities. It reads as DATA,
 * which is the identity this portfolio is built on.
 */

const ACCENT = new THREE.Color("#ff6a3d");
const PAPER = new THREE.Color("#ffffff");
const DIM = new THREE.Color("#8a919b");

type Budget = { nodes: number; edges: number; signals: number; tables: number };

const BUDGETS: Record<string, Budget> = {
  high: { nodes: 132, edges: 210, signals: 12, tables: 5 },
  balanced: { nodes: 92, edges: 140, signals: 8, tables: 4 },
  mobile: { nodes: 56, edges: 76, signals: 5, tables: 3 },
  low: { nodes: 34, edges: 44, signals: 3, tables: 2 },
};

/** Deterministic hash noise - stable across renders, no Math.random. */
function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

interface Props {
  tier?: string;
  /** 0 = hero fully present, 1 = visitor has scrolled past the door. */
  progressRef?: React.MutableRefObject<number>;
  reduced?: boolean;
  /** 1 while the pointer is over the panel: lifts brightness and idle speed. */
  boost?: number;
}

export function DataGraph({ tier = "balanced", progressRef, reduced = false, boost = 0 }: Props) {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Group>(null);
  const signalRefs = useRef<(THREE.Mesh | null)[]>([]);
  const { pointer } = useThree();

  const budget = BUDGETS[tier] ?? BUDGETS.balanced;

  const model = useMemo(() => {
    const pos: THREE.Vector3[] = [];
    for (let i = 0; i < budget.nodes; i++) {
      // Shell distribution: hollow centre so the type stays legible in the middle.
      const a = hash(i * 3.1) * Math.PI * 2;
      const b = Math.acos(2 * hash(i * 7.7 + 1) - 1);
      const r = 4.4 + hash(i * 11.3 + 5) * 5.2;
      pos.push(
        new THREE.Vector3(
          Math.sin(b) * Math.cos(a) * r,
          (hash(i * 13.9 + 2) - 0.5) * 9.5,
          Math.sin(b) * Math.sin(a) * r * 0.72 - 1.5
        )
      );
    }

    // Join each node to its nearest neighbours - the graph is relational, not random.
    const pairs: [number, number][] = [];
    const seen = new Set<string>();
    for (let i = 0; i < pos.length && pairs.length < budget.edges; i++) {
      const near = pos
        .map((p, j) => ({ j, d: i === j ? Infinity : p.distanceTo(pos[i]) }))
        .sort((x, y) => x.d - y.d)
        .slice(0, 2);
      for (const { j } of near) {
        const key = i < j ? `${i}:${j}` : `${j}:${i}`;
        if (!seen.has(key)) {
          seen.add(key);
          pairs.push([i, j]);
        }
      }
    }

    const linePos = new Float32Array(pairs.length * 6);
    pairs.forEach(([a, b], k) => {
      linePos.set([pos[a].x, pos[a].y, pos[a].z, pos[b].x, pos[b].y, pos[b].z], k * 6);
    });

    const nodeColor = new Float32Array(pos.length * 3);
    pos.forEach((_, i) => {
      const c = i % 3 === 0 ? ACCENT : i % 2 === 0 ? PAPER : DIM;
      nodeColor.set([c.r, c.g, c.b], i * 3);
    });

    // A handful of wireframe "tables" anchoring the composition.
    const tables = Array.from({ length: budget.tables }, (_, i) => ({
      pos: pos[(i * 17 + 5) % pos.length].clone(),
      size: 1.5 + hash(i * 23.4) * 1.5,
      rot: hash(i * 31.7) * Math.PI,
    }));

    // Signal pulses ride existing edges, so they never float without reason.
    const signals = Array.from({ length: budget.signals }, (_, i) => ({
      pair: pairs[(i * 13 + 3) % Math.max(1, pairs.length)],
      offset: hash(i * 41.3),
      speed: 0.16 + hash(i * 53.1) * 0.24,
    }));

    return { pos, pairs, linePos, nodeColor, tables, signals };
  }, [budget]);

  const nodeGeo = useMemo(() => new THREE.SphereGeometry(0.055, 8, 8), []);
  const nodeMat = useMemo(() => new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: 1 }), []);
  const lineMat = useMemo(
    () => new THREE.LineBasicMaterial({ color: new THREE.Color("#7c848e"), transparent: true, opacity: 0.6 }),
    []
  );
  const sigGeo = useMemo(() => new THREE.SphereGeometry(0.085, 8, 8), []);
  const sigMat = useMemo(() => new THREE.MeshBasicMaterial({ color: ACCENT }), []);

  const nodes = useMemo(() => {
    const im = new THREE.InstancedMesh(nodeGeo, nodeMat, model.pos.length);
    const m = new THREE.Matrix4();
    model.pos.forEach((p, i) => {
      m.makeTranslation(p.x, p.y, p.z);
      im.setMatrixAt(i, m);
    });
    im.instanceMatrix.needsUpdate = true;
    if (im.instanceColor) im.instanceColor.needsUpdate = true;
    return im;
  }, [model, nodeGeo, nodeMat]);

  const lines = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(model.linePos, 3));
    return new THREE.LineSegments(g, lineMat);
  }, [model, lineMat]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05);

    // Pointer parallax: damped, cinematic, never aggressive.
    if (inner.current) {
      const tx = pointer.x * 0.34;
      const ty = pointer.y * 0.22;
      inner.current.rotation.y += (tx - inner.current.rotation.y) * Math.min(1, d * 1.6);
      inner.current.rotation.x += (-ty - inner.current.rotation.x) * Math.min(1, d * 1.6);
    }

    // Idle life: slow drift + breathing scale, not a constant spin.
    if (group.current) {
      const drift = reduced ? 0 : 1 + boost * 0.6;
      group.current.rotation.y = t * 0.018 * drift;
      group.current.position.y = Math.sin(t * 0.32) * 0.16 * drift;
    }

    const p = progressRef?.current ?? 0;

    // Signals travel along real edges.
    model.signals.forEach((s, i) => {
      const mesh = signalRefs.current[i];
      if (!mesh || !s.pair) return;
      const [a, b] = s.pair;
      const f = ((t * s.speed + s.offset) % 1 + 1) % 1;
      const va = model.pos[a];
      const vb = model.pos[b];
      mesh.position.set(
        va.x + (vb.x - va.x) * f,
        va.y + (vb.y - va.y) * f,
        va.z + (vb.z - va.z) * f
      );
      const s2 = 0.7 + Math.sin(f * Math.PI) * 0.6;
      mesh.scale.setScalar(s2 * (1 - p * 0.5));
    });

    // Scroll choreography: the graph opens like a door and recedes.
    if (group.current) {
      group.current.scale.setScalar(1 - p * 0.42);
      group.current.position.z = p * 7.5;
    }
    lineMat.opacity = (0.6 + boost * 0.25) * (1 - p * 0.72);
    nodeMat.opacity = (1 + boost * 0.0) * (1 - p * 0.72);
  });

  return (
    <group ref={group}>
      <group ref={inner}>
        <primitive object={nodes} />
        <primitive object={lines} />
        {model.tables.map((t, i) => (
          <mesh key={`t${i}`} position={t.pos} rotation={[0.4, t.rot, 0.2]}>
            <boxGeometry args={[t.size, t.size * 0.62, t.size]} />
            <meshBasicMaterial color="#ff6a3d" wireframe transparent opacity={0.55} />
          </mesh>
        ))}
        {model.signals.map((_, i) => (
          <mesh
            key={`s${i}`}
            ref={(el) => {
              signalRefs.current[i] = el;
            }}
            geometry={sigGeo}
            material={sigMat}
          />
        ))}
      </group>
    </group>
  );
}

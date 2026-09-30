'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { buildLattice, sampleLattice, tintAt } from '@/lib/lattice';
import { motion, type DeviceTier } from '@/lib/motion';
import { clamp, damp, lerp } from '@/lib/utils';

const NODE_COUNT: Record<DeviceTier, number> = { high: 210, mid: 132, low: 80 };
const NODE_RADIUS: Record<DeviceTier, number> = { high: 0.036, mid: 0.044, low: 0.055 };

export interface LatticeProps {
  tier: DeviceTier;
  /** 0..1 story progress; falls back to the shared scroll store. */
  progress?: number;
}

/**
 * The Lattice. Nodes are records, edges are relationships: the topology is
 * fixed while the geometry morphs across the five story states. Idle motion is
 * a slow rotation plus cursor parallax, never a random float.
 */
export function Lattice({ tier, progress }: LatticeProps) {
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);
  const spin = useRef({ x: 0, y: 0 });
  const local = useRef(0);

  const built = useMemo(() => {
    const count = NODE_COUNT[tier];
    const lattice = buildLattice(count, 110);

    const positions = new Float32Array(count * 3);
    const nodeGeo = new THREE.IcosahedronGeometry(NODE_RADIUS[tier], 1);
    const nodeMat = new THREE.MeshStandardMaterial({
      roughness: 0.34,
      metalness: 0.12,
      envMapIntensity: 0.6,
      vertexColors: false,
    });
    const nodes = new THREE.InstancedMesh(nodeGeo, nodeMat, count);
    nodes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    nodes.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
    nodes.instanceColor.setUsage(THREE.DynamicDrawUsage);
    nodes.frustumCulled = false;

    const edgeGeo = new THREE.BufferGeometry();
    const edgePositions = new Float32Array(lattice.edges.length * 3);
    edgeGeo.setAttribute('position', new THREE.BufferAttribute(edgePositions, 3));
    edgeGeo.setDrawRange(0, lattice.edges.length);
    const edgeMat = new THREE.LineBasicMaterial({
      transparent: true,
      opacity: tier === 'low' ? 0.14 : 0.24,
      depthWrite: false,
    });
    const edges = new THREE.LineSegments(edgeGeo, edgeMat);
    edges.frustumCulled = false;

    const group = new THREE.Group();
    group.add(nodes);
    group.add(edges);

    return { count, lattice, nodes, edges, positions, edgePositions, edgeGeo, group, nodeMat, edgeMat };
  }, [tier]);

  useFrame((_, rawDelta) => {
    const dt = Math.min(0.05, rawDelta);
    const { count, lattice, nodes, edgePositions, edgeGeo, group } = built;

    const target = progress ?? motion.story;
    local.current = damp(local.current, clamp(target), motion.reduced ? 40 : 5, dt);
    const p = local.current;

    sampleLattice(lattice, p, built.positions);

    const px = motion.reduced ? 0 : motion.pointer.x;
    const py = motion.reduced ? 0 : motion.pointer.y;
    spin.current.y = damp(spin.current.y, px * 0.34, 3.2, dt);
    spin.current.x = damp(spin.current.x, -py * 0.22, 3.2, dt);

    const idle = motion.reduced ? 0 : performance.now() * 0.00006;
    group.rotation.y = spin.current.y + idle;
    group.rotation.x = spin.current.x + Math.sin(idle * 3) * 0.03;

    const breathe = motion.reduced ? 1 : 1 + Math.sin(performance.now() * 0.0009) * 0.012;
    group.scale.setScalar(lerp(group.scale.x, breathe, 1 - Math.exp(-2 * dt)));

    const [tr, tg, tb] = tintAt(p);
    const deep = 0.34 + p * 0.18;

    for (let i = 0; i < count; i += 1) {
      const o = i * 3;
      dummy.position.set(built.positions[o], built.positions[o + 1], built.positions[o + 2]);
      const s = 0.62 + ((i * 37) % 11) / 22;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      nodes.setMatrixAt(i, dummy.matrix);

      const mix = 0.24 + ((i * 53) % 13) / 26;
      color.setRGB(lerp(deep, tr, mix), lerp(deep, tg, mix), lerp(deep, tb, mix));
      nodes.setColorAt(i, color);
    }
    nodes.instanceMatrix.needsUpdate = true;
    if (nodes.instanceColor) nodes.instanceColor.needsUpdate = true;

    const edgeCount = lattice.edges.length;
    for (let e = 0; e < edgeCount; e += 1) {
      const a = lattice.edges[e] * 3;
      const b = a + 3;
      const o = e * 3;
      edgePositions[o] = built.positions[a];
      edgePositions[o + 1] = built.positions[a + 1];
      edgePositions[o + 2] = built.positions[a + 2];
      edgePositions[o + 3] = built.positions[b];
      edgePositions[o + 4] = built.positions[b + 1];
      edgePositions[o + 5] = built.positions[b + 2];
    }
    edgeGeo.attributes.position.needsUpdate = true;

    built.nodeMat.color.setRGB(tr, tg, tb);
    built.edgeMat.color.setRGB(lerp(tr, 0.5, 0.45), lerp(tg, 0.5, 0.45), lerp(tb, 0.5, 0.45));
    built.edgeMat.opacity = (tier === 'low' ? 0.1 : 0.2) + p * 0.1;
  });

  return <primitive object={built.group} />;
}

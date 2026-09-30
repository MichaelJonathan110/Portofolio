'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { motion } from '@/lib/motion';
import { damp } from '@/lib/utils';

/**
 * Controlled camera movement only: a small parallax offset plus a slow dolly
 * as the story advances. No free orbit, no motion sickness.
 */
export function CameraRig() {
  const { camera } = useThree();

  useFrame((_, rawDelta) => {
    const dt = Math.min(0.05, rawDelta);
    const px = motion.reduced ? 0 : motion.pointer.x;
    const py = motion.reduced ? 0 : motion.pointer.y;
    const story = motion.reduced ? 0.5 : motion.story;

    camera.position.x = damp(camera.position.x, px * 0.55, 2.6, dt);
    camera.position.y = damp(camera.position.y, py * 0.34, 2.6, dt);
    camera.position.z = damp(camera.position.z, 8.4 - story * 1.5, 2.2, dt);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

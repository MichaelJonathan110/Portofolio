# Michael Jonathan Susilo - Portfolio

A personal portfolio for **Michael Jonathan Susilo** - Computer Science at BINUS
University, working with data, databases and software.

Built as a Next.js 14 App Router site with a hand-written WebGL layer (no
react-three-fiber): the lattice in the hero is plain Three.js driven by a single
shared motion store, with a 2D canvas fallback when WebGL is unavailable or the
visitor prefers reduced motion.

## Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS 3.4 with a token layer in `tailwind.config.ts`
- Three.js for the hero lattice; custom `motion` store for pointer/scroll state
- Self-hosted fonts via `next/font` (Space Grotesk, Inter, JetBrains Mono)

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Structure

```
src/
  app/          layout, page, not-found, projects/[id], sitemap, robots
  components/
    sections/   Hero, About, MyData, Stack, Projects, Education, BeyondCode, Contact
    three/      Lattice, LatticeCanvas, LatticeFallback, HeroScene, CameraRig
    ui/         Button, Reveal, SectionHeader, Tag, DataCounter, MagneticCTA, Icons
  content/      site, stack, education, metrics, projects  (all copy lives here)
  hooks/        useInView, useReducedMotion, useDeviceTier, useScrollDriver
  lib/          utils, motion, fonts
```

## Content

Every word on the site comes from `src/content/*.ts`. No proficiency
percentages, no invented metrics. Projects carry `placeholder` and `todo` flags
so unfinished case studies say so on the page instead of pretending otherwise.

## Accessibility

- Semantic landmarks, one `h1` per page, skip link
- Visible focus rings; all motion honours `prefers-reduced-motion`
- WebGL scene has a non-WebGL fallback and is decorative to assistive tech

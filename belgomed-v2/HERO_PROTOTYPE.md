# Belgomed V2 — animated hero prototype

An isolated copy of the Belgomed website with **one** change: the homepage
hero. Everything below the hero — navbar, services, about, process, stats,
FAQ, contact, forms, footer, admin, auth, Supabase, routing, the other pages
and the SEO setup — is the production site, untouched.

Production lives in `BLVJeezy/belgomed` and was not modified.

## Running it

```bash
npm install
npm run dev      # or: npm run build
```

## What the hero does

A closed pharmaceutical bottle that the visitor opens by scrolling:

```
closed bottle → cap unscrews → cap lifts away → bottle leans in →
bottle tips → caplets spill out → caplets fall → the site continues
```

The sequence is scrubbed from scroll position by a single GSAP timeline, so
it is not an autoplay animation: stop scrolling and it stops, scroll up and
it runs backwards to exactly the state it passed through on the way down.

## How it is built

The bottle is **styled DOM, not WebGL**. The cap is a real CSS cylinder — one
drum of slats carries the ribs and rotates, a second concentric drum carries
the lighting and stays still, so the light does not travel with the object.
That choice means the hero inherits the site's own theme tokens, ships no
model or texture to download, has no rendering context that can fail, and
adds ~50 kB gzipped (GSAP + ScrollTrigger) rather than a 3D runtime.

```
src/components/
  HeroSection.tsx              orchestrator; picks breakpoint, mounts fallback
  hero/
    heroConfig.ts              geometry, poses, caplet trajectories — all constants
    useHeroTimeline.ts         the one scroll-scrubbed master timeline
    AnimatedMedicalProduct.tsx the stage
    HeroContent.tsx            copy + CTAs (real DOM, unchanged from production)
    HeroFallback.tsx           static hero for prefers-reduced-motion
    useMediaQuery.ts           one matchMedia subscription for React and GSAP
    hero.css                   product materials
    scene/                     BottleBody, BottleCap, Pill
```

## Tuning it

Timings live in `useHeroTimeline.ts` as timeline positions between 0 and 1.
Geometry, the tipped pose, cap travel and the caplet trajectories live in
`heroConfig.ts`. Every caplet value is a literal constant — nothing is
randomised at render time, which is what keeps the reverse pass identical to
the forward one. Change a number there and both directions stay in sync.

`SCROLL_LENGTH` sets how long the hero pins: 250% of the viewport on desktop,
180% on mobile.

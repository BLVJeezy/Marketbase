import { useRef } from "react";
import AnimatedMedicalProduct from "./hero/AnimatedMedicalProduct";
import HeroFallback from "./hero/HeroFallback";
import { HeroCopy, HeroCta } from "./hero/HeroContent";
import { useHeroTimeline } from "./hero/useHeroTimeline";
import { useMediaQuery } from "./hero/useMediaQuery";
import {
  DESKTOP_CAP,
  DESKTOP_GEOMETRY,
  DESKTOP_PILLS,
  DESKTOP_POSE,
  MOBILE_CAP,
  MOBILE_GEOMETRY,
  MOBILE_PILLS,
  MOBILE_POSE,
} from "./hero/heroConfig";
import "./hero/hero.css";

/**
 * Belgomed hero.
 *
 * A closed pharmaceutical bottle that the visitor opens by scrolling: the cap
 * unscrews, lifts away, the bottle leans in and tips, and a handful of
 * caplets spill out and fall toward the section below. Nothing plays on its
 * own — the whole sequence is scrubbed from scroll position, so it runs
 * backwards exactly as it ran forwards.
 *
 * The product is built from styled DOM rather than WebGL: it inherits the
 * site's own theme tokens, ships no model or texture, and has no rendering
 * context that can fail to initialise.
 */
const HeroSection = () => {
  const rootRef = useRef<HTMLElement>(null);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");

  useHeroTimeline(rootRef, {
    geometry: isDesktop ? DESKTOP_GEOMETRY : MOBILE_GEOMETRY,
    pose: isDesktop ? DESKTOP_POSE : MOBILE_POSE,
    cap: isDesktop ? DESKTOP_CAP : MOBILE_CAP,
    pills: isDesktop ? DESKTOP_PILLS : MOBILE_PILLS,
    isDesktop,
    enabled: !reducedMotion,
  });

  if (reducedMotion) return <HeroFallback isDesktop={isDesktop} />;

  return (
    <section
      ref={rootRef}
      className="hmp-scene relative h-screen w-full overflow-hidden gradient-hero"
    >
      <div className="hmp-grid" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />

      <div className="container mx-auto h-full px-5 md:px-6 pt-24 md:pt-32 pb-8 md:pb-16 relative z-10 flex flex-col md:grid md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:items-center">
        <div className="hero-copy max-w-xl shrink-0">
          <HeroCopy />
          <div className="hero-actions hidden md:block mt-8 md:mt-10">
            <HeroCta />
          </div>
        </div>

        {/* Product stage. Sized in px so the bottle geometry and the caplet
            trajectories stay in the same coordinate space. */}
        <div className="relative flex-1 min-h-0 md:h-[600px] -mx-5 md:mx-0">
          <AnimatedMedicalProduct
            geometry={isDesktop ? DESKTOP_GEOMETRY : MOBILE_GEOMETRY}
            pills={isDesktop ? DESKTOP_PILLS : MOBILE_PILLS}
            baseOffset={isDesktop ? 62 : 46}
            labelSize={isDesktop ? 16.5 : 8.5}
          />
        </div>

        <div className="hero-actions md:hidden shrink-0">
          <HeroCta />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

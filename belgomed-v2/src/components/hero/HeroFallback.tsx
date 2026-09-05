import AnimatedMedicalProduct from "./AnimatedMedicalProduct";
import { HeroCopy, HeroCta } from "./HeroContent";
import { DESKTOP_GEOMETRY, DESKTOP_PILLS, MOBILE_GEOMETRY, MOBILE_PILLS } from "./heroConfig";

/**
 * Static hero, used when the visitor asks for reduced motion.
 *
 * Same copy, same calls to action, same product — but the section is a normal
 * block in the page flow with no pin and no scroll sequence, so nobody is
 * carried through two and a half screens of animation they opted out of. §43
 */
const HeroFallback = ({ isDesktop }: { isDesktop: boolean }) => (
  <section className="hmp-scene relative min-h-screen flex items-center gradient-hero overflow-hidden">
    <div className="hmp-grid" />
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-primary/5 blur-[120px]" />

    <div className="container mx-auto px-5 md:px-6 pt-28 md:pt-36 pb-16 md:pb-24 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
        <div className="max-w-xl">
          <HeroCopy />
          <div className="mt-8 md:mt-10">
            <HeroCta />
          </div>
        </div>
        <div className="h-[340px] md:h-[540px]">
          <AnimatedMedicalProduct
            geometry={isDesktop ? DESKTOP_GEOMETRY : MOBILE_GEOMETRY}
            pills={isDesktop ? DESKTOP_PILLS : MOBILE_PILLS}
            baseOffset={isDesktop ? 90 : 60}
            labelSize={isDesktop ? 15 : 9}
          />
        </div>
      </div>
    </div>

    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
  </section>
);

export default HeroFallback;

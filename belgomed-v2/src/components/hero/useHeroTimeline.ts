import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  mouthOffset,
  SCROLL_LENGTH,
  type BottleGeometry,
  type CapMotion,
  type PillConfig,
  type ProductPose,
} from "./heroConfig";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  geometry: BottleGeometry;
  pose: ProductPose;
  cap: CapMotion;
  pills: PillConfig[];
  isDesktop: boolean;
  /** False under prefers-reduced-motion: no pin, no timeline, no sequence. */
  enabled: boolean;
};

/** Caplet phase, in timeline progress. */
const PILL_START = 0.72;
const PILL_EXIT = 0.042;
const PILL_FALL = 0.118;
const PILL_STAGGER = 0.8;

/**
 * Builds the one master timeline the hero runs on.
 *
 * The timeline has no autoplay of its own: ScrollTrigger scrubs it, so the
 * playhead is a pure function of scroll position. Scrolling up walks the same
 * states back in reverse, and every value it reads is a constant from
 * heroConfig — nothing is randomised at render time, which is what keeps the
 * reverse pass identical to the forward one.
 */
export const useHeroTimeline = (
  root: RefObject<HTMLElement | null>,
  { geometry: g, pose, cap, pills, isDesktop, enabled }: Options
) => {
  useLayoutEffect(() => {
    if (!enabled || !root.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: `+=${isDesktop ? SCROLL_LENGTH.desktop : SCROLL_LENGTH.mobile}%`,
          scrub: isDesktop ? 0.6 : 0.4,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Settle out of the idle float once the visitor takes control. §11
      tl.to(".hmp-float", { "--hmp-idle": 0, duration: 0.1, ease: "power1.out" }, 0.02);

      /* -------------------------------------------------- cap unscrews §16 */
      // Just under two readable turns, paired with a small climb up the
      // thread so the cap still reads as attached for most of the rotation.
      tl.to(".hmp-cap-cyl", { rotateY: 620, duration: 0.28, ease: "power1.inOut" }, 0.14);
      tl.to(".hmp-cap", { y: cap.rise, duration: 0.28, ease: "power1.in" }, 0.14);
      tl.to(".hmp-threads", { opacity: 1, duration: 0.12, ease: "none" }, 0.22);

      /* ------------------------------------------------ camera push-in §18 */
      tl.to(".hmp-camera", { scale: 1.03, duration: 0.14, ease: "power1.inOut" }, 0.06);
      tl.to(".hmp-camera", { scale: 1.07, duration: 0.22, ease: "power1.inOut" }, 0.34);

      /* ------------------------------------------------- cap separates §17 */
      tl.to(".hmp-neck-glow", { opacity: 1, duration: 0.12, ease: "power1.out" }, 0.4);
      // The reflection belongs to the moment the seal breaks; let it settle
      // back once the bottle is on its way over.
      tl.to(".hmp-neck-glow", { opacity: 0.3, duration: 0.14, ease: "power1.inOut" }, 0.62);
      tl.to(
        ".hmp-cap",
        {
          y: cap.lift,
          x: cap.drift,
          rotateZ: -16,
          rotateX: cap.tip,
          duration: 0.14,
          ease: "power2.out",
        },
        0.42
      );
      tl.to(".hmp-cap-cyl", { rotateY: 740, duration: 0.14, ease: "power2.out" }, 0.42);
      // Kept in frame, drifting rather than thrown. §17
      tl.to(
        ".hmp-cap",
        {
          y: cap.settleLift,
          x: cap.settleDrift,
          rotateZ: -24,
          rotateX: cap.tip - 6,
          duration: 0.3,
          ease: "none",
        },
        0.56
      );

      /* --------------------------------------- bottle leans toward viewer §21 */
      tl.to(".hmp-product", { rotateX: 13, duration: 0.12, ease: "power1.inOut" }, 0.5);

      /* ------------------------------------------------- staged tilt §20 */
      tl.to(".hmp-product", { rotateZ: -26, duration: 0.07, ease: "power1.in" }, 0.56);
      tl.to(".hmp-product", { rotateZ: -52, duration: 0.05, ease: "none" }, 0.63);
      tl.to(".hmp-product", { rotateZ: pose.rotZ, rotateX: pose.rotX, duration: 0.03, ease: "power1.out" }, 0.68);
      // Re-frame as the silhouette goes wide, and ease the camera back out so
      // the horizontal bottle still fits the stage.
      tl.to(".hmp-product", { x: pose.x, y: pose.y, duration: 0.15, ease: "power1.inOut" }, 0.56);
      tl.to(".hmp-camera", { scale: 0.99, duration: 0.15, ease: "power1.inOut" }, 0.56);
      tl.to(
        ".hmp-contact-shadow",
        { scaleX: 1.5, scaleY: 0.68, opacity: 0.5, x: 12, duration: 0.15, ease: "power1.inOut" },
        0.56
      );

      /* ------------------------------------------------------- caplets §23 */
      // Anchored to the neck opening for the pose the bottle is holding by
      // now, so the caplets leave the bottle rather than appear beside it.
      const mouth = mouthOffset(g, pose);

      pills.forEach((p, i) => {
        const el = `.hmp-pill:nth-child(${i + 1})`;
        const at = PILL_START + p.delay * PILL_STAGGER;

        gsap.set(el, {
          x: mouth.x,
          y: mouth.y,
          z: 0,
          rotation: 0,
          scale: p.scale * 0.92,
          opacity: 0,
        });

        tl.to(el, { opacity: 1, duration: 0.012, ease: "none" }, at);
        tl.to(
          el,
          {
            x: mouth.x + p.exitX,
            y: mouth.y + p.exitY,
            z: p.depth,
            rotation: p.spin * 0.3,
            scale: p.scale,
            duration: PILL_EXIT,
            ease: "power2.out",
          },
          at
        );
        // Gravity: accelerating fall, carrying the eye toward the section
        // waiting below. §28
        tl.to(
          el,
          {
            x: mouth.x + p.exitX + p.driftX,
            y: mouth.y + p.exitY + p.fall,
            rotation: p.spin,
            duration: PILL_FALL,
            ease: "power2.in",
          },
          at + PILL_EXIT
        );
      });

      /* ---------------------------------------------------- copy recedes §13 */
      // Restrained: the block moves as one and stays legible, it does not
      // animate line by line.
      tl.to(".hero-copy", { opacity: 0.42, y: -22, duration: 0.24, ease: "power1.inOut" }, 0.6);
      // The calls to action recede less than the copy: still plainly there
      // for a visitor who arrived ready to get in touch. §14, §72
      tl.to(".hero-actions", { opacity: 0.78, duration: 0.24, ease: "power1.inOut" }, 0.6);

      /* ------------------------------------------------- scene relaxes §60 */
      tl.to(".hmp-camera", { scale: 0.95, duration: 0.14, ease: "power1.inOut" }, 0.86);
    }, root);

    // Pinning changes document height, so ScrollTrigger has to re-measure
    // once the hero's own layout (web font, logo) has settled. On a
    // client-side navigation the load event has already fired, so refresh
    // straight away instead of waiting for one that will never come.
    const refresh = () => ScrollTrigger.refresh();
    if (document.readyState === "complete") refresh();
    else window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [root, g, pose, cap, pills, isDesktop, enabled]);
};

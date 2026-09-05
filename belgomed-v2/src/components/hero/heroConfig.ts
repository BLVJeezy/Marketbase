/**
 * Deterministic configuration for the animated Belgomed hero.
 *
 * Every value here is a constant: the scroll timeline reads from this module
 * only, never from Math.random(). That is what makes the sequence reverse
 * exactly when the visitor scrolls back up.
 */

export type BottleGeometry = {
  /** Main cylinder of the bottle, excluding the shoulder taper. */
  bodyW: number;
  bodyH: number;
  /** Taper between the body and the neck. */
  shoulderH: number;
  /** Threaded neck the cap screws onto. */
  neckW: number;
  neckH: number;
  /** Ribbed pharmaceutical cap. */
  capW: number;
  capH: number;
  /** Distance from the bottle base to the cap skirt when closed. */
  capRest: number;
  /** Number of slats forming the cap cylinder (also the visible ribs). */
  capRibs: number;
  /** Caplet size. */
  pillW: number;
  pillH: number;
};

export const DESKTOP_GEOMETRY: BottleGeometry = {
  bodyW: 233,
  bodyH: 300,
  shoulderH: 40,
  neckW: 116,
  neckH: 34,
  capW: 134,
  capH: 72,
  capRest: 334,
  capRibs: 20,
  pillW: 42,
  pillH: 17,
};

export const MOBILE_GEOMETRY: BottleGeometry = {
  bodyW: 138,
  bodyH: 172,
  shoulderH: 25,
  neckW: 71,
  neckH: 21,
  capW: 83,
  capH: 44,
  capRest: 191,
  capRibs: 16,
  pillW: 25,
  pillH: 10,
};

/**
 * How far the cap travels. Kept alongside the geometry so the mobile cap
 * never lifts further than the smaller stage can show. §17
 */
export type CapMotion = {
  /** Climb up the thread while it is still unscrewing. */
  rise: number;
  /** Lift and lateral drift once it separates. */
  lift: number;
  drift: number;
  /** Slow continued drift while the bottle tips. */
  settleLift: number;
  settleDrift: number;
  /** Tips the cap's closed top toward the camera once it is off, so the
      viewer sees a cap rather than looking up into an open cup. */
  tip: number;
};

export const DESKTOP_CAP: CapMotion = {
  rise: -18,
  lift: -125,
  drift: 83,
  settleLift: -141,
  settleDrift: 108,
  tip: -26,
};

export const MOBILE_CAP: CapMotion = {
  rise: -12,
  lift: -85,
  drift: 48,
  settleLift: -97,
  settleDrift: 64,
  tip: -22,
};

/** Total height of the closed bottle, base to neck opening. */
export const bottleHeight = (g: BottleGeometry) => g.bodyH + g.shoulderH + g.neckH;

/**
 * Pose the product settles into just before the first caplet leaves the neck.
 * The pill trajectories are anchored to this pose, so the two stay in sync.
 */
export type ProductPose = {
  /** Rotation about the base pivot. Negative tips the neck to the left. */
  rotZ: number;
  /** Lean toward the viewer. */
  rotX: number;
  /** Re-framing translation applied while the bottle goes horizontal. */
  x: number;
  y: number;
};

export const DESKTOP_POSE: ProductPose = { rotZ: -74, rotX: 8, x: 34, y: -28 };
// A narrow screen has no copy column to tip away from, so the mobile bottle
// tips less far and re-frames further right: at -68deg from the stage centre
// the neck ran off the left edge and took the caplets with it.
export const MOBILE_POSE: ProductPose = { rotZ: -60, rotX: 6, x: 82, y: -40 };

/**
 * Where the neck opening ends up, in pixels relative to the bottle's base
 * pivot, once the product is in `pose`. CSS rotations are clockwise on a
 * y-down axis: x' = x·cos − y·sin, y' = x·sin + y·cos.
 */
export const mouthOffset = (g: BottleGeometry, pose: ProductPose) => {
  const r = (pose.rotZ * Math.PI) / 180;
  const my = -bottleHeight(g);
  return {
    x: -my * Math.sin(r) + pose.x,
    y: my * Math.cos(r) + pose.y,
  };
};

export type PillConfig = {
  /** Offset from the start of the pill phase, in timeline progress. */
  delay: number;
  /** Where the caplet clears the neck, relative to the opening. */
  exitX: number;
  exitY: number;
  /** Sideways drift accumulated during the fall. */
  driftX: number;
  /** How far it falls before leaving the frame. */
  fall: number;
  /** Total rotation over the trajectory. */
  spin: number;
  /** Depth: positive moves the caplet toward the viewer. */
  depth: number;
  scale: number;
  /** A teal-tinted caplet reads as the branded one; keep it rare. */
  tinted: boolean;
};

export const DESKTOP_PILLS: PillConfig[] = [
  { delay: 0.0, exitX: -87, exitY: -4, driftX: -34, fall: 627, spin: 124, depth: 0, scale: 1.0, tinted: false },
  { delay: 0.028, exitX: -116, exitY: 16, driftX: 29, fall: 694, spin: -88, depth: -52, scale: 0.9, tinted: false },
  { delay: 0.058, exitX: -74, exitY: 7, driftX: -83, fall: 582, spin: 158, depth: 38, scale: 1.07, tinted: true },
  { delay: 0.086, exitX: -132, exitY: 25, driftX: 65, fall: 728, spin: -136, depth: -72, scale: 0.86, tinted: false },
  { delay: 0.116, exitX: -83, exitY: -11, driftX: -16, fall: 560, spin: 98, depth: 81, scale: 1.16, tinted: false },
  { delay: 0.146, exitX: -103, exitY: 20, driftX: 90, fall: 672, spin: -62, depth: -25, scale: 0.95, tinted: true },
];

export const MOBILE_PILLS: PillConfig[] = [
  { delay: 0.0, exitX: -30, exitY: 0, driftX: 14, fall: 437, spin: 112, depth: 0, scale: 1.0, tinted: false },
  { delay: 0.038, exitX: -40, exitY: 12, driftX: 34, fall: 494, spin: -84, depth: -32, scale: 0.9, tinted: false },
  { delay: 0.078, exitX: -26, exitY: 6, driftX: -10, fall: 402, spin: 146, depth: 30, scale: 1.08, tinted: true },
  { delay: 0.116, exitX: -44, exitY: 16, driftX: 48, fall: 518, spin: -118, depth: -46, scale: 0.88, tinted: false },
];

/**
 * Scroll distance the pin holds for, as a share of the viewport height.
 * Roughly two and a half extra screens on desktop, well short of trapping
 * the visitor.
 */
export const SCROLL_LENGTH = { desktop: 250, mobile: 180 };

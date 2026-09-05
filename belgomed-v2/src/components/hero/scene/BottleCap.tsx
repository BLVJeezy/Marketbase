import type { CSSProperties } from "react";

/**
 * Ribbed pharmaceutical cap, built as a real CSS cylinder.
 *
 * Two concentric drums of slats. The inner one carries the ribs and is what
 * the timeline rotates; the outer one carries the lighting and never turns.
 * Keeping the light still while the geometry moves underneath it is what
 * makes the cap read as unscrewing rather than as a spinning graphic — and,
 * unlike a flat highlight laid over the front, a lit cylinder still behaves
 * when the cap tips away from the camera.
 */

/** Key light, in the cylinder's angular coordinates. 0deg faces the viewer. */
const KEY_LIGHT = -38;

const litSlat = (angle: number): string => {
  const facing = Math.cos(((angle - KEY_LIGHT) * Math.PI) / 180);
  if (facing >= 0.45) {
    const lit = Math.min(1, (facing - 0.45) / 0.55);
    return `hsl(var(--hmp-spec) / ${(lit * 0.42).toFixed(3)})`;
  }
  const shade = Math.min(1, (0.45 - facing) / 1.45);
  return `hsl(var(--hmp-shade) / ${(shade * 0.72).toFixed(3)})`;
};

const BottleCap = ({ ribs }: { ribs: number }) => {
  const step = 360 / ribs;
  const slats = Array.from({ length: ribs }, (_, i) => i * step);

  return (
    <div className="hmp-cap">
      <div className="hmp-cap-cyl">
        {slats.map((angle, i) => (
          <div
            key={i}
            className="hmp-rib"
            style={{ transform: `rotateY(${angle}deg) translateZ(calc(var(--hmp-cap-w) / 2))` }}
          />
        ))}
      </div>

      <div className="hmp-cap-static">
        {slats.map((angle, i) => (
          <div
            key={i}
            className="hmp-cap-lit"
            style={
              {
                transform: `rotateY(${angle}deg) translateZ(calc(var(--hmp-cap-w) / 2 + 0.8px))`,
                background: litSlat(angle),
              } as CSSProperties
            }
          />
        ))}
        <div className="hmp-cap-top" />
        <div className="hmp-cap-inner" />
      </div>
    </div>
  );
};

export default BottleCap;

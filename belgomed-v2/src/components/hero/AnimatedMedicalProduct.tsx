import type { CSSProperties } from "react";
import BottleBody from "./scene/BottleBody";
import BottleCap from "./scene/BottleCap";
import Pill from "./scene/Pill";
import { bottleHeight, type BottleGeometry, type PillConfig } from "./heroConfig";

type Props = {
  geometry: BottleGeometry;
  pills: PillConfig[];
  /** Distance from the bottom of the stage to the bottle's base. */
  baseOffset: number;
  /** Font size the label's internal scale is derived from. */
  labelSize: number;
};

/**
 * The product itself: a closed pharmaceutical bottle on a lit stage.
 *
 * Nothing here animates on its own. Every transform is applied by
 * useHeroTimeline from scroll progress, which is what lets the whole sequence
 * run backwards as cleanly as it runs forwards.
 */
const AnimatedMedicalProduct = ({ geometry: g, pills, baseOffset, labelSize }: Props) => {
  const vars = {
    "--hmp-body-w": `${g.bodyW}px`,
    "--hmp-body-h": `${g.bodyH}px`,
    "--hmp-shoulder-h": `${g.shoulderH}px`,
    "--hmp-neck-w": `${g.neckW}px`,
    "--hmp-neck-h": `${g.neckH}px`,
    "--hmp-cap-w": `${g.capW}px`,
    "--hmp-cap-h": `${g.capH}px`,
    "--hmp-cap-rest": `${g.capRest}px`,
    "--hmp-rib-w": `${(Math.PI * g.capW) / g.capRibs + 1.5}px`,
    "--hmp-bottle-h": `${bottleHeight(g)}px`,
    "--hmp-base-offset": `${baseOffset}px`,
    "--hmp-pill-w": `${g.pillW}px`,
    "--hmp-pill-h": `${g.pillH}px`,
    "--hmp-label-size": `${labelSize}px`,
  } as CSSProperties;

  return (
    <div className="hmp-stage" style={vars} aria-hidden="true">
      <div className="hmp-camera">
        <div className="hmp-float">
          <div className="hmp-contact-shadow" />
          <div className="hmp-product">
            <div className="hmp-neck-glow" />
            <BottleBody />
          </div>
          {/* The cap sits outside the product: once it is off, it is a
              separate object and must not be swept around by the bottle's
              tilt. Until it separates the bottle is still upright, so the
              two read as one closed container. §17 */}
          <BottleCap ribs={g.capRibs} />
          <div className="hmp-pill-layer">
            {pills.map((config, i) => (
              <Pill key={i} config={config} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedMedicalProduct;

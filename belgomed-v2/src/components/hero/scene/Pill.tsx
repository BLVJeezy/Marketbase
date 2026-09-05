import type { PillConfig } from "../heroConfig";

/** A single caplet. Position and rotation are driven entirely by the timeline. */
const Pill = ({ config }: { config: PillConfig }) => (
  <div className={`hmp-pill${config.tinted ? " hmp-pill--tinted" : ""}`} />
);

export default Pill;

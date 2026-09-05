import { useEffect, useState } from "react";

/**
 * Subscribes to a media query.
 *
 * The hero swaps real geometry (element sizes, caplet count) between
 * breakpoints, so React and the GSAP timeline have to agree on which layout
 * is live. Driving both from one matchMedia subscription keeps them in sync
 * and keeps ad-hoc innerWidth checks out of the components.
 */
export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches
  );

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
};

import { useEffect, useMemo, useState } from "react";

type UseScrollSpyOptions = {
  /**
   * The section ids you want to observe (e.g. ["about", "experience"]).
   * Each id should correspond to an element in the DOM.
   */
  sectionIds: readonly string[];
  /**
   * Tuning knob for when a section is considered "active".
   * Negative top/bottom values generally feel best for scroll-spy.
   */
  rootMargin?: string;
  /**
   * Multiple thresholds helps produce stable updates across differently-sized sections.
   */
  threshold?: number | readonly number[];
  /**
   * The initial active id before the observer fires.
   */
  defaultActiveId?: string;
};

/**
 * Scroll-spy for in-page section navigation.
 *
 * Intent:
 * - Make the left nav reflect the user's reading position (not the click position)
 * - Prefer stability over hyper-reactivity (avoid "flickering" between sections)
 */
export function useScrollSpy({
  sectionIds,
  rootMargin = "-40% 0px -55% 0px",
  threshold = [0.1, 0.25, 0.5],
  defaultActiveId = sectionIds[0] ?? "",
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState(defaultActiveId);

  // Avoid effect re-runs due to referential changes; ids are the actual semantic dependency.
  const stableIdsKey = useMemo(() => sectionIds.join("|"), [sectionIds]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (sectionIds.length === 0) return;

    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;

        // Pick the most "present" section to prevent edge flicker near boundaries.
        const best = [...visible].sort(
          (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0),
        )[0];

        const id = (best?.target as HTMLElement | undefined)?.id;
        if (id) setActiveId(id);
      },
      { rootMargin, threshold: threshold as number | number[] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stableIdsKey, rootMargin]);

  return activeId;
}



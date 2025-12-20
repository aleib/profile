import { useEffect, useMemo, useRef, useState } from "react";

type UseScrollSpyOptions = {
  /**
   * The section ids you want to observe (e.g. ["about", "experience"]).
   * Each id should correspond to an element in the DOM.
   */
  sectionIds: readonly string[];
  /**
   * Back-compat knob from the previous IntersectionObserver implementation.
   *
   * We *approximate* this by deriving `activationPoint` from the top margin when it is a percentage,
   * e.g. "-35% 0px -60% 0px" -> activationPoint ~ 0.35.
   */
  rootMargin?: string;
  /**
   * Back-compat only (no longer used in the scroll-position based implementation).
   */
  threshold?: number | readonly number[];
  /**
   * The initial active id before the observer fires.
   */
  defaultActiveId?: string;
  /**
   * Where in the viewport (or scroll container) we consider the "reading line" for determining
   * the active section.
   *
   * `0` = very top, `0.5` = middle, `1` = bottom.
   */
  activationPoint?: number;
  /**
   * Optional scroll container. If provided, we listen to its `scroll` event and compute positions
   * relative to its viewport. If omitted, we use `window`.
   */
  root?: HTMLElement | null;
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
  // Slightly biased towards the center of the viewport so the highlight feels like "reading position".
  rootMargin = "-35% 0px -60% 0px",
  defaultActiveId = sectionIds[0] ?? "",
  activationPoint,
  root,
}: UseScrollSpyOptions) {
  const [activeId, setActiveId] = useState(defaultActiveId);

  // Avoid effect re-runs due to referential changes; ids are the actual semantic dependency.
  const stableIdsKey = useMemo(() => sectionIds.join("|"), [sectionIds]);
  const ids = useMemo(() => {
    if (!stableIdsKey) return [];
    return stableIdsKey.split("|").filter(Boolean);
  }, [stableIdsKey]);

  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (ids.length === 0) return;

    const parseActivationFromRootMargin = (margin: string) => {
      const topToken = margin.trim().split(/\s+/)[0] ?? "";
      if (!topToken.endsWith("%")) return null;

      const parsed = Number.parseFloat(topToken);
      if (!Number.isFinite(parsed)) return null;

      const pct = Math.abs(parsed) / 100;
      return Number.isFinite(pct) ? Math.min(1, Math.max(0, pct)) : null;
    };

    const resolvedActivationPoint =
      activationPoint ??
      parseActivationFromRootMargin(rootMargin) ??
      // A touch above center generally feels like "reading position".
      0.4;

    const computeActiveId = () => {
      const rootEl = root ?? null;
      const rootRect = rootEl?.getBoundingClientRect() ?? null;
      const rootTop = rootRect?.top ?? 0;
      const rootHeight = rootRect?.height ?? window.innerHeight;
      const activationY = rootTop + rootHeight * resolvedActivationPoint;

      const sections = ids
        .map((id) => {
          const el = document.getElementById(id);
          if (!el) return null;
          return { id, top: el.getBoundingClientRect().top };
        })
        .filter((s): s is { id: string; top: number } => s !== null)
        .sort((a, b) => a.top - b.top);

      if (sections.length === 0) return;

      // Choose the last section whose top is above the activation line.
      // This is stable and matches "what I'm currently reading".
      let nextId = sections[0]?.id ?? "";
      for (const section of sections) {
        if (section.top <= activationY) nextId = section.id;
      }

      if (!nextId) return;
      setActiveId((prev) => (prev === nextId ? prev : nextId));
    };

    const scheduleCompute = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = null;
        computeActiveId();
      });
    };

    const scrollTarget: Window | HTMLElement = root ?? window;
    scrollTarget.addEventListener("scroll", scheduleCompute, { passive: true });
    window.addEventListener("resize", scheduleCompute, { passive: true });

    // Mount + DOM changes (late sections) should also update the active id.
    scheduleCompute();
    const mutationObserver = new MutationObserver(scheduleCompute);
    mutationObserver.observe(document.body, { subtree: true, childList: true });

    return () => {
      mutationObserver.disconnect();
      scrollTarget.removeEventListener(
        "scroll",
        scheduleCompute as EventListener
      );
      window.removeEventListener("resize", scheduleCompute as EventListener);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [ids, activationPoint, root, rootMargin]);

  return activeId;
}

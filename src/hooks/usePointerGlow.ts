import type { CSSProperties, RefObject } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type UsePointerGlowOptions = {
  /**
   * Radius of the glow "spotlight" in px.
   * Bigger = softer / more ambient.
   */
  radiusPx?: number;
  /**
   * Opacity of the glow color (0..1). Keep this subtle; it reads best on dark themes.
   */
  opacity?: number;
  /**
   * Force-disable the effect (useful for experiments / A/B, etc).
   */
  disabled?: boolean;
};

type UsePointerGlowResult<T extends HTMLElement> = {
  containerRef: RefObject<T | null>;
  /**
   * Stable style object for the overlay element.
   * Position is driven by CSS vars we update on the container (no rerenders on move).
   */
  glowStyle: CSSProperties;
  /**
   * Intended to drive simple enter/leave opacity transitions.
   */
  isActive: boolean;
};

/**
 * Mouse-follow glow ("spotlight") that feels premium on dark UIs.
 *
 * Intent:
 * - Track pointer movement without rerendering (updates CSS variables directly)
 * - Avoid doing work on touch devices or for users who prefer reduced motion
 */
export function usePointerGlow<T extends HTMLElement>({
  radiusPx = 760,
  opacity = 0.05,
  disabled = false,
}: UsePointerGlowOptions = {}): UsePointerGlowResult<T> {
  const containerRef = useRef<T | null>(null);
  const [isActive, setIsActive] = useState(false);

  const glowStyle = useMemo<CSSProperties>(() => {
    const safeOpacity = Math.min(1, Math.max(0, opacity));
    const safeRadiusPx = Math.max(0, radiusPx);

    return {
      background: `radial-gradient(${safeRadiusPx}px circle at var(--glow-x, 50%) var(--glow-y, 40%), hsl(var(--primary) / ${safeOpacity}), transparent 60%)`,
      // Slight blur keeps it "glowy" and hides any trackpad jitter.
      filter: "blur(24px)",
    };
  }, [opacity, radiusPx]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (disabled) return;

    // This effect is intended for mouse/trackpad, and we want to respect reduced motion.
    const canHover = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!canHover || prefersReducedMotion) return;

    const el = containerRef.current;
    if (!el) return;

    // Avoid a "dead" first hover where the glow appears far from the cursor.
    el.style.setProperty("--glow-x", "50%");
    el.style.setProperty("--glow-y", "40%");

    let rafId: number | null = null;
    let lastClientX = 0;
    let lastClientY = 0;

    const scheduleUpdate = (clientX: number, clientY: number) => {
      lastClientX = clientX;
      lastClientY = clientY;

      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;

        const rect = el.getBoundingClientRect();
        const x = Math.min(rect.width, Math.max(0, lastClientX - rect.left));
        const y = Math.min(rect.height, Math.max(0, lastClientY - rect.top));

        el.style.setProperty("--glow-x", `${Math.round(x)}px`);
        el.style.setProperty("--glow-y", `${Math.round(y)}px`);
      });
    };

    const onPointerEnter = (e: PointerEvent) => {
      setIsActive(true);
      scheduleUpdate(e.clientX, e.clientY);
    };

    const onPointerMove = (e: PointerEvent) => {
      scheduleUpdate(e.clientX, e.clientY);
    };

    const onPointerLeave = () => {
      setIsActive(false);
    };

    el.addEventListener("pointerenter", onPointerEnter, { passive: true });
    el.addEventListener("pointermove", onPointerMove, { passive: true });
    el.addEventListener("pointerleave", onPointerLeave, { passive: true });

    return () => {
      el.removeEventListener("pointerenter", onPointerEnter as EventListener);
      el.removeEventListener("pointermove", onPointerMove as EventListener);
      el.removeEventListener("pointerleave", onPointerLeave as EventListener);
      if (rafId !== null) window.cancelAnimationFrame(rafId);
    };
  }, [disabled]);

  return { containerRef, glowStyle, isActive };
}

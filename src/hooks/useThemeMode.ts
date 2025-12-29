import { useEffect, useMemo, useState } from "react";

export type ThemeMode = "light" | "dark";

const STORAGE_KEY = "theme-mode";
const LIGHT_CLASS = "light";

function getSystemThemeMode(): ThemeMode {
  // Treat "light" as an explicit preference; otherwise default to "dark".
  return window.matchMedia?.("(prefers-color-scheme: light)").matches
    ? "light"
    : "dark";
}

function readStoredThemeMode(): ThemeMode | null {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw === "light" || raw === "dark" ? raw : null;
}

function applyThemeMode(mode: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle(LIGHT_CLASS, mode === "light");
  // Helps native form controls pick the right base styling.
  root.style.colorScheme = mode;
}

/**
 * Theme mode controller that:
 * - Defaults to the system color scheme
 * - Persists a user override once they toggle
 * - Tracks system changes *only* when there is no user override
 */
export function useThemeMode() {
  const initial = useMemo(() => {
    if (typeof window === "undefined") return "dark" as const;
    return readStoredThemeMode() ?? getSystemThemeMode();
  }, []);

  const [mode, setMode] = useState<ThemeMode>(initial);
  const [hasUserOverride, setHasUserOverride] = useState(() => {
    if (typeof window === "undefined") return false;
    return readStoredThemeMode() !== null;
  });

  useEffect(() => {
    applyThemeMode(mode);
  }, [mode]);

  useEffect(() => {
    if (hasUserOverride) return;

    const mql = window.matchMedia("(prefers-color-scheme: light)");
    const onChange = () => setMode(getSystemThemeMode());

    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [hasUserOverride]);

  const setThemeMode = (next: ThemeMode) => {
    localStorage.setItem(STORAGE_KEY, next);
    setHasUserOverride(true);
    setMode(next);
  };

  const toggleThemeMode = () => {
    setThemeMode(mode === "light" ? "dark" : "light");
  };

  return {
    mode,
    hasUserOverride,
    setThemeMode,
    toggleThemeMode,
  };
}





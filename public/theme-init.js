/**
 * Apply theme before React mounts to avoid a light↔dark flash.
 * Dark is the default (CSS vars on :root); light mode is activated via `.light` on <html>.
 *
 * Kept as a blocking, non-module script so it runs as early as possible during HTML parsing.
 */
(() => {
  try {
    const stored = localStorage.getItem("theme-mode");
    const prefersLight =
      window.matchMedia?.("(prefers-color-scheme: light)").matches ?? false;

    const resolved =
      stored === "light" || stored === "dark"
        ? stored
        : prefersLight
        ? "light"
        : "dark";

    document.documentElement.classList.toggle("light", resolved === "light");
    document.documentElement.style.colorScheme = resolved;
  } catch {
    // Intentionally ignore failures (e.g. storage disabled) and fall back to default styles.
  }
})();

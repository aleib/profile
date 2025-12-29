import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a responsive image srcset string for optimized loading.
 * Supports thumbnail (400w), mobile (800w), and full-size images.
 *
 * @param basePath - Base image path (e.g., "/images/hunch-canvas.png")
 * @param options - Configuration options
 * @returns srcset string for use in <img srcset>
 *
 * @example
 * // With variants: thumbnail, mobile, and full
 * getResponsiveSrcset("/images/hunch-canvas.png", { hasVariants: true })
 * // Returns: "/images/hunch-canvas-thumb.png 400w, /images/hunch-canvas-mobile.png 800w, /images/hunch-canvas.png 1600w"
 */
export function getResponsiveSrcset(
  basePath: string,
  options?: {
    /** @deprecated Use hasVariants instead */
    hasThumbnail?: boolean;
    hasVariants?: boolean;
    thumbnailWidth?: number;
    mobileWidth?: number;
    fullWidth?: number;
  }
): string {
  const {
    hasThumbnail = false,
    hasVariants = hasThumbnail, // Backwards compatible
    thumbnailWidth = 400,
    mobileWidth = 800,
    fullWidth = 1600,
  } = options ?? {};

  if (!hasVariants) {
    // If no variants exist, still provide srcset for browser optimization
    return `${basePath} ${fullWidth}w`;
  }

  // Helper to generate variant path by inserting suffix before the extension
  const getVariantPath = (suffix: string) => {
    const extIndex = basePath.lastIndexOf(".");
    return extIndex > 0
      ? `${basePath.slice(0, extIndex)}${suffix}${basePath.slice(extIndex)}`
      : `${basePath}${suffix}`;
  };

  const thumbnailPath = getVariantPath("-thumb");
  const mobilePath = getVariantPath("-mobile");

  return `${thumbnailPath} ${thumbnailWidth}w, ${mobilePath} ${mobileWidth}w, ${basePath} ${fullWidth}w`;
}

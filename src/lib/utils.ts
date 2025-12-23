import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Generates a responsive image srcset string for optimized loading.
 * Supports both thumbnail and full-size images.
 *
 * @param basePath - Base image path (e.g., "/images/hunch-canvas.png")
 * @param options - Configuration options
 * @returns srcset string for use in <img srcset>
 *
 * @example
 * // With thumbnail: "/images/hunch-canvas-thumb.png" and "/images/hunch-canvas.png"
 * getResponsiveSrcset("/images/hunch-canvas.png", { hasThumbnail: true })
 * // Returns: "/images/hunch-canvas-thumb.png 400w, /images/hunch-canvas.png 800w"
 */
export function getResponsiveSrcset(
  basePath: string,
  options?: {
    hasThumbnail?: boolean;
    thumbnailWidth?: number;
    fullWidth?: number;
  }
): string {
  const {
    hasThumbnail = false,
    thumbnailWidth = 400,
    fullWidth = 800,
  } = options ?? {};

  if (!hasThumbnail) {
    // If no thumbnail exists, still provide srcset for browser optimization
    return `${basePath} ${fullWidth}w`;
  }

  // Generate thumbnail path by inserting "-thumb" before the extension
  const extIndex = basePath.lastIndexOf(".");
  const thumbnailPath =
    extIndex > 0
      ? `${basePath.slice(0, extIndex)}-thumb${basePath.slice(extIndex)}`
      : `${basePath}-thumb`;

  return `${thumbnailPath} ${thumbnailWidth}w, ${basePath} ${fullWidth}w`;
}

import ReactGA from "react-ga4";

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;

/**
 * Initialize Google Analytics 4.
 * Only initializes if a valid measurement ID is provided.
 */
export const initGA = (): void => {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  ReactGA.initialize(GA_MEASUREMENT_ID);
};

/**
 * Track a page view. Call this on route changes.
 */
export const trackPageView = (path: string): void => {
  if (!GA_MEASUREMENT_ID) {
    return;
  }

  ReactGA.send({ hitType: "pageview", page: path });
};

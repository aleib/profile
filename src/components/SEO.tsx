import { Helmet } from "react-helmet-async";

type SEOProps = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
};

const BASE_URL = "https://aleib.com";
const DEFAULT_TITLE = "Alex Leibhammer | Senior Frontend Engineer & Tech Lead";
const DEFAULT_DESCRIPTION =
  "Senior Frontend Engineer and Tech Lead specializing in React, TypeScript, and AI-driven products. Building data visualization, workflow automation, and consumer-scale applications.";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.png`;

/**
 * SEO component that manages page-specific meta tags.
 * Uses react-helmet-async to update document head.
 */
export const SEO = ({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "",
  image = DEFAULT_IMAGE,
}: SEOProps) => {
  const fullTitle = title ? `${title} | Alex Leibhammer` : DEFAULT_TITLE;
  const canonicalUrl = `${BASE_URL}${path}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

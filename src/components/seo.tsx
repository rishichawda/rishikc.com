import React from "react";

import { globalHistory } from "@reach/router";

import { SiteMetadata } from "../../static/metadata";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import useIcon from "../hooks/use-icon";

const SEO = ({
  title,
  description,
  keywords,
  image,
  type,
  children,
}: SeoProps) => {
  const defaultSiteMetadata = useSiteMetadata() as SiteMetadata;

  const icon = useIcon();

  const seo = {
    title: title || defaultSiteMetadata.title,
    description: description || defaultSiteMetadata.description,
    image: `${defaultSiteMetadata.siteUrl}${image || icon}`,
    type: type || "WebSite",
    url: `${defaultSiteMetadata.siteUrl}${globalHistory.location.pathname}`,
  };

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      {/* Open graph / Facebook */}
      <meta property="og:title" content={seo.title} />
      <meta property="og:site_name" content={defaultSiteMetadata.title} />
      <meta property="og:type" content={defaultSiteMetadata.og.type} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      {/* Twitter */}
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:card" content={defaultSiteMetadata.twitter.card} />
      <meta
        name="twitter:creator"
        content={defaultSiteMetadata.twitter.creator}
      />
      <meta name="twitter:site" content={defaultSiteMetadata.twitter.creator} />
      <meta name="twitter:image" content={seo.image} />
      {/* Structured Data */}
      <script type="application/ld+json">
        {`{
          "@context": "https://schema.org/",
          "@type": "${seo.type}",
          "@id": "${seo.url}",
          "headline": "${seo.title}",
          "description": "${seo.description}",
          ${
            keywords
              ? `"keywords": ${JSON.stringify(keywords.split(","))},`
              : ""
          }
          "author": {
            "@type": "Person",
            "name": "Rishi Kumar Chawda"
          }
        }`}
      </script>
      {children}
      <meta
        name="theme-color"
        content="#f9fafb"
        media="(prefers-color-scheme: light)"
      />
      <meta
        name="theme-color"
        content="#1e293b"
        media="(prefers-color-scheme: dark)"
      />
    </>
  );
};

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pathname?: string;
  image?: string;
  type?: string;
  children?: React.ReactNode;
};

export default SEO;

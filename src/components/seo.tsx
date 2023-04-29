import React from "react";

import { SiteMetadata } from "../../static/metadata";
import { useSiteMetadata } from "../hooks/use-site-metadata";

const SEO = ({ title, description, keywords, image, children }: SeoProps) => {
  const defaultSiteMetadata = useSiteMetadata() as SiteMetadata;

  const seo = {
    title: title || defaultSiteMetadata.title,
    description: description || defaultSiteMetadata.description,
    image: `${defaultSiteMetadata.siteUrl}/${
      image || defaultSiteMetadata.image
    }`,
  };

  return (
    <>
      <html lang="en" />
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <meta name="image" content={seo.image} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:site_name" content={seo.title} />
      <meta name="og:type" content={defaultSiteMetadata.og.type} />
      <meta name="og:description" content={seo.description} />
      <meta name="og:image" content={seo.image} />
      <meta
        name="og:url"
        content={`${defaultSiteMetadata.siteUrl}${location.pathname}`}
      />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:card" content={defaultSiteMetadata.twitter.card} />
      <meta
        name="twitter:creator"
        content={defaultSiteMetadata.twitter.creator}
      />
      <meta name="twitter:image" content={seo.image} />
      {children}
    </>
  );
};

type SeoProps = {
  title?: string;
  description?: string;
  keywords?: string;
  pathname?: string;
  image?: string;
  children?: React.ReactNode;
};

export default SEO;

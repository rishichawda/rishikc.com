import React from "react";

import { globalHistory } from "@reach/router";

import { SiteMetadata } from "../../../static/metadata";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import useIcon from "../../hooks/use-icon";
import JsonLDSchema from "./json_ld";

const SEO = (props: SeoProps) => {
  const { title, description, keywords, image, type, children, articleData } =
    props;
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
      {/* Structured data */}
      <JsonLDSchema
        article={
          seo.type === "NewsArticle"
            ? {
                "@id": seo.url,
                "@type": "NewsArticle",
                image: seo.image,
                headline: seo.title,
                dateCreated: articleData?.frontmatter?.date!,
                dateModified:
                  articleData?.parent?.modifiedTime ||
                  articleData?.frontmatter?.date!,
                datePublished: articleData?.frontmatter?.date!,
                author: {
                  "@type": "Person",
                  name: "Rishi Kumar Chawda",
                  url: defaultSiteMetadata.schema.author?.url!,
                  sameAs: defaultSiteMetadata.schema.author?.sameAs!,
                },
                creator: {
                  "@type": "Person",
                  name: "Rishi Kumar Chawda",
                  url: defaultSiteMetadata.schema.author?.url!,
                  sameAs: defaultSiteMetadata.schema.author?.sameAs!,
                },
                publisher: {
                  "@type": "Organization",
                  name: defaultSiteMetadata.title,
                  url: defaultSiteMetadata.siteUrl,
                  logo: `${defaultSiteMetadata.siteUrl}${icon}`,
                  sameAs: defaultSiteMetadata.schema.author?.sameAs!,
                },
              }
            : undefined
        }
        website={{
          "@context": "https://schema.org/",
          "@type": "WebSite",
          name: seo.title,
          url: seo.url,
          description: seo.description,
          keywords: keywords.length ? keywords.split(",") : [],
          mainEntityOfPage: seo.url,
          image: `${defaultSiteMetadata.siteUrl}${icon}`,
        }}
      />
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
  keywords: string;
  image?: string;
  type: "NewsArticle" | "WebSite";
  articleData?: Queries.Mdx;
  children?: React.ReactNode;
};

SEO.defaultProps = {
  keywords: "",
  type: "WebSite",
};

export default SEO;

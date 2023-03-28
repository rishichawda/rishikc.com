import React, { ComponentProps, ComponentPropsWithoutRef } from "react"
import { SiteMetadata } from "../../static/metadata"
import { useSiteMetadata } from "../hooks/use-site-metadata"

const SEO = ({ title, description, pathname, children }: SeoProps) => {
  const defaultSiteMetadata = useSiteMetadata() as SiteMetadata

  const seo = {
    title: title || defaultSiteMetadata.title,
    description: description || defaultSiteMetadata.description,
    image: `${defaultSiteMetadata.siteUrl}${defaultSiteMetadata.image}`,
    url: `${defaultSiteMetadata.siteUrl}${pathname || ``}`,
  }

  return (
    <>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />
      <meta name="og:title" content={seo.title} />
      <meta name="og:type" content={defaultSiteMetadata.og.type} />
      <meta name="og:description" content={seo.description} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:url" content={seo.url} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:card" content={defaultSiteMetadata.twitter.card} />
      <meta name="twitter:creator" content={defaultSiteMetadata.twitter.creator} />
      <meta name="twitter:image" content={seo.image} />
      {children}
    </>
  )
}

type SeoProps = {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

export default SEO
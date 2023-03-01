/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import PropTypes from "prop-types"
import getSiteMetadata from "query/getSiteMetadata"
import * as React from "react"
import { Helmet } from "react-helmet"

type SEOProps = {
  description: string,
  lang: string,
  meta: [],
  title: string
}

function SEO({ description, lang, meta, title }: SEOProps) {
  const siteMetadata = getSiteMetadata()

  const metaDescription = description || siteMetadata.description
  const metaTitle = siteMetadata.title || ''
  const metaAuthor = siteMetadata.author || ''

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={metaTitle ? `%s | ${metaTitle}` : undefined}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: metaAuthor,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta)}
    >
      {/* <script
        data-ad-client={process.env.GATSBY_GOOGLE_AD_CLIENT}
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      /> */}
</Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO

import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'
import Navbar from '../navbar'

const GlobalStyle = createGlobalStyle`
body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: ${props => props.bg || '#fff'}
  * {
    box-sizing: border-box;
    &::-webkit-scrollbar { width: 0 !important };
    overflow: -moz-scrollbars-none;
    -ms-overflow-style: none;
  }
}
`

const Layout = ({
  children,
  pageTitle,
  pageDesription,
  keywords,
  banner,
  bg,
  color,
  disableNavbarHide,
  isArticle,
  articleData,
}) => (
  <StaticQuery
    query={query}
    render={({ site }) => {
      return (
        <>
          <GlobalStyle bg={bg} />
          <Helmet>
            <html lang="en" />
            <title>{pageTitle || site.config.siteTitle}</title>
            <meta name="description" content={pageDesription || site.config.siteDescription} />
            {keywords && <meta name="keywords" content={keywords} />}
            <meta name="theme-color" content="#766dff" />
            <meta name="twitter:card" content={banner ? 'summary_large_image' : 'summary'} />
            <meta name="twitter:creator" content={site.config.twitter} />
            <meta name="twitter:title" content={pageTitle || site.config.siteTitle} />
            <meta name="twitter:description" content={pageDesription || site.config.siteDescription} />
            {banner && <meta name="twitter:image" content={banner} />}
            {banner && <meta name="twitter:image:width" content="700" />}
            {banner && <meta name="twitter:image:height" content="340" />}
            {isArticle && <meta name="twitter:label1" value="Reading Time" />}
            {isArticle && <meta name="twitter:data1" value={articleData.readTime} />}
            {isArticle && <meta name="article:published_time" content={articleData.date} />}
          </Helmet>
          <Navbar disableNavbarHide={disableNavbarHide} bg={bg} color={color} />
          {children}
        </>
      )
    }}
  />
)

const query = graphql`
  query SEO {
    site {
      buildTime(formatString: "YYYY-MM-DD")
      config: siteMetadata {
        siteTitle
        siteTitleAlt
        siteDescription
        siteShortName
        siteUrl
        siteLogo
        siteLogoSmall
        twitter
      }
    }
  }
`

export default Layout

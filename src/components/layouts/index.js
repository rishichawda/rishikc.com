import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'
import { createGlobalStyle } from 'styled-components'
import Helmet from 'react-helmet'

import Footer from 'elements/Footer'
import Navbar from 'components/navbar'

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
    text-rendering: optimizelegibility;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }
}
`

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
  withFooter,
}) => (
  <>
    <GlobalStyle bg={bg} />
    <StaticQuery
      query={query}
      render={({ site }) => (
        <Helmet>
          <html lang="en" />
          <title>{pageTitle || site.config.siteTitle}</title>
          <meta name="description" content={pageDesription || site.config.siteDescription} />
          {keywords && <meta name="keywords" content={keywords} />}
          <meta name="theme-color" content="#766dff" />
          <meta name="twitter:card" content={banner ? 'summary_large_image' : 'summary'} />
          <meta name="twitter:creator" content={site.config.twitter} />
          <meta name="twitter:title" content={pageTitle || site.config.siteTitle} />
          <meta
            name="twitter:description"
            content={pageDesription || site.config.siteDescription}
          />
          {banner && <meta name="twitter:image" content={banner} />}
          {banner && <meta name="twitter:image:width" content="700" />}
          {banner && <meta name="twitter:image:height" content="340" />}
          {isArticle && <meta name="twitter:label1" value="Reading Time" />}
          {isArticle && <meta name="twitter:data1" value={articleData.readTime} />}
          {isArticle && <meta name="article:published_time" content={articleData.date} />}
          {isArticle && (
            <link
              key="gist-embeded-b3b573358bfc66d89e1e95dbf8319c09"
              rel="stylesheet"
              href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
            />
          )}
          <script
            data-ad-client={process.env.GATSBY_GOOGLE_AD_CLIENT}
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          />
        </Helmet>
      )}
    />
    <Navbar disableNavbarHide={disableNavbarHide} bg={bg} color={color} />
    {children}
    {withFooter ? <Footer /> : null}
  </>
)

Layout.propTypes = {
  children: PropTypes.node,
  pageTitle: PropTypes.string,
  pageDesription: PropTypes.string,
  keywords: PropTypes.string,
  banner: PropTypes.number,
  bg: PropTypes.string,
  color: PropTypes.string,
  disableNavbarHide: PropTypes.bool,
  isArticle: PropTypes.bool,
  articleData: PropTypes.oneOfType([PropTypes.object]),
  withFooter: PropTypes.bool,
}

Layout.defaultProps = {
  children: null,
  pageTitle: '',
  pageDesription: '',
  keywords: '',
  banner: undefined,
  bg: undefined,
  color: undefined,
  disableNavbarHide: false,
  isArticle: false,
  articleData: {},
  withFooter: false,
}

export default Layout

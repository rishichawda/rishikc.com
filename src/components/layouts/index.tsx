import React, { ReactNode, Props } from "react";
import { StaticQuery, graphql } from "gatsby";
import Helmet from "react-helmet";

import Footer from "../components/Footer";
import Navbar from "../navbar";
import Spinner from "react-spinkit";

// const GlobalStyle = createGlobalStyle`
// body {
//   margin: 0;
//   font-family: 'Roboto', sans-serif;
//   background-color: ${props => props.bg || '#fff'}
//   * {
//     box-sizing: border-box;
//     &::-webkit-scrollbar { width: 0 !important };
//     overflow: -moz-scrollbars-none;
//     -ms-overflow-style: none;
//     text-rendering: optimizelegibility;
//     -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
//   }
// }
// `

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
`;

interface SiteMetaDataProps extends Props<ReactNode> {
  site: {
    config: {
      siteTitle: string;
      siteDescription: string;
      twitter: string;
    };
  };
  metaData: {
    pageTitle: string;
    pageDescription: string;
    keywords: string;
    banner: string;
    isArticle: boolean;
    articleData: {
      readTime: HTMLMetaElement;
      date: string;
    };
  };
}

const SiteMetaData = (props: SiteMetaDataProps) => {
  const {
    site,
    metaData: {
      pageTitle,
      pageDescription,
      keywords,
      banner,
      isArticle,
      articleData
    }
  } = props;
  return (
    <Helmet>
      <html lang="en" />
      <title>{pageTitle || site.config.siteTitle}</title>
      <meta
        name="description"
        content={pageDescription || site.config.siteDescription}
      />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="theme-color" content="#766dff" />
      <meta
        name="twitter:card"
        content={banner ? "summary_large_image" : "summary"}
      />
      <meta name="twitter:creator" content={site.config.twitter} />
      <meta name="twitter:title" content={pageTitle || site.config.siteTitle} />
      <meta
        name="twitter:description"
        content={pageDescription || site.config.siteDescription}
      />
      {banner && <meta name="twitter:image" content={banner} />}
      {banner && <meta name="twitter:image:width" content="700" />}
      {banner && <meta name="twitter:image:height" content="340" />}
      {isArticle && <meta name="twitter:label1" value="Reading Time" />}
      {isArticle && <meta name="twitter:data1" value={articleData.readTime} />}
      {isArticle && (
        <meta name="article:published_time" content={articleData.date} />
      )}
      {isArticle && (
        <link
          key="gist-embeded-b3b573358bfc66d89e1e95dbf8319c09"
          rel="stylesheet"
          href="https://github.githubassets.com/assets/gist-embed-b3b573358bfc66d89e1e95dbf8319c09.css"
        />
      )}
      <script
        data-ad-client={process.env.GATSBY_GOOGLE_AD_CLIENT}
        async={true}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <body className="font-body" />
    </Helmet>
  );
};

interface LayoutProps extends Props<ReactNode> {
  children: ReactNode;
  pageTitle: string;
  pageDescription: string;
  keywords: string;
  banner: string;
  bg: string;
  color: string;
  disableNavbarHide: boolean;
  isArticle: boolean;
  articleData: {
    readTime: HTMLMetaElement;
    date: string;
  };
  withFooter: boolean;
}

const Layout = (props: LayoutProps) => {
  const {
    children,
    pageTitle,
    pageDescription,
    keywords,
    banner,
    bg,
    color,
    disableNavbarHide,
    isArticle,
    articleData,
    withFooter
  } = props;
  const [isDOMLoaded, setDOMLoadedState] = React.useState(false);

  React.useEffect(() => {
    window.onload = () => {
      if (isDOMLoaded) return;
      if (document.readyState === "complete") {
        setTimeout(() => {
          setDOMLoadedState(true);
        }, 2000);
      }
    };
    if (document.readyState === "complete") {
      setDOMLoadedState(true);
    }
  }, [isDOMLoaded]);

  if (!isDOMLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner name="ball-clip-rotate-multiple" />
      </div>
    );
  }

  const metaData = {
    pageTitle,
    pageDescription,
    keywords,
    banner,
    isArticle,
    articleData
  };

  return (
    <div className="h-screen overflow-hidden">
      {/* <GlobalStyle bg={bg} /> */}
      <StaticQuery
        query={query}
        render={({ site }) => <SiteMetaData site={site} metaData={metaData} />}
      />
      <Navbar disableNavbarHide={disableNavbarHide} bg={bg} color={color} />
      {children}
      {withFooter ? <Footer /> : null}
    </div>
  );
};

export default Layout;
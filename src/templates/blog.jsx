import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import './blog.scss';

export default ({ meta_desc, meta_keywords, meta_title, children, bannerImage }) => (
  <>
    <Helmet>
      <html lang="en"></html>
      <title>{meta_title}</title>
      <meta name="description" content={meta_desc} />
      <meta name="keywords" content={meta_keywords} />
    </Helmet>
    <div role="container" className="article-template">
      <div className="article-banner">
        <img src={bannerImage} alt="article-banner" />
      </div>
      <div className="article-content">
        {children || 'Article content.'}
      </div>
    </div>
  </>
);

import React from 'react'
import Helmet from 'react-helmet'
import './blog.scss';
import { IoIosReturnRight } from 'react-icons/io'
import { Link } from 'gatsby';

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
      <div className="back-link">
        <Link to="/">
          <IoIosReturnRight style={{ marginRight: 10 }} />
          <p>{'Back to Home'}</p>
        </Link>
        <Link to="/articles">
          <IoIosReturnRight style={{ marginRight: 10 }}/>
          <p>{'Back to All articles'}</p>
        </Link>
      </div>
    </div>
  </>
);

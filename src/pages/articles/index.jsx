import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import './index.scss';

export default () => (
  <>
  <Helmet>
      <html lang="en"></html>
      <title>Rishi Kumar Chawda | Developer | Freelancer | Web and Native Mobile Apps development</title>
      <meta name="description" content="Bangalore, (also, Bengaluru) India based developer. Experienced with web apps, progressive web apps, native apps for Android and iOS. Loves working on freelancing and open source projects." />
      <meta name="keywords" content="web, progressive, apps, pwa, native, mobile, android, ios, freelance, freelancing, developer, design, development, freelancer, open, source, projects, blog, bangalore, bengaluru, india" />
    </Helmet>
  <div className="blog-main container">
    <Link to='/blogs/blog-1'>Go to blog 1</Link>
  </div>
  </>
);

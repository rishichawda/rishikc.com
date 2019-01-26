import React from 'react'
import Helmet from 'react-helmet'
import Hero from '../components/hero-section'
import About from '../components/about'
import Projects from '../components/projects'
import Blogs from '../components/blogs'

import './index.scss';

const App = () => (
  <>
    <Helmet>
      <html lang="en"></html>
      <title>{'Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development'}</title>
      <meta name="description" content="Bangalore, (also, Bengaluru) India based developer. Experienced with web apps, progressive web apps, native apps for Android and iOS. Loves working on freelancing and open source projects." />
      <meta name="keywords" content="web, progressive, apps, pwa, native, mobile, android, ios, freelance, freelancing, developer, design, development, freelancer, open, source, projects, blog, bangalore, bengaluru, india" />
    </Helmet>
    <Hero />
    <About />
    <Blogs />
    <Projects />
  </>
);

export default App

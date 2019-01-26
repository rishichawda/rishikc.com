import React from 'react'
import { Link } from 'gatsby'

import Hero from '../components/hero-section'
import About from '../components/about'
import Projects from '../components/projects';
import Blogs from '../components/blogs';

import './index.scss';

const App = () => (
  <>
    <Hero />
    <About />
    <Blogs />
    <Projects />
  </>
);

export default App

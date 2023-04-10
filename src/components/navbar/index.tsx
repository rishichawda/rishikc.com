import './index.scss';

import { Link } from 'gatsby';
import React from 'react';

import { useSiteMetadata } from '../../hooks/use-site-metadata';
import ThemeToggle from '../themetoggle';

const Navbar = () => {
  const siteMetadata = useSiteMetadata()
  return (
    <nav className="dark:text-gray-200 navigation-bar" aria-label={siteMetadata.title!}>
      <Link to="/" className="brand">
        <span>{siteMetadata.title}</span>
      </Link>
      <ul role="menubar">
        <li role="menuitem">
          <Link to="/articles">Articles</Link> 
        </li>
        <li role="menuitem">
          <ThemeToggle />
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

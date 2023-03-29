import { Link } from "gatsby";
import React from "react";
import { useSiteMetadata } from "../../hooks/use-site-metadata";
import "./index.scss"

const Navbar = () => {
  const siteMetadata = useSiteMetadata()
  return (
    <nav className="navigation-bar" aria-label={siteMetadata.title!}>
      <Link to="/" className="brand">
        <span>{siteMetadata.title}</span>
      </Link>
      <ul role="menubar">
        <li role="menuitem">
          <Link to="/articles">Articles</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar

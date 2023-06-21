import "./index.scss";

import { Link } from "gatsby";
import React from "react";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Logo from "../logo";
import ScrollProgress from "./scrollProgress";
import ThemeToggle from "../themeToggle";
import NavbarMenu from "./navbarMenu";

type NavbarProps = {
  showScrollProgress?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ showScrollProgress }) => {
  const siteMetadata = useSiteMetadata();
  return (
    <nav className="navbar" aria-label={siteMetadata.title!}>
      <div>
        <Link
          aria-label="Click on this website logo image to navigate to the home page."
          to="/"
          className="brand"
        >
          <Logo />
        </Link>
        <div className="navbar-menu">
          <ul role="menubar">
            <li aria-label="Theme toggle button" role="menuitem">
              <ThemeToggle />
            </li>
          </ul>
          <NavbarMenu />
        </div>
      </div>
      {showScrollProgress ? <ScrollProgress /> : null}
    </nav>
  );
};

Navbar.defaultProps = {
  showScrollProgress: false,
};

export default Navbar;

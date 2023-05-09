import "./index.scss";

import { Link } from "gatsby";
import React from "react";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Logo from "../logo";
import ThemeToggle from "../themeToggle";
import ScrollProgress from "./scrollProgress";

type NavbarProps = {
  showScrollProgress?: boolean;
};

const Navbar: React.FC<NavbarProps> = ({ showScrollProgress }) => {
  const siteMetadata = useSiteMetadata();
  return (
    <nav
      className="flex flex-col sticky top-0 items-center justify-center bg-gray-50 dark:bg-slate-800 dark:text-gray-200 navigation-bar z-10"
      aria-label={siteMetadata.title!}
    >
      <div className="flex flex-row items-center justify-between">
        <Link
          aria-label="Click on this website logo image to navigate to the home page."
          to="/"
          className="brand"
        >
          <Logo />
        </Link>
        <ul role="menubar">
          <li aria-label="Theme toggle button" role="menuitem">
            <ThemeToggle />
          </li>
        </ul>
      </div>
      {showScrollProgress ? <ScrollProgress /> : null}
    </nav>
  );
};

Navbar.defaultProps = {
  showScrollProgress: false,
};

export default Navbar;

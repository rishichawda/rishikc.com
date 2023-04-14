import "./index.scss";

import { Link } from "gatsby";
import React from "react";

import { useSiteMetadata } from "../../hooks/use-site-metadata";
import Logo from "../logo";
import ThemeToggle from "../themetoggle";

const Navbar = () => {
  const siteMetadata = useSiteMetadata();
  return (
    <nav
      className="flex flex-row items-center justify-center dark:text-gray-200 navigation-bar"
      aria-label={siteMetadata.title!}
    >
      <div className="flex flex-row items-center justify-between">
        <Link to="/" className="brand">
          <Logo />
        </Link>
        <ul role="menubar">
          <li role="menuitem">
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

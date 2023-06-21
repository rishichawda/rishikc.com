import { motion } from "framer-motion";
import { Link } from "gatsby";
import React from "react";

type Props = {};

const NavbarMenu = (props: Props) => {
  const [showVerticalNavItems, setVerticalNavItemsVisibility] =
    React.useState(false);

  const setNavbarView = () => {
    setVerticalNavItemsVisibility(!showVerticalNavItems);
  };

  const classNames = `nav-menu-container${
    showVerticalNavItems ? " vertical" : ""
  }`;

  return (
    <>
      <div>
        <svg
          className="m-button"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          onClick={setNavbarView}
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <motion.nav layout="size" className={classNames}>
        <Link to="/#about">About</Link>
        <Link to="/articles">Blog</Link>
        <Link to="/#repositories">Projects</Link>
        <Link to="/contact">Contact</Link>
      </motion.nav>
    </>
  );
};

export default NavbarMenu;

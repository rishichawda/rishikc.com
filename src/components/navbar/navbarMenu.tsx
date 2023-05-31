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

  const classNames = `md:hidden nav-menu-container flex bg-gray-50 dark:bg-slate-800 dark:text-gray-200 vertical flex-col absolute w-full z-10${
    showVerticalNavItems ? "" : " h-0 overflow-hidden"
  }`;

  return (
    <>
      <div>
        <svg
          className="md:hidden w-6 h-6 hover:cursor-pointer"
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
        <Link
          to="/#about"
          className="text-base leading-6 transition-all flex items-center p-2 rounded-lg text-slate-600 hover:text-gray-50 dark:text-gray-200 hover:cursor-pointer hover:bg-brand-500 dark:hover:bg-brand-800 focus:bg-brand-500 dark:focus:bg-brand-800 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        >
          About
        </Link>
        <Link
          to="/articles"
          className="text-base leading-6 transition-all flex items-center p-2 rounded-lg text-slate-600 hover:text-gray-50 dark:text-gray-200 hover:cursor-pointer hover:bg-brand-500 dark:hover:bg-brand-800 focus:bg-brand-500 dark:focus:bg-brand-800 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        >
          Blog
        </Link>
        <Link
          to="/#repositories"
          className="text-base leading-6 transition-all flex items-center p-2 rounded-lg text-slate-600 hover:text-gray-50 dark:text-gray-200 hover:cursor-pointer hover:bg-brand-500 dark:hover:bg-brand-800 focus:bg-brand-500 dark:focus:bg-brand-800 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        >
          Projects
        </Link>
        <Link
          to="/contact"
          className="text-base leading-6 transition-all flex items-center p-2 rounded-lg text-slate-600 hover:text-gray-50 dark:text-gray-200 hover:cursor-pointer hover:bg-brand-500 dark:hover:bg-brand-800 focus:bg-brand-500 dark:focus:bg-brand-800 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        >
          Contact
        </Link>
      </motion.nav>
      <motion.nav
        layout="size"
        className="hidden md:flex nav-menu-container bg-gray-50 dark:bg-slate-800 dark:text-gray-200 flex-row w-full z-10"
      >
        <div className="px-5 py-2 hover:cursor-pointer">
          <Link
            to="/#about"
            className="text-base leading-6 hover:text-brand-800 transition-all"
          >
            About
          </Link>
        </div>
        <div className="px-5 py-2 hover:cursor-pointer">
          <Link
            to="/articles"
            className="text-base leading-6 hover:text-brand-800 transition-all"
          >
            Blog
          </Link>
        </div>
        <div className="px-5 py-2 hover:cursor-pointer">
          <Link
            to="/#repositories"
            className="text-base leading-6 hover:text-brand-800 transition-all"
          >
            Projects
          </Link>
        </div>
        <div className="px-5 py-2 hover:cursor-pointer">
          <Link
            to="/contact"
            className="text-base leading-6 hover:text-brand-800 transition-all"
          >
            Contact
          </Link>
        </div>
      </motion.nav>
    </>
  );
};

export default NavbarMenu;

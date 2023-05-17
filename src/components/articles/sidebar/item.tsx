import { Link } from "gatsby";
import React from "react";

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const SideBarItem = (props: Props) => {
  const classNames = `flex-1 ml-3 ${
    props.to.startsWith("/articles/") ? "not-italic" : " not-italic"
  }`;
  return (
    <li aria-label={props.label} role="listitem">
      <Link
        aria-label="all articles"
        role="listitem"
        className="flex items-center p-2 rounded-lg text-slate-600 hover:text-gray-50 dark:text-gray-200 hover:bg-brand-500 dark:hover:bg-brand-800 focus:bg-brand-500 dark:focus:bg-brand-800 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        to={props.to}
      >
        {props.icon}
        <dfn title={props.label} className={classNames}>
          {props.label}
        </dfn>
      </Link>
    </li>
  );
};

export default SideBarItem;

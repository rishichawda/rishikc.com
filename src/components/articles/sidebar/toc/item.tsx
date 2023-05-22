import { Link } from "gatsby";
import React from "react";

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const TOCItem = (props: Props) => {
  return (
    <li aria-label={props.label} role="listitem">
      <Link
        role="listitem"
        className="flex items-center rounded-lg text-slate-600 hover:text-brand-700 dark:text-gray-200 hover:dark:text-brand-700 focus:text-gray-50 dark:focus:text-gray-200 outline-none"
        to={props.to}
      >
        {props.icon}
        <dfn title={props.label} className="flex-1 not-italic">
          {props.label}
        </dfn>
      </Link>
    </li>
  );
};

export default TOCItem;

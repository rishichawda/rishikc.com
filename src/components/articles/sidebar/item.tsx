import { Link } from "gatsby";
import React from "react";

type Props = {
  to: string;
  label: string;
  icon?: React.ReactNode;
};

const SideBarItem = (props: Props) => {
  return (
    <li aria-label={props.label} role="listitem">
      <Link role="listitem" to={props.to}>
        {props.icon}
        <dfn title={props.label}>{props.label}</dfn>
      </Link>
    </li>
  );
};

export default SideBarItem;

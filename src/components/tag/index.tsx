import "./index.scss";

import React, { MouseEventHandler } from "react";

const Tag: React.FC<TagProps> = ({
  children,
  focusable,
  onClick,
  showCloseButton,
}) => {
  return (
    <button
      tabIndex={!focusable ? -1 : undefined}
      className="focus:outline-1 focus:outline-brand-300 focus:outline-dashed overflow-hidden tag-pill"
      aria-label={children?.toString()}
      onClick={onClick}
    >
      {children}&nbsp;&nbsp;
      {showCloseButton ? <strong>x</strong> : null}
    </button>
  );
};

type TagProps = {
  children: React.ReactNode | string;
  onClick?: MouseEventHandler;
  showCloseButton?: boolean;
  focusable?: boolean;
};

Tag.defaultProps = {
  children: "tag-pill",
  showCloseButton: false,
  focusable: true,
};

export default Tag;

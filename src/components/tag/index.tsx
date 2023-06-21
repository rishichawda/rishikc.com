import "./index.scss";

import React, { MouseEventHandler } from "react";

const Tag: React.FC<TagProps> = ({
  children,
  focusable,
  onClick,
  showCloseButton,
}) => {
  const classNames = `p-category tag-pill${focusable ? "" : " nof"}`;
  return (
    <button
      tabIndex={!focusable ? -1 : undefined}
      className={classNames}
      aria-label={children?.toString()}
      onClick={onClick}
    >
      {children}
      {showCloseButton ? (
        <>
          &nbsp;&nbsp;<strong>x</strong>
        </>
      ) : null}
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

import './index.scss';

import React, { MouseEventHandler, ReactNode } from 'react';

const Tag: React.FC<TagProps> = ({ children, ...rest }) => {
  return (
    <small className="tag-pill" {...rest}>
      {children}
    </small>
  )
}

type TagProps = {
  children: ReactNode;
  onClick?: MouseEventHandler;
}

Tag.defaultProps = {
  children: "tag-pill"
}

export default Tag
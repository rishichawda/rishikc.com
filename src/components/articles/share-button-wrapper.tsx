import React from "react";

type Props = {
  children: React.ReactNode;
  shareRef: React.RefObject<HTMLButtonElement>;
};

const ShareButtonWrapper = (props: Props) => {
  return (
    <div
      onClick={() => {
        props.shareRef?.current?.click();
      }}
      tabIndex={0}
      className="share-button"
    >
      {props.children}
    </div>
  );
};

export default ShareButtonWrapper;

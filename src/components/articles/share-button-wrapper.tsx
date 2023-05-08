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
      className="inline-flex items-center text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg shadow-sm hover:bg-gray-100 hover:text-brand-800 dark:bg-gray-800 dark:text-gray-400 dark:border-slate-700 dark:border dark:hover:text-white dark:hover:bg-gray-700 focus:bg-gray-200 dark:focus:bg-gray-700 focus:text-brand-800 dark:focus:text-white article-header-info-share-button"
    >
      {props.children}
    </div>
  );
};

export default ShareButtonWrapper;

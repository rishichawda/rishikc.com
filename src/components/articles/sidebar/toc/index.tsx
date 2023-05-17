import "./index.scss";

import React from "react";

import TOCItem from "./item";

const TableOfContents: React.FC<Props> = (props: Props) => {
  const listItems = props.data as TOCItem[];
  if (!listItems.length) {
    return null;
  }
  return (
    <div className="border-t border-gray-200 dark:border-gray-700 py-4">
      <nav className="flex flex-col w-full rounded-lg overflow-hidden table-of-contents dark:bg-slate-700 bg-slate-100">
        <h2>Table of Contents</h2>
        <ul className="pt-1 font-medium list-disc">
          {listItems.map((item) => {
            return <TOCItem to={item.url} label={item.title} />;
          })}
        </ul>
      </nav>
    </div>
  );
};

type Props = {
  data?: Queries.Maybe<Record<string, unknown>> | unknown;
};

type TOCItem = {
  url: string;
  title: string;
};

TableOfContents.defaultProps = {
  data: [],
};

export default TableOfContents;

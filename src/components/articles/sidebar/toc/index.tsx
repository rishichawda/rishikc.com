import "./index.scss";

import React from "react";

import TOCItem from "./item";

const TableOfContents: React.FC<Props> = (props: Props) => {
  const listItems = props.data as TOCItem[];
  if (!listItems.length) {
    return null;
  }
  return (
    <div className="table-of-contents">
      <nav>
        <h2>Table of Contents</h2>
        <ul>
          {listItems.map((item) => {
            return (
              <TOCItem key={item.title} to={item.url} label={item.title} />
            );
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

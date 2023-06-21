import "./index.scss";

import { Link } from "gatsby";
import React from "react";

import FavoriteIcon from "../../icons/favorite";
import HomeIcon from "../../icons/home";
import ListIcon from "../../icons/list";
import SendIcon from "../../icons/send";
import ArticleSuggestionCard from "./card";
import SideBarItem from "./item";
import TableOfContents from "./toc";

type Props = {
  edge: Queries.MdxEdge;
  tableData: Queries.Maybe<Record<string, unknown>> | [];
};

const SideBar = (props: Props) => {
  return (
    <aside className="sidebar">
      <ul role="list">
        <SideBarItem to="/" label="Home" icon={<HomeIcon />} />
        <SideBarItem to="/articles" label="All Articles" icon={<ListIcon />} />
        <SideBarItem
          to="/reads"
          label="Favorite reads"
          icon={<FavoriteIcon />}
        />
        <SideBarItem to="/contact" label="Contact" icon={<SendIcon />} />
      </ul>
      {props.tableData?.length ? (
        <TableOfContents data={props.tableData} />
      ) : null}
      <ul className="suggestion-list">
        <li>continue reading</li>
        {props.edge?.previous ? (
          <ArticleSuggestionCard data={props.edge.previous} />
        ) : null}
        {props.edge?.next ? (
          <ArticleSuggestionCard data={props.edge.next} />
        ) : null}
      </ul>
    </aside>
  );
};

export default SideBar;

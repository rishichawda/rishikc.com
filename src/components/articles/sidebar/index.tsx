import { Link } from "gatsby";
import React from "react";

import "./index.scss";
import SideBarItem from "./item";
import HomeIcon from "../../icons/home";
import ListIcon from "../../icons/list";
import FavoriteIcon from "../../icons/favorite";
import ArticleIcon from "../../icons/article";
import SendIcon from "../../icons/send";
import TableOfContents from "./toc";

type Props = {
  edge: Queries.MdxEdge;
  tableData: Queries.Maybe<Record<string, unknown>> | [];
};

const SideBar = (props: Props) => {
  return (
    <aside className="flex flex-col sticky top-28 w-56 rounded-lg overflow-hidden sidebar">
      <ul role="list" className="space-y-2 font-medium">
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
      <ul className="pt-1 font-medium border-t border-gray-200 dark:border-gray-700">
        <li className="font-medium uppercase text-sm px-2 py-2 rounded-sm dark:bg-slate-800 bg-slate-100 mb-4">
          continue reading
        </li>
        {props.edge?.previous ? (
          <SideBarItem
            to={props.edge.previous.fields?.slug!}
            label={props.edge.previous.frontmatter?.title!}
            icon={<ArticleIcon />}
          />
        ) : null}
        {props.edge?.next ? (
          <SideBarItem
            to={props.edge.next.fields?.slug!}
            label={props.edge.next.frontmatter?.title!}
            icon={<ArticleIcon />}
          />
        ) : null}
      </ul>
    </aside>
  );
};

export default SideBar;

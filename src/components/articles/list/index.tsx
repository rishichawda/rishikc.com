import "./index.scss";

import { m, LazyMotion, domAnimation } from "framer-motion";
import { Link } from "gatsby";
import React from "react";

import Tag from "../../tag";

type ArticlesListProps = {
  items: any[];
  onTagClick: (event: React.MouseEvent, tag: string) => void;
};

const variantA = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {},
};

const variantB = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const ArticlesList = (props: ArticlesListProps) => {
  return (
    <LazyMotion features={domAnimation}>
      <m.ul
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variantA}
        className="article-list"
        role="list"
      >
        {props.items.length ? (
          props.items.map(({ node }: { node: Queries.Mdx }) => (
            <m.li
              variants={variantB}
              layout
              className="block focus-within:bg-gray-300 dark:focus-within:bg-slate-900 article-list-item"
              role="listitem"
              key={node.id}
            >
              <Link className="focus:outline-none" to={node.fields?.slug!}>
                <div className="flex flex-col items-start md:justify-between md:items-center md:flex-row article-list-item-header">
                  <div className="article-list-item-header-content">
                    <h2 className="article-list-item-header-content-title">
                      {node.frontmatter?.title}
                    </h2>
                    <span className="article-list-item-header-content-tags">
                      {node.frontmatter?.tags?.map((tag) => (
                        <Tag
                          key={tag}
                          focusable={false}
                          onClick={(e) => {
                            props.onTagClick(e, tag!);
                          }}
                        >
                          {tag}
                        </Tag>
                      ))}
                    </span>
                  </div>
                  <span className="dark:bg-slate-600 whitespace-nowrap article-list-item-header-info">
                    <span>{node.frontmatter?.date}</span>
                    &nbsp;&nbsp;
                    <strong>·</strong>
                    &nbsp;&nbsp;
                    <span>{node.fields?.timeToRead?.text}</span>
                  </span>
                </div>
                <p className="article-list-item-details">{node.excerpt}</p>
              </Link>
            </m.li>
          ))
        ) : (
          <p>Uh-oh! No results for the search.</p>
        )}
      </m.ul>
    </LazyMotion>
  );
};

export default ArticlesList;
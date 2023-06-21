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
        className="h-feed article-list"
        role="list"
      >
        {props.items.length ? (
          props.items.map(({ node }: { node: Queries.Mdx }) => (
            <m.li
              variants={variantB}
              layout
              className="h-entry"
              role="listitem"
              key={node.id}
            >
              <Link className="u-url" to={node.fields?.slug!}>
                <div className="h-entry-header">
                  <div>
                    <h2 className="p-name">{node.frontmatter?.title}</h2>
                    <span className="tags">
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
                  <span className="h-entry-header-info">
                    <span className="dt-published">
                      {node.frontmatter?.date}
                    </span>
                    &nbsp;&nbsp;
                    <strong>·</strong>
                    &nbsp;&nbsp;
                    <span>{node.fields?.timeToRead?.text}</span>
                  </span>
                </div>
                <p className="p-summary">{node.excerpt}</p>
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

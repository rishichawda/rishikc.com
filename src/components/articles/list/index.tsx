import './index.scss';

import { AnimatePresence, motion } from 'framer-motion';
import { Link } from 'gatsby';
import React from 'react';

import Tag from '../../tag';

type ArticlesListProps = {
  items: any[];
  onTagClick: (event: React.MouseEvent, tag: string) => void;
}

const variantA = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    }
  },
  exit: {}
};

const variantB = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0
  }
};

const ArticlesList = (props: ArticlesListProps) => {
  return (
    <AnimatePresence>
      <motion.ul
        initial="initial"
        animate="animate"
        exit="exit"
        variants={variantA}
        className="article-list"
        role="list">
        {
          props.items.length ?
            props.items.map(({ node }: { node: Queries.Mdx }) => (
              <motion.li variants={variantB} layout className="article-list-item" role="listitem" key={node.id}>
                <Link to={node.fields?.slug!}>
                  <div className="flex flex-col items-start md:justify-between md:items-center md:flex-row article-list-item-header">
                    <div className="article-list-item-header-content">
                      <h2 className="article-list-item-header-content-title">{node.frontmatter?.title}</h2>
                      <span className="article-list-item-header-content-tags">
                        {node.frontmatter?.tags?.map((tag) => <Tag onClick={(e) => { props.onTagClick(e, tag!) }}>{tag}</Tag>)}
                      </span>
                    </div>
                    <span className="whitespace-nowrap article-list-item-header-info">
                      <span>{node.frontmatter?.date}</span>
                      &nbsp;&nbsp;
                      <strong>·</strong>
                      &nbsp;&nbsp;
                      <span>{node.fields?.timeToRead?.text}</span>
                    </span>
                  </div>
                  <p className="article-list-item-details">{node.excerpt}</p>
                </Link>
              </motion.li>
            )) : <p>Uh-oh! No results for the search.</p>
        }
      </motion.ul>
    </AnimatePresence>
  )
}

export default ArticlesList
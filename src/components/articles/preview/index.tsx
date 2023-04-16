import "./index.scss";

import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import ArticlePreviewCard from "./card";

const ArticlePreview = () => {
  const data = useStaticQuery(graphql`
    query ArticlePreviewData {
      allMdx: allMdx(limit: 2, sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields {
            slug
            timeToRead {
              text
            }
          }
          id
          excerpt(pruneLength: 140)
          frontmatter {
            subtitle
            date(formatString: "Do MMMM, YYYY")
            title
          }
        }
      }
    }
  `);
  return (
    <div className="flex flex-col mx-auto justify-between mb-28 article-preview">
      <h2 className="antialiased article-preview-header">
        Some of my writings&nbsp;.&nbsp;.
      </h2>
      <div className="mx-auto py-4">
        <ul className="grid grid-cols-1 md:grid-cols-2 grid-flow-row gap-4 article-preview-list">
          {data.allMdx.nodes.map((node: Queries.Mdx) => (
            <ArticlePreviewCard key={data.id} data={node} />
          ))}
        </ul>
      </div>
      <Link
        to="articles"
        className="text-brand-600 hover:text-brand-800 antialiased self-center all-articles-link"
      >
        Browse the complete list
      </Link>
    </div>
  );
};

export default ArticlePreview;

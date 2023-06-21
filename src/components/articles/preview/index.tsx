import "./index.scss";

import { graphql, Link, useStaticQuery } from "gatsby";
import React from "react";

import ArticlePreviewCard from "./card";

const ArticlePreview = () => {
  const data = useStaticQuery(graphql`
    query ArticlePreviewData {
      allMdx: allMdx(limit: 3, sort: { frontmatter: { date: DESC } }) {
        nodes {
          fields {
            slug
            timeToRead {
              text
            }
          }
          id
          excerpt(pruneLength: 340)
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
    <div className="h-feed article-preview">
      <h2 className="p-name">Some of my writings&nbsp;.&nbsp;.</h2>
      <div className="mx-auto py-4">
        <ul>
          {data.allMdx.nodes.map((node: Queries.Mdx) => (
            <ArticlePreviewCard key={node.id} data={node} />
          ))}
        </ul>
      </div>
      <Link to="articles" className="p-url">
        Browse the complete list
      </Link>
    </div>
  );
};

export default ArticlePreview;

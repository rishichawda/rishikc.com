import "prismjs/themes/prism-tomorrow.css";
import "../stylesheets/mdx.scss";

import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import Tag from "../components/tag";

const Article: React.FC<ArticleProps> = (props) => {
  return (
    <Layout>
      <div className="root-container">
        <main className="article-content-page-container">
          <Link
            className="text-brand-600 hover:text-brand-800 back-navigation-link"
            to="/articles"
          >
            &#171;&nbsp;go back to main list
          </Link>
          <div className="flex flex-col items-center sm:items-start article-header">
            <h1 className="text-center sm:text-left article-header-title">
              {props.data.mdx.frontmatter?.title}
            </h1>
            <h2 className="text-center sm:text-left article-header-subtitle">
              {props.data.mdx.frontmatter?.subtitle}
            </h2>
            <span className="flex flex-wrap items-center justify-center article-header-tags">
              {props.data.mdx.frontmatter?.tags?.map((tag) => (
                <span>
                  <Tag>{tag}</Tag>
                </span>
              ))}
            </span>
            <span className="article-header-time">
              <span>{props.data.mdx.frontmatter?.date}</span>
              &nbsp;&nbsp;
              <strong>·</strong>
              &nbsp;&nbsp;
              <span>{props.data.mdx.fields?.timeToRead?.text}</span>
            </span>
          </div>
          <section className="flex flex-col" itemProp="articleBody">
            {props.children}
          </section>
        </main>
      </div>
    </Layout>
  );
};

type ArticleProps = {
  children: React.ReactNode;
  data: {
    mdx: Queries.Mdx;
  };
};

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      fields {
        timeToRead {
          text
        }
      }
      frontmatter {
        title
        subtitle
        hero_image
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`;

export default Article;

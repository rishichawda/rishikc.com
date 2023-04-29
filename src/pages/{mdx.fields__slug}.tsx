import "prismjs/themes/prism-tomorrow.css";
import "../stylesheets/mdx.scss";

import { graphql, Link } from "gatsby";
import * as React from "react";

import Layout from "../components/layout";
import Tag from "../components/tag";
import { motion, useScroll } from "framer-motion";
import useHeroImage from "../hooks/use-hero-image";
import SEO from "../components/seo";
import { GatsbyImage } from "gatsby-plugin-image";

const Article: React.FC<ArticleProps> = (props) => {
  const { scrollYProgress } = useScroll();
  const image = props.data.mdx.frontmatter?.hero_image
    ? useHeroImage(props.data.mdx.frontmatter?.hero_image)
    : null;

  return (
    <Layout>
      <div className="root-container">
        <main className="article-content-page-container">
          <Link
            className="text-brand-700 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-700 focus:outline-dotted focus:outline-2 focus:outline-brand-700 back-navigation-link"
            to="/articles"
          >
            &#171;&nbsp;go back to main list
          </Link>
          <div className="flex flex-col items-center sm:items-start article-header">
            <GatsbyImage
              className="article-header-hero-image w-full h-auto"
              alt={props.data.mdx.frontmatter?.hero_image_alt!}
              image={image?.gatsbyImageData!}
            />
            <h1 className="text-center sm:text-left article-header-title">
              {props.data.mdx.frontmatter?.title}
            </h1>
            <h2 className="text-center sm:text-left article-header-subtitle">
              {props.data.mdx.frontmatter?.subtitle}
            </h2>
            <span className="flex flex-wrap items-center justify-center article-header-tags">
              {props.data.mdx.frontmatter?.tags?.map((tag) => (
                <span>
                  <Tag focusable={false}>{tag}</Tag>
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
          <motion.div
            className="progress-bar"
            style={{ scaleX: scrollYProgress }}
          />
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
        description
        hero_image
        keywords
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`;

export const Head: React.FC<ArticleProps> = ({ data }) => {
  console.log({ data });
  return (
    <SEO
      title={data.mdx.frontmatter?.title!}
      description={data.mdx.frontmatter?.description!}
      keywords={data.mdx.frontmatter?.keywords!}
    />
  );
};

export default Article;

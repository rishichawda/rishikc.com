import "prismjs/themes/prism-tomorrow.css";
import "../stylesheets/mdx.scss";

import { motion, useScroll } from "framer-motion";
import { graphql, Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Tag from "../components/tag";

const Article: React.FC<ArticleProps> = (props) => {
  const { scrollYProgress } = useScroll();

  const hasHeroImageCredits =
    props.data.mdx.frontmatter?.hero_image_credit_text ||
    props.data.mdx.frontmatter?.hero_image_credit_link;

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
            <figure>
              <GatsbyImage
                className="article-header-hero-image w-full h-auto"
                alt={props.data.mdx.frontmatter?.hero_image_alt!}
                image={
                  props.data.mdx.frontmatter?.hero_image?.childImageSharp
                    ?.gatsbyImageData!
                }
              />
              {hasHeroImageCredits ? (
                <figcaption>
                  Image credits:&nbsp;
                  {props.data.mdx.frontmatter?.hero_image_credit_text}
                  {props.data.mdx.frontmatter?.hero_image_credit_link ? (
                    <>
                      &nbsp;
                      <OutboundLink
                        href={
                          props.data.mdx.frontmatter?.hero_image_credit_link
                        }
                        target="_blank"
                        rel="nofollow noopener noreferrer"
                      >
                        {props.data.mdx.frontmatter?.hero_image_credit_link}
                      </OutboundLink>
                    </>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
            <h1 className="text-center sm:text-left article-header-title">
              {props.data.mdx.frontmatter?.title}
            </h1>
            <h2 className="text-center sm:text-left article-header-subtitle">
              {props.data.mdx.frontmatter?.subtitle}
            </h2>
            <span className="flex flex-wrap items-center justify-center article-header-tags">
              {props.data.mdx.frontmatter?.tags?.map((tag) => (
                <span>
                  <Tag key={tag} focusable={false}>
                    {tag}
                  </Tag>
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
        hero_image {
          childImageSharp {
            gatsbyImageData
          }
          publicURL
        }
        hero_image_credit_text
        hero_image_credit_link
        keywords
        date(formatString: "MMMM D, YYYY")
        tags
      }
    }
  }
`;

export const Head: React.FC<ArticleProps> = ({ data }) => {
  return (
    <SEO
      title={data.mdx.frontmatter?.title!}
      description={data.mdx.frontmatter?.description!}
      keywords={data.mdx.frontmatter?.keywords!}
      image={data.mdx.frontmatter?.hero_image?.publicURL!}
      // NOTE: Include this in mdx metadata?
      // value reference: https://schema.org/CreativeWork
      type="BlogPosting"
    />
  );
};

export default Article;

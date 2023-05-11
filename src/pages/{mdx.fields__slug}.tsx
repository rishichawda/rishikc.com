import "prismjs/themes/prism-tomorrow.css";
import "../stylesheets/mdx.scss";

import { motion, useScroll } from "framer-motion";
import { graphql, Link } from "gatsby";
import { OutboundLink } from "gatsby-plugin-google-gtag";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";
import { useLocation } from "@reach/router";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Tag from "../components/tag";
import LinkedinIcon from "../components/icons/linkedin";
import FacebookIcon from "../components/icons/facebook";
import TwitterIcon from "../components/icons/twitter";
import ClockIcon from "../components/icons/clock";
import ShareButtonWrapper from "../components/articles/share-button-wrapper";
import SideBar from "../components/articles/sidebar";
import { getPreviousAndNext } from "../hooks/use-article-list";

const ArticlePage: React.FC<ArticlePageProps> = (props) => {
  const location = useLocation();
  const fb_share = React.useRef<HTMLButtonElement>(null);
  const linkedin_share = React.useRef<HTMLButtonElement>(null);
  const twitter_share = React.useRef<HTMLButtonElement>(null);

  const edge = getPreviousAndNext(props.path);
  const hasHeroImageCredits =
    props.data.mdx.frontmatter?.hero_image_credit_text ||
    props.data.mdx.frontmatter?.hero_image_credit_link;

  return (
    <Layout showScrollProgress={true}>
      <main className="root-container flex flex-row article-page">
        <SideBar edge={edge!} />
        <article className="article-content-page-container">
          <div className="flex flex-col items-center sm:items-start article-header">
            <figure>
              <GatsbyImage
                className="article-header-hero-image w-full h-auto rounded-md dark:brightness-50"
                alt={
                  props.data.mdx.frontmatter?.hero_image_alt ||
                  `banner_for_${props.data.mdx.fields?.slug}`
                }
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
                <span key={tag}>
                  <Tag focusable={false}>{tag}</Tag>
                </span>
              ))}
            </span>
            <div className="inline-flex item-center justify-between w-full text-gray-500 dark:text-gray-400 article-header-info">
              <div className="inline-flex items-center article-header-info-time">
                <ClockIcon />
                <span>{props.data.mdx.frontmatter?.date}</span>
                &nbsp;&nbsp;
                <strong>·</strong>
                &nbsp;&nbsp;
                <span>{props.data.mdx.fields?.timeToRead?.text}</span>
              </div>
              <div className="inline-flex flex-row items-center article-header-info-share">
                <ShareButtonWrapper shareRef={fb_share}>
                  <FacebookShareButton
                    url={location.href}
                    title={props.data.mdx.frontmatter?.title!}
                    quote={props.data.mdx.frontmatter?.description!}
                    ref={fb_share}
                    tabIndex={-1}
                  >
                    <FacebookIcon />
                  </FacebookShareButton>
                  <p className="invisible w-0 sm:visible sm:w-fit">Share</p>
                </ShareButtonWrapper>
                <ShareButtonWrapper shareRef={linkedin_share}>
                  <LinkedinShareButton
                    url={location.href}
                    title={props.data.mdx.frontmatter?.title!}
                    summary={props.data.mdx.frontmatter?.description!}
                    ref={linkedin_share}
                    tabIndex={-1}
                  >
                    <LinkedinIcon />
                  </LinkedinShareButton>
                  <p className="invisible w-0 sm:visible sm:w-fit">Post</p>
                </ShareButtonWrapper>
                <ShareButtonWrapper shareRef={twitter_share}>
                  <TwitterShareButton
                    url={location.href}
                    title={props.data.mdx.frontmatter?.title!}
                    ref={twitter_share}
                    tabIndex={-1}
                  >
                    <TwitterIcon />
                  </TwitterShareButton>
                  <p className="invisible w-0 sm:visible sm:w-fit">Tweet</p>
                </ShareButtonWrapper>
              </div>
            </div>
          </div>
          <section className="flex flex-col" itemProp="articleBody">
            {props.children}
          </section>
        </article>
      </main>
    </Layout>
  );
};

type ArticlePageProps = {
  children: React.ReactNode;
  data: {
    mdx: Queries.Mdx;
  };
  path: string;
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

export const Head: React.FC<ArticlePageProps> = ({ data }) => {
  return (
    <SEO
      title={`${data.mdx.frontmatter?.title!} | Rishi's blog`}
      description={data.mdx.frontmatter?.description!}
      keywords={data.mdx.frontmatter?.keywords!}
      image={data.mdx.frontmatter?.hero_image?.publicURL!}
      // NOTE: Include this in mdx metadata?
      // value reference: https://schema.org/CreativeWork
      type="BlogPosting"
    />
  );
};

export default ArticlePage;

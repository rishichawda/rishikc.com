import "prismjs/themes/prism-tomorrow.css";
import "../stylesheets/mdx.scss";

import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import * as React from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

import { useLocation } from "@reach/router";

import ShareButtonWrapper from "../components/articles/share-button-wrapper";
import SideBar from "../components/articles/sidebar";
import ClockIcon from "../components/icons/clock";
import FacebookIcon from "../components/icons/facebook";
import LinkedinIcon from "../components/icons/linkedin";
import TwitterIcon from "../components/icons/twitter";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Tag from "../components/tag";
import { getPreviousAndNext } from "../hooks/use-article-list";
import { useSiteMetadata } from "../hooks/use-site-metadata";
import CommentSection from "../components/articles/disqus";

const formatOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
};

const ArticlePage: React.FC<ArticlePageProps> = (props) => {
  const location = useLocation();

  const siteMeta = useSiteMetadata();
  const fb_share = React.useRef<HTMLButtonElement>(null);
  const linkedin_share = React.useRef<HTMLButtonElement>(null);
  const twitter_share = React.useRef<HTMLButtonElement>(null);

  const edge = getPreviousAndNext(props.path);
  const hasHeroImageCredits =
    props.data.mdx.frontmatter?.hero_image_credit_text ||
    props.data.mdx.frontmatter?.hero_image_credit_link;
  const publishDate = new Date(
    props.data.mdx.frontmatter?.date!
  ).toLocaleString("en-US", formatOptions);

  const shouldFollow =
    props.data.mdx.frontmatter?.hero_image_credit_link &&
    props.data.mdx.frontmatter?.hero_image_credit_link!.includes(
      siteMeta.siteUrl!
    );

  const creditImageProps = {
    target: shouldFollow ? undefined : "_blank",
    rel: shouldFollow ? undefined : "nofollow noopener noreferrer",
  };

  return (
    <Layout showScrollProgress={true}>
      <main className="root-container article-page">
        <SideBar
          tableData={props.data.mdx.tableOfContents?.items as []}
          edge={edge!}
        />
        <article className="h-entry">
          <div className="flex flex-col items-center sm:items-start article-header">
            <figure>
              <GatsbyImage
                className="u-photo"
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
                      <a
                        href={
                          props.data.mdx.frontmatter?.hero_image_credit_link
                        }
                        {...creditImageProps}
                      >
                        {props.data.mdx.frontmatter?.hero_image_credit_link}
                      </a>
                    </>
                  ) : null}
                </figcaption>
              ) : null}
            </figure>
            <h1 className="p-name">{props.data.mdx.frontmatter?.title}</h1>
            <h2 className="subtitle">{props.data.mdx.frontmatter?.subtitle}</h2>
            <span className="tags">
              {props.data.mdx.frontmatter?.tags?.map((tag) => (
                <span key={tag}>
                  <Tag focusable={false}>{tag}</Tag>
                </span>
              ))}
            </span>
            <div className="info">
              <div className="time">
                <ClockIcon />
                <span className="dt-published">{publishDate}</span>
                &nbsp;&nbsp;
                <strong>·</strong>
                &nbsp;&nbsp;
                <span>{props.data.mdx.fields?.timeToRead?.text}</span>
              </div>
              <div className="share">
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
          <section className="e-content" itemProp="articleBody">
            {props.children}
          </section>
        </article>
      </main>
      <CommentSection
        config={{
          url: location.href,
          identifier: props.path,
          title: `${props.data.mdx.frontmatter?.title || ""}${
            props.data.mdx.frontmatter?.subtitle
              ? ` - ${props.data.mdx.frontmatter?.subtitle}`
              : ""
          }`,
        }}
      />
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
      parent {
        ... on File {
          modifiedTime
        }
      }
      tableOfContents
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
        date(formatString: "YYYY-MM-DDTHH:mm:ss.SSS\\Z")
        tags
      }
    }
  }
`;

export const Head: React.FC<ArticlePageProps> = ({ data, ...rest }) => {
  return (
    <SEO
      title={`${data.mdx.frontmatter?.title!} | Rishi's blog`}
      description={data.mdx.frontmatter?.description!}
      keywords={data.mdx.frontmatter?.keywords!}
      image={data.mdx.frontmatter?.hero_image?.publicURL!}
      articleData={data.mdx}
      // NOTE: Include this in mdx metadata?
      // value reference: https://schema.org/CreativeWork
      type="NewsArticle"
    />
  );
};

export default ArticlePage;

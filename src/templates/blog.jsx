import React from "react";
import "./blog.scss";
import { IoIosReturnRight } from "react-icons/io";
import { Link, graphql } from "gatsby";
import Disqus from "disqus-react";
import Layout from "../components/layout";

export default class BlogTemplate extends React.Component {
  render() {
    const { pageContext } = this.props;
    let { previous, next } = pageContext;
    const disqusShortname = process.env.DISQUS_NAME;
    const disqusConfig = {
      url: this.props.location.href,
      identifier: this.props.data.markdownRemark.id,
      title: this.props.data.markdownRemark.frontmatter.title
    };
    const posts = this.props.data.allMarkdownRemark.edges;
    previous = previous || posts[0].node;
    next = next || posts[posts.length - 1].node;
    const otherArticles = [previous, next];
    return (
      <Layout
        pageTitle={`${disqusConfig.title}${
          this.props.data.markdownRemark.frontmatter.subtitle
            ? ` - ${this.props.data.markdownRemark.frontmatter.subtitle}`
            : ""
        }`}
        pageDesription={this.props.data.markdownRemark.frontmatter.description}
        keywords={this.props.data.markdownRemark.frontmatter.keywords}
      >
        <div role="container" className="article-template">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{
              __html: this.props.data.markdownRemark.html
            }}
          />
          <div className="post-links container">
            Other articles :
            <Link
              to={
                otherArticles[0].fields
                  ? `articles/${otherArticles[0].fields.slug}`
                  : otherArticles[0].frontmatter.path
              }
              rel="prev"
            >
              <li>{otherArticles[0].frontmatter.title}</li>
            </Link>
            <Link
              to={
                otherArticles[1].fields
                  ? `articles/${otherArticles[1].fields.slug}`
                  : otherArticles[1].frontmatter.path
              }
              rel="next"
            >
              <li>{otherArticles[1].frontmatter.title}</li>
            </Link>
          </div>
          <Disqus.DiscussionEmbed
            shortname={disqusShortname}
            config={disqusConfig}
          />
          <div className="back-link">
            <Link to="/">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              {"Back to Home"}
            </Link>
            <Link to="/articles">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              {"Back to All articles"}
            </Link>
          </div>
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
        subtitle
        keywords
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`;

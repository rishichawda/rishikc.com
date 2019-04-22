import React from "react";
import { Link } from "gatsby";
import Helmet from "react-helmet";
import "./index.scss";
import { fadeInOnView } from "../../utils";
import { graphql } from "gatsby";
import Layout from "../../components/layout";
// import { IoIosReturnRight } from 'react-icons/io'

const pageMeta = {
  title:
    "Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India",
  desc:
    "Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects."
};

export default class Articles extends React.Component {
  componentDidMount() {
    fadeInOnView.init("zoom-in-element");
  }

  componentWillUnMount() {
    fadeInOnView.unload();
  }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    return (
      <Layout pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
        <div className="blog-main container">
          <div className="blog-main-header">
            <h2>Blogs by Rishi Kumar Chawda</h2>
          </div>
          {posts.map(({ node: { id, excerpt, frontmatter } }) => (
            <Link to={frontmatter.path} key={id}>
              <article className="hidden">
                <h4>{frontmatter.title}</h4>
                <p>
                  {
                    frontmatter.brief || excerpt.split(
                      `${frontmatter.title}${
                        frontmatter.subtitle ? ` ${frontmatter.subtitle}` : ""
                      }`
                    )[1]
                  }
                </p>
                <small>{frontmatter.date}</small>
              </article>
            </Link>
          ))}
        </div>
      </Layout>
    );
  }
}

export const pageQuery = graphql`
  query articlesList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 430)
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            brief
          }
        }
      }
    }
  }
`;

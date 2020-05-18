import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "components/layouts";
import Header from "elements/Header";

const Fade = require("react-reveal/Fade");

const pageMeta = {
  title: "Blogs | Rishi Kumar Chawda - Web and Mobile Applications Developer",
  desc: "Blogs written by Rishi Kumar Chawda.",
};

function Articles({ data }) {
  const { edges: posts } = data.allMarkdownRemark;
  return (
    <Layout
      withFooter={true}
      pageTitle={pageMeta.title}
      pageDescription={pageMeta.desc}
    >
      <Header title="Blogs" />
      <main className="container max-w-screen-lg flex flex-col mx-auto p-6 pt-16 overflow-scroll">
        {posts.map(
          ({
            node: {
              id,
              excerpt,
              frontmatter,
              fields: { readtime },
            },
          }) => (
            <Fade bottom>
              <div className="mb-12">
                <Link to={frontmatter.path} key={id}>
                  <h1 className="text-3xl font-normal text-gray-700">
                    {frontmatter.title}
                  </h1>
                </Link>
                <p className="text-lg text-gray-400 leading-relaxed">
                  {frontmatter.brief || excerpt}
                </p>
                <small className="float-right mt-6 text-gray-500">
                  {frontmatter.date}
                  &nbsp;&nbsp;
                  {" · "}
                  &nbsp;&nbsp;
                  {readtime}
                </small>
              </div>
            </Fade>
          )
        )}
      </main>
    </Layout>
  );
}

export const pageQuery = graphql`
  query articlesList {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 340)
          frontmatter {
            path
            date(formatString: "MMMM DD, YYYY")
            title
            subtitle
            brief
            banner
          }
          fields {
            readtime
          }
        }
      }
    }
  }
`;

Articles.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default Articles;

import React from 'react'
import Helmet from 'react-helmet'
import './blog.scss';
import { IoIosReturnRight } from 'react-icons/io'
import { Link, graphql } from 'gatsby';
import Disqus from 'disqus-react';
import Layout from '../components/layout';

export default class BlogTemplate extends React.Component {
  render() {
    const { meta_desc, meta_keywords, meta_title, pageContext } = this.props;
    const { previous, next } = pageContext;
    const disqusShortname = process.env.DISQUS_NAME;
    const disqusConfig = {
      url: this.props.location.href,
      identifier: this.props.data.markdownRemark.id,
      title: this.props.data.markdownRemark.frontmatter.title,
    };
    return (
      <Layout>
        <Helmet>
          <html lang="en"></html>
          <title>{meta_title}</title>
          <meta name="description" content={meta_desc} />
          <meta name="keywords" content={meta_keywords} />
        </Helmet>
        <div role="container" className="article-template">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }}>
          </div>
          <div className="post-links container">
            Other articles :
            {previous && (
              <Link to={`articles/${previous.fields.slug}`} rel="prev">
                <li>{previous.frontmatter.title}</li>
              </Link>
            )}
            {next && (
              <Link to={`articles/${next.fields.slug}`} rel="next">
                <li>{next.frontmatter.title}</li>
              </Link>
            )}
          </div>
          <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
          <div className="back-link">
            <Link to="/">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              {'Back to Home'}
            </Link>
            <Link to="/articles">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              {'Back to All articles'}
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
      }
    }
  }
`;
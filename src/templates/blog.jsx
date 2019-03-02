import React from 'react'
import Helmet from 'react-helmet'
import './blog.scss';
import { IoIosReturnRight } from 'react-icons/io'
import { Link, graphql } from 'gatsby';

export default class BlogTemplate extends React.Component {
  render() {
    const { meta_desc, meta_keywords, meta_title, children, bannerImage } = this.props;
    console.log(this.props)
    return (
      <>
        <Helmet>
          <html lang="en"></html>
          <title>{meta_title}</title>
          <meta name="description" content={meta_desc} />
          <meta name="keywords" content={meta_keywords} />
        </Helmet>
        <div role="container" className="article-template">
          <div className="article-content" dangerouslySetInnerHTML={{ __html: this.props.data.markdownRemark.html }}>
          </div>
          <div className="back-link">
            <Link to="/">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              <p>{'Back to Home'}</p>
            </Link>
            <Link to="/articles">
              <IoIosReturnRight style={{ marginRight: 10 }} />
              <p>{'Back to All articles'}</p>
            </Link>
          </div>
        </div>
      </>
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
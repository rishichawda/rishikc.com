import React from 'react'
import { Link } from 'gatsby'
// import { FaArrowRight } from 'react-icons/fa'
import './index.scss';

export default class BlogSection extends React.Component {
  render() {
    const { posts } = this.props;
    return (
      <section className="container blog-section">
        <h2>blogs</h2>
        <p>You can view all of my blog posts <Link to="/articles">here</Link>.</p>
        <div className="inner-container">
          {
            posts.slice(0, 2).map(({ node: { id, frontmatter } }) => (
              <Link to={frontmatter.path} key={id}>
            <article className="card">
              <div className="blog-title">
                <h4>{frontmatter.title}</h4>
              </div>
              <div className="blog-description">
                <p>
                  {frontmatter.description}
                </p>
              </div>
            </article>
          </Link>
            ))
          }
        </div>
          {/* <Link to="/articles">
          <p>View all</p>
            <article className="card link-all" style={{ flexDirection: 'row' }}>
              <span style={{ fontSize: 20 }}>View All</span>
              <FaArrowRight style={{ marginLeft: 20, fontSize: 20 }} />
            </article>
          </Link> */}
      </section>
    );
  }
}

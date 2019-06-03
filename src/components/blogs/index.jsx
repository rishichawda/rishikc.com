import React from 'react'
import { Link } from 'gatsby'
// import { FaArrowRight } from 'react-icons/fa'
import './index.scss'

export default class BlogSection extends React.Component {
  render() {
    const { posts } = this.props
    return (
      <section className="container blog-section hidden">
        <h2>blogs</h2>
        <p>
          Take a look at all of my{' '}
          <Link aria-label="Link to blog posts by Rishi Chawda" to="/articles">
            articles
          </Link>
          .
        </p>
        <div className="inner-container">
          {posts.slice(0, 2).map(({ node: { id, excerpt, frontmatter } }) => (
            <Link to={frontmatter.path} key={id} aria-label={`Blog link to ${frontmatter.title}`}>
              <article className="card hidden">
                <div className="blog-title">
                  <h3>{frontmatter.title}</h3>
                </div>
                <div className="blog-description">
                  <p>
                    {frontmatter.brief ||
                      excerpt.split(
                        `${frontmatter.title}${frontmatter.subtitle ? `${frontmatter.subtitle}` : ''}`
                      )[1] ||
                      excerpt.split(`${frontmatter.title}${frontmatter.subtitle ? ` ${frontmatter.subtitle}` : ''}`)[1]}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
        {/* <Link to="/articles">
          <p>View all</p>
            <article className="card link-all" style={{ flexDirection: 'row' }}>
              <span style={{ fontSize: 20 }}>View All</span>
              <FaArrowRight style={{ marginLeft: 20, fontSize: 20 }} />
            </article>
          </Link> */}
      </section>
    )
  }
}

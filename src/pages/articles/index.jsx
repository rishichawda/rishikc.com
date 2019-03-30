import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import './index.scss';
import { IoIosReturnRight } from 'react-icons/io'

export default class Articles extends React.Component {
  render () {
    const { edges: posts } = this.props.data.allMarkdownRemark;
    return (
      <>
        <Helmet>
          <html lang="en"></html>
          <title>{'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India'}</title>
          <meta name="description" content="Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects." />
          <meta name="keywords" content="web development, web developer bangalore, web development services, native app development, websites, progressive web apps, app developer, developer in bangalore, bengaluru area india, freelancing projects, freelance development, freelancing services, mobile apps development, android development, ios app development" />
        </Helmet>
        <div className="blog-main container">
          <div className="blog-main-header">
            <h2>Blogs by Rishi Kumar Chawda</h2>
          </div>
          {
            posts.map(({ node: { id, excerpt, frontmatter } }) => (
              <Link to={frontmatter.path} key={id}>
                <article>
                  <h4>{frontmatter.title}</h4>
                  <p>{excerpt.split(`${frontmatter.title}${frontmatter.subtitle ? ` ${frontmatter.subtitle}` : ''}`)[1]}</p>
                  <small>{frontmatter.date}</small>
                </article>
              </Link>
            ))
          }
        </div>
      </>
    );
  }
}

export const pageQuery = graphql`
  query {
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
          }
        }
      }
    }
  }
`
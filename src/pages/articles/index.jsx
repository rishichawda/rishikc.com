import React from 'react'
import { Link, graphql } from 'gatsby'
import Helmet from 'react-helmet'
import './index.scss'
import { fadeInOnView } from '../../utils'

import Layout from '../../components/layouts'
import Header from '../../components/components/Header'
// import { IoIosReturnRight } from 'react-icons/io'
import { colors } from '../../../tailwind'

const pageMeta = {
  title:
    'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India',
  desc:
    'Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects.',
}

export default class Articles extends React.Component {
  // componentDidMount() {
  //   fadeInOnView.init('zoom-in-element')
  // }

  // componentWillUnmount() {
  //   fadeInOnView.unload()
  // }

  render() {
    const { edges: posts } = this.props.data.allMarkdownRemark
    return (
      <Layout bg={colors.bg} pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
        <Header big title="Blogs">
          Some of my articles..
        </Header>
        <div className="blog-main">
          <div className="blog-main-header">{/* <h2>Blogs by Rishi Kumar Chawda</h2> */}</div>
          <div className="blog-main container">
            {posts.map(({ node: { id, excerpt, frontmatter } }) => (
              <article>
                <Link to={frontmatter.path} key={id}>
                  <h4>{frontmatter.title}</h4>
                </Link>
                <p>
                  {frontmatter.brief ||
                    excerpt.split(`${frontmatter.title}${frontmatter.subtitle ? `${frontmatter.subtitle}` : ''}`)[1] ||
                    excerpt.split(`${frontmatter.title}${frontmatter.subtitle ? ` ${frontmatter.subtitle}` : ''}`)[1]}
                </p>
                <small>{frontmatter.date}</small>
              </article>
            ))}
          </div>
        </div>
      </Layout>
    )
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
`

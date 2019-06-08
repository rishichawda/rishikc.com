import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import './index.scss'
import tw from 'tailwind.macro'
import Layout from 'components/layouts'
import Header from 'components/components/Header'
import { colors } from '../../../tailwind'

const ArticleImageContainer = styled.article`
  ${tw`rounded overflow-hidden shadow-lg`}
`

const ArticleItemContainer = styled.article`
  ${tw`flex flex-row sm:flex-col lg:flex-row`}
`

const pageMeta = {
  title:
    'Blogs | Rishi Kumar Chawda - Developer, Freelancer | Web and Native Mobile Apps development | Freelance development services | Design and development | Bangalore, India',
  desc:
    'Bangalore, India based developer. Experienced with web development, progressive web apps, native apps for Android and iOS. Loves working on freelancing web and mobile app development. Interested in open source projects.',
}

export default function Articles({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  console.log({ data })
  return (
    <Layout bg={colors.bg} pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
      <Header title="Blogs" />
      <div className="blog-main">
        <div className="blog-main-header">{/* <h2>Blogs by Rishi Kumar Chawda</h2> */}</div>
        <div className="blog-main container">
          {posts.map(({ node: { id, excerpt, frontmatter } }) => (
            <ArticleItemContainer>
              <div className="article">
                <Link to={frontmatter.path} key={id}>
                  <h4>{frontmatter.title}</h4>
                </Link>
                <p>{frontmatter.brief || excerpt}</p>
                <small>{frontmatter.date}</small>
              </div>
            </ArticleItemContainer>
          ))}
        </div>
      </div>
    </Layout>
  )
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
        }
      }
    }
  }
`

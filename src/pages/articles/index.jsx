import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import tw from 'tailwind.macro'

import Layout from 'components/layouts'
import Header from 'components/components/Header'

import { colors } from '../../../tailwind'
import './index.scss'

const ArticleItemContainer = styled.article`
  ${tw`flex flex-row sm:flex-col lg:flex-row`}
`

const pageMeta = {
  title: 'Blogs | Rishi Kumar Chawda - Web and Mobile Applications Developer',
  desc: 'Blogs written by Rishi Kumar Chawda.',
}

function Articles({ data }) {
  const { edges: posts } = data.allMarkdownRemark
  return (
    <Layout withFooter bg={colors.bg} pageTitle={pageMeta.title} pageDesription={pageMeta.desc}>
      <Header title="Blogs" />
      <div className="blog-main">
        <div role="main" className="blog-main container">
          {posts.map(({ node: { id, excerpt, frontmatter, fields: { readtime } } }) => (
            <ArticleItemContainer role="article">
              <div className="article">
                <Link to={frontmatter.path} key={id}>
                  <h1>{frontmatter.title}</h1>
                </Link>
                <p>{frontmatter.brief || excerpt}</p>
                <small>
                  {frontmatter.date}
                  &nbsp;&nbsp;
                  {' · '}
                  &nbsp;&nbsp;
                  {readtime}
                </small>
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
          fields {
            readtime
          }
        }
      }
    }
  }
`

Articles.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default Articles

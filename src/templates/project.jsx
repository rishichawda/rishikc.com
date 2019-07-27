import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/layouts'
import Header from 'elements/Header'
import './project.scss'
import { graphql } from 'gatsby'
import { colors } from '../../tailwind'

const Project = ({ data }) => {
  const { markdownRemark } = data
  const { frontmatter } = markdownRemark
  return (
    <Layout
      pageTitle={frontmatter.title}
      bg={colors.bg}
      pageDesription={frontmatter.description}
      keywords={frontmatter.keywords}
      withFooter
    >
      <div role="article" className="project-page-template">
        <Header small title={frontmatter.title} />
        <div
          className="project-details"
          dangerouslySetInnerHTML={{
            __html: markdownRemark.html,
          }}
        />
      </div>
    </Layout>
  )
}

Project.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.shape({
        title: PropTypes.string,
        description: PropTypes.string,
        keywords: PropTypes.string,
      }),
      html: PropTypes.string,
    }),
  }).isRequired,
}

export const pageQuery = graphql`
  query ProjectPageBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        keywords
      }
      fields {
        slug
      }
    }
  }
`

export default Project

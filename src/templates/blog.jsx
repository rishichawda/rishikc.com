import React from 'react'
import './blog.scss'
import { Link, graphql } from 'gatsby'
import Disqus from 'disqus-react'
import Layout from 'components/layouts'
import Header from 'elements/Header'
import { colors } from '../../tailwind'

export default function BlogTemplate({ pageContext, data, location }) {
  let { previous, next } = pageContext
  const disqusShortname = process.env.DISQUS_NAME
  const disqusConfig = {
    url: location.href,
    identifier: data.markdownRemark.id,
    title: data.markdownRemark.frontmatter.title,
  }
  const posts = data.allMarkdownRemark.edges
  previous = previous || posts[0].node
  next = next || posts[posts.length - 1].node
  const otherArticles = [previous, next]
  return (
    <Layout
      pageTitle={`${disqusConfig.title}${
        data.markdownRemark.frontmatter.subtitle ? ` - ${data.markdownRemark.frontmatter.subtitle}` : ''
      }`}
      bg={colors.bg}
      pageDesription={data.markdownRemark.frontmatter.description}
      keywords={data.markdownRemark.frontmatter.keywords}
    >
      <div role="article" className="article-template">
        <Header small title={data.markdownRemark.frontmatter.title}>
          {data.markdownRemark.frontmatter.subtitle || ''}
        </Header>
        <div
          className="article-content"
          dangerouslySetInnerHTML={{
            __html: `<small>
            ${data.markdownRemark.frontmatter.date}
            &nbsp;
             · 
            &nbsp;
            ${data.markdownRemark.fields.readtime}
          </small>${data.markdownRemark.html}`,
          }}
        />
        <div className="post-links container">
          <h4>Other articles :</h4>
          <Link
            to={
              otherArticles[0].fields ? `articles/${otherArticles[0].fields.slug}` : otherArticles[0].frontmatter.path
            }
            rel="prev"
          >
            <li>{otherArticles[0].frontmatter.title}</li>
          </Link>
          <Link
            to={
              otherArticles[1].fields ? `articles/${otherArticles[1].fields.slug}` : otherArticles[1].frontmatter.path
            }
            rel="next"
          >
            <li>{otherArticles[1].frontmatter.title}</li>
          </Link>
        </div>
        <Disqus.DiscussionEmbed shortname={disqusShortname} config={disqusConfig} />
        <div className="back-link">
          <Link to="/">Go to Homepage</Link>
          <hr />
          <Link to="/articles">View All articles</Link>
        </div>
      </div>
    </Layout>
  )
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
        subtitle
        keywords
      }
      fields {
        readtime
      }
    }
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            path
            title
          }
        }
      }
    }
  }
`

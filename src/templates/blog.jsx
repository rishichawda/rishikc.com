import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import Disqus from 'disqus-react'

import Layout from 'components/layouts'
import Header from 'elements/Header'

function BlogTemplate({ pageContext, data, location }) {
  let { previous, next } = pageContext
  const disqusShortname = process.env.GATSBY_DISQUS_NAME
  const disqusConfig = {
    url: location.href,
    identifier: data.markdownRemark.id,
    title: data.markdownRemark.frontmatter.title,
  }
  const posts = data.allMarkdownRemark.edges
  previous = previous || posts[0].node
  next = next || posts[posts.length - 1].node
  const otherArticles = [previous, next]
  const editUrl = `https://github.com/rishichawda/website/edit/react-site/src/content/blog${data.markdownRemark.fields.slug}index.md`
  const twitterShareUrl = `https://twitter.com/intent/tweet?text=${data.markdownRemark.frontmatter.title}&url=${location.href}&original_referer=${location.href}`
  return (
    <Layout
      pageTitle={`${disqusConfig.title}${
        data.markdownRemark.frontmatter.subtitle
          ? ` - ${data.markdownRemark.frontmatter.subtitle}`
          : ''
      }`}
      pageDesription={data.markdownRemark.frontmatter.description}
      keywords={data.markdownRemark.frontmatter.keywords}
      isArticle
      articleData={{
        readTime: data.markdownRemark.fields.readtime,
        date: data.markdownRemark.frontmatter.date,
      }}
      withFooter
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
        <div className="article-content container">
          <a className="edit-url" href={twitterShareUrl} target="_newtab">
            Share on Twitter
          </a>
          {' • '}
          <a className="edit-url" href={editUrl} target="_newtab">
            Edit post on GitHub
          </a>
        </div>
        <div className="post-links container">
          <h4>Other articles :</h4>
          <Link
            to={
              otherArticles[0].fields
                ? `/articles${otherArticles[0].fields.slug}`
                : otherArticles[0].frontmatter.path
            }
            rel="prev"
          >
            <span>{otherArticles[0].frontmatter.title}</span>
          </Link>
          <Link
            to={
              otherArticles[1].fields
                ? `/articles${otherArticles[1].fields.slug}`
                : otherArticles[1].frontmatter.path
            }
            rel="next"
          >
            <span>{otherArticles[1].frontmatter.title}</span>
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
        slug
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

BlogTemplate.propTypes = {
  pageContext: PropTypes.oneOfType([PropTypes.object]).isRequired,
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  location: PropTypes.oneOfType([PropTypes.object]).isRequired,
}

export default BlogTemplate

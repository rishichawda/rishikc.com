const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const { words } = require('./src/utils/words')

const WPM = 250

function getReadTime(text) {
  const minutes = words(text).length / WPM
  const displayed = Math.ceil(minutes.toFixed(2))
  return `${displayed} min read`
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog.jsx`)
  return graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                title
                banner
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allMarkdownRemark.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node
      createPage({
        path: `articles${post.node.fields.slug}`,
        component: blogPost,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: 'readtime',
      node,
      value: getReadTime(node.rawMarkdownBody),
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

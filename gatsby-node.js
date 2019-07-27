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

  const blogPostTemplate = path.resolve(`./src/templates/blog.jsx`)
  const projectPageTemplate = path.resolve(`./src/templates/project.jsx`)
  return graphql(
    `
      {
        blogs: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/blog/**/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
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
        projects: allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/content/projects/**/*.md" } }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
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
    const blogPosts = result.data.blogs.edges
    const projectPages = result.data.projects.edges

    blogPosts.forEach((post, index) => {
      const previous = index === blogPosts.length - 1 ? null : blogPosts[index + 1].node
      const next = index === 0 ? null : blogPosts[index - 1].node
      createPage({
        path: `articles${post.node.fields.slug}`,
        component: blogPostTemplate,
        context: {
          slug: post.node.fields.slug,
          previous,
          next,
        },
      })
    })
    projectPages.forEach((post, index) => {
      const previous = index === projectPages.length - 1 ? null : projectPages[index + 1].node
      const next = index === 0 ? null : projectPages[index - 1].node
      createPage({
        path: `project${post.node.fields.slug}`,
        component: projectPageTemplate,
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

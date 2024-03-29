const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const readingTime = require(`reading-time`)

// exports.onCreateWebpackConfig = ({
//   actions,
//   getConfig
// }) => {
//   let config = getConfig();

//   if (!config.optimization) { return; } // not writing this check throws an error; TypeError: Cannot set property 'splitChunks' of undefined

//   config.optimization.splitChunks.cacheGroups.motion = {
//     name: `framer-motion`,
//     chunks: `all`,
//     test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
//   }
//   config.optimization.splitChunks.cacheGroups.components = {
//     name: `components`,
//     chunks: `all`,
//     test: /[\\/]src[\\/](components)[\\/]/,
//   }
//   actions.replaceWebpackConfig(config);
// }

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const { createNodeField } = actions
  if (node.internal.type === 'InstagramNode') {
    createNodeField({
      node,
      name: 'visibility',
      value: !!(node.caption && node.localFile___NODE),
    })
  }
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      node,
      name: `timeToRead`,
      value: readingTime(node.body)
    })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.sourceNodes = ({
  getNodesByType,
  createNodeId,
  actions,
  createContentDigest
}) => {
  const allMdxNodes = getNodesByType(`Mdx`)
  const data: GlobalMetadata = { mdx: { tags: { all: [], top: [] } } }
  let allTags: { [key: string]: number } = {}
  allMdxNodes.forEach((node: any) => {
    node.frontmatter.tags.map((tag: string) => {
      if (allTags[tag]) {
        allTags[tag] += 1
      } else {
        allTags[tag] = 1
      }
    })
  })
  data.mdx.tags.all = Object.keys(allTags).map((key) => `${key} (${allTags[key]})`)
  data.mdx.tags.top = Object.keys(allTags).sort((a, b) => allTags[b] - allTags[a]).slice(0, 3)
  actions.createNode({
    id: createNodeId('GlobalMetadata'),
    parent: null,
    data: data,
    internal: {
      type: 'GlobalMetadata',
      contentDigest: createContentDigest(data)
    }
  })
}

type GlobalMetadata = {
  mdx: {
    tags: {
      all: string[]
      top: string[]
    }
  }
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
  query {
    allMdx(
      sort: { frontmatter: { date: DESC }}
    ) {
      edges {
        node {
          fields {
            slug
          }
        }
      }
    }
  }
`)

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  // Create blog-list pages
  const posts = result.data.allMdx.edges
  const postsPerPage = 5
  const numPages = Math.ceil(posts.length / postsPerPage)
  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/articles` : `/articles/${i + 1}`,
      component: path.resolve("./src/templates/articles-list.tsx"),
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
      },
    })
  })
};

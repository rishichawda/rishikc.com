/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/node-apis/
 */

const path = require('path')

// Enable absolute imports from `src`.
// See https://gatsbyjs.org/docs/add-custom-webpack-config#absolute-imports.
exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, "."), path.resolve(__dirname, "src"), "node_modules"],
    },
  })
}

// graphql gets scared with null value filters (see gatsby docs)
// so this is a nice workaround.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'InstaNode') {
    createNodeField({
      node,
      name: 'visibility',
      value: !!(node.caption && node.localFile___NODE),
    })
  }
}

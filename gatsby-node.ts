const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const readingTime = require(`reading-time`)

exports.onCreateNode = ({
  node,
  actions,
  getNode
}) => {
  const { createNodeField } = actions
  if (node.internal.type === 'InstaNode') {
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
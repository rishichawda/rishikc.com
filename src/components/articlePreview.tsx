import { graphql, useStaticQuery } from 'gatsby'
import GatsbyLink from 'gatsby-link'
import React from 'react'

const ArticlePreview = () => {
  const data = useStaticQuery(graphql`
  query ArticlePreviewData {
  allMdx: allMdx(limit: 2, sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      slug
      id
      excerpt(pruneLength: 340)
      frontmatter {
        subtitle
        date(formatString: "Do MMMM, YYYY")
        title
      }
    }
  }
}
  `)
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto px-4 mb-28 justify-between">
      <h2 className="italic antialiased">Some of my writings</h2>
      <div className="mx-auto py-4">
        <div className="flex flex-col justify-between">
          {
            data.allMdx.nodes.map(node => (
              <article className="my-2" key={node.id}>
                <div className="p-2 px-0 flex flex-col justify-between leading-normal">
                  <GatsbyLink to={`/${node.slug}`}>
                    <div className="mb-2">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                        <h2 className="text-brand dark:text-gray-300 font-semibold text-2xl mb-2 md:mb-0">{node.frontmatter.title}</h2>
                        <div className="flex items-center text-sm text-gray-400">
                          <p>{node.frontmatter.date}</p>
                        </div>
                      </div>
                      <p className="article-preview font-normal leading-7 tracking-wide text-gray-500 dark:text-gray-400">{node.excerpt}</p>
                    </div>
                  </GatsbyLink>
                </div>
              </article>
            ))
          }
        </div>
      </div>
      <GatsbyLink to="articles" className="text-brand dark:text-gray-400 text-xl italic antialiased">Browse the complete list</GatsbyLink>
    </div>
  )
}

export default ArticlePreview

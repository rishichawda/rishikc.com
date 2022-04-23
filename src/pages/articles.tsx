import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/layout'
import GatsbyLink from 'gatsby-link'

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <div className="bg-brand dark:bg-slate-900 flex flex-col justify-center items-center w-full height-55 mb-7">
        <h1 className="text-gray-50">Articles</h1>
      </div>
      <div className="flex flex-col max-w-7xl mx-auto mb-28 justify-between">
        {
          data.allMdx.nodes.map(node => (
            <article className="my-7" key={node.id}>
              <div className="p-4 flex flex-col justify-between leading-normal">
              <GatsbyLink to={`/${node.slug}`}>
                <div className="mb-2">
                    <h2 className="text-brand dark:text-gray-300 font-semibold mb-4 text-2xl">{node.frontmatter.title}</h2>
                  <p className="font-normal leading-7 tracking-wide text-gray-500">{node.excerpt}</p>
                </div>
                  </GatsbyLink>
                <div className="flex items-center text-sm text-gray-400 self-end">
                  <p>{node.frontmatter.date}</p>
                  &nbsp;&nbsp;
                  {" · "}
                  &nbsp;&nbsp;
                  <p className="text-sm flex items-center">
                    {`${node.timeToRead} mins`}
                  </p>
                </div>
              </div>
            </article>
          ))
        }
      </div>
    </Layout>
  )
}

export const query = graphql`
query ArticleList {
  allMdx(sort: {fields: frontmatter___date, order: DESC}) {
    nodes {
      slug
      id
      excerpt(pruneLength: 340)
      frontmatter {
        subtitle
        date(formatString: "Do MMMM, YYYY")
        hero_image
        title
      }
      timeToRead
    }
  }
}
`

export default BlogPage
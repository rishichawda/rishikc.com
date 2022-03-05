import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/layout'
import GatsbyLink from 'gatsby-link'

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <div className="bg-sky-400 dark:bg-slate-900 flex flex-col justify-center items-center w-full height-55 mb-7">
        <h1 className="text-gray-50">Articles</h1>        
      </div>
      <div className="flex flex-col max-w-7xl mx-auto mb-28 justify-between">
      {
        data.allMdx.nodes.map(node => (
          <article className="my-7" key={node.id}>
              <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" title="Woman holding a mug">
              </div>
              <div className="p-4 flex flex-col justify-between leading-normal">
                <div className="mb-2">
                <GatsbyLink to={`/${node.slug}`} className=" font-bold text-xl mb-2">
                  <h2>{node.frontmatter.title}</h2>
                </GatsbyLink>
                  <p>{node.excerpt}</p>
                </div>
                <p className="text-sm flex items-center">
                  <svg className="fill-current  w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                  </svg>
                  {`${node.timeToRead} mins`}
                </p>
                <div className="flex items-center text-sm">
                  <p>{node.frontmatter.date}</p>
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
      excerpt
      frontmatter {
        subtitle
        date
        hero_image
        title
      }
      timeToRead
    }
  }
}

`

export default BlogPage
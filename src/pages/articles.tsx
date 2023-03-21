import * as React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from 'components/layout'
import GatsbyLink from 'gatsby-link'

const BlogPage = ({ data }) => {
  return (
    <Layout>
      <div className="relative bg-brand dark:bg-slate-900 flex flex-col justify-center items-center w-full height-55 mb-7">
        <h1 className="text-gray-50">Articles</h1>
        <div className="hero-section-bottom">
          <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" className="fill-slate-50 dark:fill-gray-800"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" className="fill-slate-50 dark:fill-gray-800"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" className="fill-slate-50 dark:fill-gray-800"></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col max-w-screen-2xl mx-auto mb-28 justify-between">
        {
          data.allMdx.nodes.map(node => (
            <article className="article-list-item my-7" key={node.id}>
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
import Layout from 'components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import * as React from 'react'
import './mdx.scss'
import "prism-theme-night-owl";

const BlogPost = ({ data }) => {
  return (
    <Layout>
      <div className="bg-brand dark:bg-slate-900 flex flex-col justify-center items-center w-full height-55 mb-7">
        <h1 className="text-gray-50">{data.mdx.frontmatter.title}</h1>
      </div>
      <div className='article-content'>
        <div className="flex items-center">
          <p className='text-sm flex items-center'>
            {data.mdx.frontmatter.date}
            &nbsp;&nbsp;
            {" · "}
            &nbsp;&nbsp;
            {`${data.mdx.timeToRead} mins`}
          </p>
        </div>
          <MDXRenderer>
            {data.mdx.body}
          </MDXRenderer>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query ($id: String) {
    mdx(id: {eq: $id}) {
      frontmatter {
        title
        date(formatString: "MMMM D, YYYY")
      }
      body
      timeToRead
    }
  }
`

export default BlogPost
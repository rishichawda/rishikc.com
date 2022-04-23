import Layout from 'components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import { MDXProvider } from "@mdx-js/react"
import GatsbyLink from 'gatsby-link'
import * as React from 'react'
import './mdx.scss'
import "prism-theme-night-owl";

const BlogPost = ({ data }) => {
  return (
    <Layout>
      <div className="bg-brand dark:bg-slate-900 flex flex-col justify-center items-center w-full height-55 mb-7">
        <h1 className="text-gray-50">{data.mdx.frontmatter.title}</h1>
      </div>
      <div className='article-content flex flex-col max-w-7xl mx-auto mt-4 mb-28 justify-between'>
        <div className="flex justify-between">
        <GatsbyLink to="/articles" className="text-brand font-semibold">
            &#171;&nbsp;&nbsp;Back to article list
        </GatsbyLink>
        <small className="text-sm mb-10 text-gray-400">
          {data.mdx.frontmatter.date}
          &nbsp;&nbsp;
          {" · "}
          &nbsp;&nbsp;
          {`${data.mdx.timeToRead} mins`}
        </small>
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
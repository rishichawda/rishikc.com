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
      <div className="flex flex-col items-center">
        <div className="bg-brand dark:bg-slate-900 flex items-center justify-center px-4 w-full height-55 mb-7">
          <h1 className="text-gray-50 text-2xl text-center md:text-4xl">{data.mdx.frontmatter.title}</h1>
        </div>
        <div className='article-content flex flex-col max-w-full md:max-w-screen-2xl px-4 m-auto mt-4 mb-28'>
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
          <MDXRenderer className="flex w-full">
            {data.mdx.body}
          </MDXRenderer>
        </div>
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
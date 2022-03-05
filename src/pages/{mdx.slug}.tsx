import Layout from 'components/layout'
import { graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx'
import * as React from 'react'

const BlogPost = ({ data }) => {
    return (
        <Layout>
            <h1>{data.mdx.frontmatter.title}</h1>
            <p>{data.mdx.frontmatter.date}</p>
            <MDXRenderer>
                {data.mdx.body}
            </MDXRenderer>
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
    }
  }
`

export default BlogPost
import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Layout from '../components/layout'

const Article: React.FC<ArticleProps> = ({ children }) => {
  const data = useStaticQuery(graphql`
    query ($id: String) {
      mdx(id: {eq: $id}) {
        fields {
            timeToRead {
              text
            }
          }
        frontmatter {
          title
          subtitle
          hero_image
          date(formatString: "MMMM D, YYYY")
        }
      }
    }
  `)
  return (
    <Layout>
      <div className="root-container">
        <Link to="/articles">Back to list</Link>
        <main className="main-container">
          <h1>
            {data.mdx.frontmatter.title}
          </h1>
          <section itemProp="articleBody">{children}</section>
        </main>
      </div>
    </Layout>
  )
}

type ArticleProps = {
  children: React.ReactNode
}

export default Article

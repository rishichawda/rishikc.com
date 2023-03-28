import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'

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
    <div>
      <Link to="/articles">Back to list</Link>
      <h1>
        {data.mdx.frontmatter.title}
      </h1>
      <section itemProp="articleBody">{children}</section>
    </div>
  )
}

type ArticleProps = {
  children: React.ReactNode
}

export default Article

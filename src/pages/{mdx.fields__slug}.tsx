import { graphql, Link, useStaticQuery } from 'gatsby'
import * as React from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Layout from '../components/layout'
import "../stylesheets/mdx.scss"
import { useArticleData } from '../hooks/use-article-data'

const Article: React.FC<ArticleProps> = (props) => {
  // const data = useArticleData()

  console.log({ props })
  return (
    <Layout>
      <div className="root-container">
        <main className="main-container">
          <Link className="back-navigation-link" to="/articles">
            &#171;&nbsp;Go back to main list
          </Link>
          <div className="article-info">
            <h1 className="article-info-title">
              {props.data.mdx.frontmatter?.title}
            </h1>
            <h2 className="article-info-subtitle">{props.data.mdx.frontmatter?.subtitle}</h2>
            <span className="article-info-time">
              <span>{props.data.mdx.frontmatter?.date}</span>
              &nbsp;&nbsp;&#8212;&nbsp;&nbsp;
              <span>{props.data.mdx.fields?.timeToRead?.text}</span>
            </span>
          </div>
          <section itemProp="articleBody">{props.children}</section>
        </main>
      </div>
    </Layout>
  )
}

type ArticleProps = {
  children: React.ReactNode
  data: {
    mdx: Queries.Mdx
  }
}

export const query = graphql`
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
  `

export default Article

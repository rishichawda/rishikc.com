import * as React from "react"
import { SEO } from "../components/seo";
import { useArticleList } from "../hooks/use-article-list";

const Articles: React.FC = () => {
  const articles = useArticleList()
  return (
    <div>
      <section>
        <h1>Articles</h1>
        <ul>
          {
            articles.map((node) => (
              <li>
                <h3>{node.frontmatter!.title}</h3>
                <p>{node.fields!.timeToRead!.text}</p>
                <p>{node.excerpt}</p>
                <a href={node.fields!.slug!}>go to article</a>
              </li>
            ))
          }
        </ul>
      </section>
    </div>
  )
}

export const Head = () => <SEO title="Articles - rishikc.com" />

export default Articles

import * as React from "react"
import SEO from "../components/seo";
import { useArticleList } from "../hooks/use-article-list";
import { useFlexSearch } from "react-use-flexsearch";
import Search from "../components/articles/search";
import Layout from "../components/layout";
import "../stylesheets/articles.scss"

const Articles: React.FC = () => {
  const [articles, search] = useArticleList()
  const [searchQuery, setSearchQuery] = React.useState("")

  const data = useFlexSearch(searchQuery, search.index, search.store)

  const results = React.useMemo(() => {
    if (searchQuery.length) {
      return data.map((x: FlattenedArticleNode) => ({
        id: x.id,
        fields: {
          slug: x.slug,
          timeToRead: {
            text: x.timeToRead
          },
        },
        frontmatter: {
          title: x.title,
        },
        excerpt: x.excerpt,
      }))
    } else {
      return articles
    }
  }, [searchQuery, data])

  return (
    <Layout>
      <div className="root-container">
        <main className="main-container">
          <div className="article-list-header">
            <h2>Blog posts</h2>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <section>
            <ul className="article-list" role="list">
              {
                results.length ?
                  results.map((node: Queries.Mdx) => (
                    <li role="listitem" key={node.id}>
                      <h3>{node.frontmatter?.title}</h3>
                      <p>{node.fields?.timeToRead?.text}</p>
                      <p>{node.excerpt}</p>
                      <a href={node.fields?.slug!}>go to article</a>
                    </li>
                  )) : <p>Uh-oh! No results for the search.</p>
              }
            </ul>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="Articles - rishikc.com" />

type FlattenedArticleNode = {
  id: string;
  excerpt: string;
  slug: string;
  title: string;
  timeToRead: string;
}

export default Articles

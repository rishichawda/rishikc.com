import * as React from "react"
import { Link } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import SEO from "../components/seo";
import { useArticleList } from "../hooks/use-article-list";
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
            <h1>Blog posts</h1>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <section>
            <ul className="article-list" role="list">
              {
                results.length ?
                  results.map((node: Queries.Mdx) => (
                    <li className="article-list-item" role="listitem" key={node.id}>
                      <Link to={node.fields?.slug!}>
                        <span className="article-list-item-title">
                          <h2>{node.frontmatter?.title}</h2>
                          <span className="article-list-item-title-info">
                            <span>{node.frontmatter?.date}</span>
                            &nbsp;&nbsp;
                            <strong>·</strong>
                            &nbsp;&nbsp;
                            <span>{node.fields?.timeToRead?.text}</span>
                          </span>
                        </span>
                        <p className="article-list-item-details">{node.excerpt}</p>
                      </Link>
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

import * as React from "react"
import SEO from "../components/seo";
import { useArticleList } from "../hooks/use-article-list";
import { useFlexSearch } from "react-use-flexsearch";
import Search from "../components/articles/search";

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
    <div>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <section>
        <h1>Articles</h1>
        <ul>
          {
            results.length ?
              results.map((node: Queries.Mdx) => (
                <li key={node.id}>
                  <h3>{node.frontmatter?.title}</h3>
                  <p>{node.fields?.timeToRead?.text}</p>
                  <p>{node.excerpt}</p>
                  <a href={node.fields?.slug!}>go to article</a>
                </li>
              )) : <p>Uh-oh! No results for the search.</p>
          }
        </ul>
      </section>
    </div>
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

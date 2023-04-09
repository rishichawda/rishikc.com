import * as React from "react"
import { Link } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import SEO from "../components/seo";
import { filterByTags, transformFlexSearchData, useArticleList } from "../hooks/use-article-list";
import Search from "../components/articles/search";
import Layout from "../components/layout";
import "../stylesheets/articles.scss"
import { useTags } from "../hooks/use-tags";
import Tag from "../components/tag";

const Articles: React.FC = () => {
  const [articles, search] = useArticleList()
  const [allTags, topTags] = useTags()
  const [showAllTags, setShowAllTags] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [selectedTags, setSelectedTags] = React.useState<string[]>([])

  const data = useFlexSearch(searchQuery, search.index, search.store)

  const results = React.useMemo(() => {
    if (searchQuery.length) {
      return transformFlexSearchData(data)
    } else {
      return [...articles]
    }
  }, [searchQuery, data])


  const toggleTags = React.useCallback((e: React.MouseEvent) => {
    setShowAllTags(!showAllTags)
  }, [showAllTags])

  const setFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t != tag))
    } else {
      setSelectedTags([...selectedTags, tag])
    }
  }

  const onTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation()
    e.preventDefault()
    setFilter(tag)
  }

  const renderTags = React.useCallback(() => {
    let st = allTags.filter((t) => selectedTags.includes(t.split("(")[0].trim()))
    const data = showAllTags ? allTags : [...new Set(st.concat(...topTags))]
    return data.map((tag: string) => {
      const trimmedTag = tag
        .split("(")[0]
        .trim()
      return (
        <span>
          <Tag key={tag} onClick={(e) => onTagClick(e, trimmedTag)}>
            {tag}
            &nbsp;&nbsp;
            {
              selectedTags.includes(trimmedTag)
                ? <strong>x</strong>
                : null
            }
          </Tag>
        </span>
      )
    })
  }, [showAllTags, selectedTags])

  return (
    <Layout>
      <div className="root-container">
        <main className="main-container">
          <div className="article-list-header">
            <h1>Blog posts</h1>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div className="article-list-search-info">
            <span className="article-list-search-info-tags">
              <p>
                Popular tags
                &nbsp;
                <small onClick={toggleTags}>
                  (show all)
                </small>
                &nbsp;:&nbsp;
              </p>
              {renderTags()}
            </span>
          </div>
          <section>
            <ul className="article-list" role="list">
              {
                results.length ?
                  results.map(({ node }: { node: Queries.Mdx }) => (
                    <li className={`article-list-item${node.frontmatter?.tags?.some((t) => selectedTags.includes(t!)) || !selectedTags.length ? " show-item" : " hide-item"}`} role="listitem" key={node.id}>
                      <Link to={node.fields?.slug!}>
                        <div className="article-list-item-header">
                          <div className="article-list-item-header-content">
                            <h2 className="article-list-item-header-content-title">{node.frontmatter?.title}</h2>
                            <span className="article-list-item-header-content-tags">
                              {node.frontmatter?.tags?.map((tag) => <Tag onClick={(e) => { onTagClick(e, tag!) }}>{tag}</Tag>)}
                            </span>
                          </div>
                          <span className="article-list-item-header-info">
                            <span>{node.frontmatter?.date}</span>
                            &nbsp;&nbsp;
                            <strong>·</strong>
                            &nbsp;&nbsp;
                            <span>{node.fields?.timeToRead?.text}</span>
                          </span>
                        </div>
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



export default Articles

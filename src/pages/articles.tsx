import * as React from "react"
import { Link } from "gatsby";
import { useFlexSearch } from "react-use-flexsearch";
import { motion, AnimatePresence } from "framer-motion"
import SEO from "../components/seo";
import { filterByTags, transformFlexSearchData, useArticleList } from "../hooks/use-article-list";
import Search from "../components/articles/search";
import Layout from "../components/layout";
import "../stylesheets/articles.scss"
import { useTags } from "../hooks/use-tags";
import Tag from "../components/tag";

const variantA = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.05,
    }
  },
  exit: {}
};

const variantB = {
  initial: {
    opacity: 0
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0
  }
};

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

  const filteredResults = React.useMemo(() => {
    if (selectedTags.length) {
      return filterByTags(results, selectedTags)
    } else {
      return results
    }
  }, [selectedTags, results])


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
    let at = showAllTags ? allTags : topTags
    const data = [...new Set(st.concat(...at))]
    return data.map((tag: string) => {
      const trimmedTag = tag
        .split("(")[0]
        .trim()
      return (
        <motion.span key={tag} layout>
          <Tag key={tag} onClick={(e) => onTagClick(e, trimmedTag)}>
            {tag}
            &nbsp;&nbsp;
            {
              selectedTags.includes(trimmedTag)
                ? <strong>x</strong>
                : null
            }
          </Tag>
        </motion.span>
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
            <AnimatePresence>
            <motion.span className="article-list-search-info-tags">
              <p>
                Popular tags
                &nbsp;
                <small onClick={toggleTags}>
                  (show all)
                </small>
                &nbsp;:&nbsp;
              </p>
              {renderTags()}
              </motion.span>
            </AnimatePresence>
          </div>
          <section>
            <AnimatePresence>
              <motion.ul
                initial="initial"
                animate="animate"
                exit="exit"
                variants={variantA}
                className="article-list"
                role="list">
                {
                  filteredResults.length ?
                    filteredResults.map(({ node }: { node: Queries.Mdx }) => (
                      <motion.li variants={variantB} layout className="article-list-item" role="listitem" key={node.id}>
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
                      </motion.li>
                    )) : <p>Uh-oh! No results for the search.</p>
                }
              </motion.ul>
            </AnimatePresence>
          </section>
        </main>
      </div>
    </Layout>
  )
}

export const Head = () => <SEO title="Articles - rishikc.com" />



export default Articles

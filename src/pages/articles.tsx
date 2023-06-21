import "../stylesheets/articles.scss";

import { m, LazyMotion, domMax } from "framer-motion";
import * as React from "react";
import { useFlexSearch } from "react-use-flexsearch";

import Layout from "../components/layout";
import SEO from "../components/seo";
import Tag from "../components/tag";
import ArticlesList from "../components/articles/list";
import Search from "../components/articles/search";
import {
  filterByTags,
  transformFlexSearchData,
  useArticleList,
} from "../hooks/use-article-list";
import { useTags } from "../hooks/use-tags";

const ArticlesListPage: React.FC = () => {
  const [articles, search] = useArticleList();
  const [allTags, topTags] = useTags();
  const [showAllTags, setShowAllTags] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const data = useFlexSearch(searchQuery, search.index, search.store);

  const results = React.useMemo(() => {
    if (searchQuery.length) {
      return transformFlexSearchData(data);
    } else {
      return [...articles];
    }
  }, [searchQuery, data]);

  const filteredResults = React.useMemo(() => {
    if (selectedTags.length) {
      return filterByTags(results, selectedTags);
    } else {
      return results;
    }
  }, [selectedTags, results]);

  const toggleTags = React.useCallback(
    (e: React.MouseEvent) => {
      setShowAllTags(!showAllTags);
    },
    [showAllTags]
  );

  const setFilter = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t != tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const onTagClick = (e: React.MouseEvent, tag: string) => {
    e.stopPropagation();
    e.preventDefault();
    setFilter(tag);
  };

  const renderTags = React.useCallback(() => {
    let st = allTags.filter((t) =>
      selectedTags.includes(t.split("(")[0].trim())
    );
    let at = showAllTags ? allTags : topTags;
    const data = [...new Set(st.concat(...at))];
    return data.map((tag: string) => {
      const trimmedTag = tag.split("(")[0].trim();
      return (
        <m.span key={tag} layout>
          <Tag
            key={tag}
            onClick={(e) => onTagClick(e, trimmedTag)}
            showCloseButton={selectedTags.includes(trimmedTag)}
          >
            {tag}
          </Tag>
        </m.span>
      );
    });
  }, [showAllTags, selectedTags]);

  return (
    <Layout>
      <div className="root-container">
        <main className="articles-container">
          <div className="article-list-header">
            <h1 className="article-list-header-title">Blog posts</h1>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <div>
            <LazyMotion features={domMax}>
              <m.span className="article-list-tags">
                <p className="m-0">
                  Popular tags &nbsp;
                  <button className="show-all-button" onClick={toggleTags}>
                    (show all)
                  </button>
                  &nbsp;:&nbsp;
                </p>
                {renderTags()}
              </m.span>
            </LazyMotion>
          </div>
          <section>
            <ArticlesList items={filteredResults} onTagClick={onTagClick} />
          </section>
        </main>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <SEO
    title="Articles - rishikc.com"
    description="Welcome to my blog for quick reads to articles on technology, science, life, and everything in between."
    keywords="react js,react website,blog,react javascript,online article"
  />
);

export default ArticlesListPage;

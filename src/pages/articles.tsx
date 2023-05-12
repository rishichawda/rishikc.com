import "../stylesheets/articles.scss";

import { m, LazyMotion, domAnimation } from "framer-motion";
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
        <main className="article-page-container">
          <div className="flex flex-col sm:flex-row items-center justify-between article-list-header">
            <h1 className="mb-3 sm:m-0 article-list-header-title">
              Blog posts
            </h1>
            <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          </div>
          <React.Suspense>
            <div className="article-list-search-info">
              <LazyMotion features={domAnimation}>
                <m.span className="flex flex-wrap items-center w-full sm:w-2/3 article-list-search-info-tags">
                  <p className="m-0">
                    Popular tags &nbsp;
                    <button
                      className="text-brand-700 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-700 focus-within:outline-dotted focus-within:outline-2 focus-within:outline-brand-700 cursor-pointer show-all-button"
                      onClick={toggleTags}
                    >
                      (show all)
                    </button>
                    &nbsp;:&nbsp;
                  </p>
                  {renderTags()}
                </m.span>
              </LazyMotion>
            </div>
          </React.Suspense>
          <section>
            <React.Suspense>
              <ArticlesList items={filteredResults} onTagClick={onTagClick} />
            </React.Suspense>
          </section>
        </main>
      </div>
    </Layout>
  );
};

export const Head = () => (
  <SEO
    title="Articles - rishikc.com"
    description="Welcome to my blog for quick reads to detailed articles on technology, development, science and everything in between."
    type="BlogPosting"
  />
);

export default ArticlesListPage;

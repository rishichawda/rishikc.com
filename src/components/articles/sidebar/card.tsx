import { Link } from "gatsby";
import React from "react";

type Props = {
  data: Queries.Mdx;
};

const ArticleSuggestionCard = ({ data }: Props) => {
  return (
    <li
      className="inline-flex w-full items-stretch focus-within:outline-dotted focus-within:outline-2 focus-within:outline-brand-700 suggestion-list-item"
      role="listitem"
    >
      <div className="h-full flex flex-col items-start justify-between p-6 bg-slate-100  dark:bg-gray-900 dark:border-gray-800 shadow-sm">
        <div className="h-2/3 flex flex-col justify-between">
          <Link
            className="focus:outline-none"
            tabIndex={-1}
            to={data.fields?.slug!}
          >
            <h2 className="mb-2 text-gray-900 dark:text-white suggestion-list-item-title">
              {data.frontmatter?.title}
            </h2>
          </Link>
        </div>
        <div>
          <p className="mb-3 text-gray-700 dark:text-gray-400 suggestion-list-item-details">
            {data.excerpt}
          </p>
          <Link
            to={data.fields?.slug!}
            className="inline-flex items-center text-center text-brand-700 rounded-lg hover:text-brand-900 focus:outline-none"
          >
            Read more&nbsp;&nbsp;&#10140;
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ArticleSuggestionCard;

import React from "react";

type Props = {
  data: Queries.Mdx;
};

const ArticlePreviewCard = ({ data }: Props) => {
  return (
    <li
      className="inline-flex w-full items-stretch focus-within:outline-dotted focus-within:outline-2 focus-within:outline-brand-700 article-preview-list-item"
      role="listitem"
    >
      <div className="h-full flex flex-col items-start justify-between p-6 bg-white  dark:bg-gray-800 dark:border-gray-700">
        <div className="h-2/3 flex flex-col justify-between">
          <a
            className="focus:outline-none"
            tabIndex={-1}
            href={data.fields?.slug!}
          >
            <h2 className="mb-2 text-gray-900 dark:text-white article-preview-list-item-title">
              {data.frontmatter?.title}
            </h2>
          </a>
        </div>
        <div>
          <p className="mb-3 text-gray-700 dark:text-gray-400 article-preview-list-item-details">
            {data.excerpt}
          </p>
          <a
            href={data.fields?.slug!}
            className="inline-flex items-center text-center text-brand-600 rounded-lg hover:text-brand-800 focus:outline-none"
          >
            Read more&nbsp;&nbsp;&#10140;
          </a>
        </div>
      </div>
    </li>
  );
};

export default ArticlePreviewCard;

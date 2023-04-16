import React from "react";

type Props = {
  data: Queries.Mdx;
};

const ArticlePreviewCard = ({ data }: Props) => {
  return (
    <li
      className="inline-flex w-full items-stretch article-preview-list-item"
      role="listitem"
      key={data.id}
    >
      <div className="h-full flex flex-col items-start justify-between p-6 bg-white  dark:bg-gray-800 dark:border-gray-700">
        <div>
          <a href={data.fields?.slug!}>
            <h2 className="mb-2 text-gray-900 dark:text-white article-preview-list-item-title">
              {data.frontmatter?.title}
            </h2>
          </a>
          <p className="mb-3 text-gray-700 dark:text-gray-400 article-preview-list-item-details">
            {data.excerpt}
          </p>
        </div>
        <a
          href={data.fields?.slug!}
          className="inline-flex items-center text-center text-brand-600 rounded-lg hover:text-brand-800"
        >
          Read more&nbsp;&nbsp;&#10140;
        </a>
      </div>
    </li>
  );
};

export default ArticlePreviewCard;

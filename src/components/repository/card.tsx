import "./index.scss";

import React from "react";

import Languages from "./languages";

type Props = {
  repository: Queries.Maybe<Queries.GitHub_Repository>;
};

function Card({ repository }: Props) {
  return (
    <li
      role="listitem"
      className="flex items-stretch max-w-md md:max-w-none w-full github-repositories-preview-list-item"
    >
      <a
        className="inline-flex w-full items-stretch focus:outline-dotted focus:outline-2 focus:outline-brand-700"
        href={repository?.url}
        target="_blank"
      >
        <div className="github-repo-card relative w-full bg-white  dark:bg-gray-800 sm:mx-auto overflow-hidden">
          <Languages languages={repository?.languages} />
          <div className="flex justify-between items-start github-repositories-preview-list-item-title">
            <h2>{repository?.name}</h2>
            <small>&#9733;&nbsp;&nbsp;{repository?.stargazerCount}</small>
          </div>
          <div
            className="repo-description opacity-70"
            dangerouslySetInnerHTML={{ __html: repository?.descriptionHTML }}
          ></div>
        </div>
      </a>
    </li>
  );
}

export default Card;

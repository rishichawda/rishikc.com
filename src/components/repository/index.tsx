import React from "react";

import useGitRepositoryInfo from "../../hooks/use-git-repositories";
import RepoCard from "./card";
import { OutboundLink } from "gatsby-plugin-google-gtag";

const Github = () => {
  const data = useGitRepositoryInfo();

  return (
    <div
      id="articles-preview"
      className="flex flex-col w-full mx-auto mb-28 justify-between items-start github-repositories-preview"
    >
      <h2 className="antialiased github-repositories-preview-header">
        Popular OSS repositories
      </h2>
      <div className="mx-auto py-6">
        <ul
          role="list"
          className="grid grid-cols-1 grid-rows-3 sm:grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-cols-fr github-repositories-preview-list"
        >
          {data.map((repository: Queries.GitHub_RepositoryEdge) => (
            <RepoCard
              key={repository.node?.name}
              repository={repository.node}
            />
          ))}
        </ul>
      </div>
      <OutboundLink
        className="text-brand-700 dark:text-brand-400 hover:text-brand-900 dark:hover:text-brand-700 focus-within:outline-dotted focus-within:outline-2 focus-within:outline-brand-700 antialiased"
        href="https://github.com/rishichawda"
        target="_blank"
        rel="noopener noreferrer"
      >
        See more projects on GitHub
      </OutboundLink>
    </div>
  );
};

export default Github;

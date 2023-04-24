import React from "react";

import useGitRepositoryInfo from "../../hooks/use-git-repositories";
import RepoCard from "./card";

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
        <div className="grid grid-cols-1 grid-rows-3 sm:grid-rows-2 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-cols-fr github-repositories-preview-list">
          {data.map((repository: Queries.GitHub_RepositoryEdge) => (
            <RepoCard repository={repository.node} />
          ))}
        </div>
      </div>
      <a
        href="https://github.com/rishichawda"
        target="_blank"
        className="text-brand-600 hover:text-brand-800 antialiased"
      >
        See more projects on GitHub
      </a>
    </div>
  );
};

export default Github;

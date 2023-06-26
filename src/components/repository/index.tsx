import React from "react";

import useGitRepositoryInfo from "../../hooks/use-git-repositories";
import RepoCard from "./card";

const Github = () => {
  const data = useGitRepositoryInfo();

  return (
    <div id="repositories" className="git-preview">
      <h2 className="git-preview-header">Popular OSS repositories</h2>
      <div>
        <ul role="list" className="git-preview-list">
          {data.map((repository: Queries.GitHub_RepositoryEdge) => (
            <RepoCard
              key={repository.node?.name}
              repository={repository.node}
            />
          ))}
        </ul>
      </div>
      <a
        href="https://github.com/rishichawda"
        target="_blank"
        rel="noopener noreferrer"
      >
        See more projects on GitHub
      </a>
    </div>
  );
};

export default Github;

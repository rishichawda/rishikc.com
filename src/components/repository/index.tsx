import { graphql, useStaticQuery } from "gatsby";
import React from "react";

import RepoCard from "./card";

const Github = () => {
  const data = useStaticQuery(graphql`
    query {
      github {
        viewer {
          repositories(
            orderBy: { field: STARGAZERS, direction: DESC }
            first: 6
            ownerAffiliations: OWNER
          ) {
            edges {
              node {
                id
                name
                url
                descriptionHTML
                stargazerCount
                owner {
                  login
                }
                languages(
                  orderBy: { field: SIZE, direction: DESC }
                  first: 10
                ) {
                  edges {
                    node {
                      color
                      name
                    }
                    size
                  }
                  totalSize
                }
              }
            }
          }
        }
      }
    }
  `);
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto mb-28 justify-between items-start github-repositories-preview">
      <h2 className="antialiased github-repositories-preview-header">
        Popular OSS repositories
      </h2>
      <div className="mx-auto py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4 auto-cols-min gap-y-5 github-repositories-preview-list">
          {data.github.viewer.repositories.edges.map(
            (repository: Queries.GitHub_RepositoryEdge) => (
              <RepoCard repository={repository.node} />
            )
          )}
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

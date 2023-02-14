import RepoCard from 'components/github/card'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

const Github = () => {
  const data = useStaticQuery(graphql`
    query {
      github {
    viewer {
      repositories(
        orderBy: {field: STARGAZERS, direction: DESC}
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
            languages(orderBy: {field: SIZE, direction: DESC}, first: 10) {
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
  `)
  return (
    <div className="flex flex-col max-w-screen-2xl mx-auto px-4 mb-28 justify-between">
      <h2 className="italic antialiased">Open source</h2>
      <div className="mx-auto py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-4 auto-cols-min gap-y-5">
          {data.github.viewer.repositories.edges.map((repository, _) => (
            <div className="flex items-stretch w-full" key={repository.node.name}>
              <RepoCard repository={repository.node} />
            </div>
          ))}
        </div>
      </div>
      <a href="https://github.com/rishichawda" target="_blank" className="text-brand dark:text-gray-400 text-xl italic antialiased">See more projects on GitHub</a>
    </div>
  )
}

export default Github

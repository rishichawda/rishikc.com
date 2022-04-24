import React from 'react'

function RepoCard({ repository }) {
  return (
    <a className="inline-flex w-full items-stretch" href={repository.url} target="_blank">
      <div className="relative w-full bg-white dark:bg-gray-700 py-4 px-5 shadow-md ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg rounded-lg overflow-hidden">
        <div className="w-full h-1 flex absolute top-0 left-0">
          {repository.languages.edges.map((node) => {
            let percentage = `${Math.round((node.size / repository.languages.totalSize) * 100)}%`
            return (
              <dfn key={node.node.name} className="h-full" title={`${node.node.name}, ${percentage}`} style={{ backgroundColor: node.node.color, minWidth: percentage }}>
                <div className="h-full w-full" style={{ backgroundColor: node.node.color }}>{console.log(node)}</div>
              </dfn>
            )
          })}
        </div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">
            {repository.name}
          </h2>
          <p className="ml-2">
            &#9733;&nbsp;&nbsp;{repository.stargazerCount}</p>
        </div>
        <div className="repo-description opacity-70" dangerouslySetInnerHTML={{ __html: repository.descriptionHTML }}></div>
      </div>
    </a>
  )
}

export default RepoCard
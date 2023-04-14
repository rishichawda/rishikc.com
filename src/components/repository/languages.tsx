import React from "react";

type Props = {
  languages?: Queries.Maybe<Queries.GitHub_LanguageConnection>;
};

const Languages = ({ languages }: Props) => {
  return (
    <div className="w-full flex github-repo-card-languages">
      {languages?.edges?.map(
        (node: Queries.Maybe<Queries.GitHub_LanguageEdge>) => {
          const n = node as Queries.GitHub_LanguageEdge;
          let percentage = `${Math.ceil(
            (n.size / languages!.totalSize) * 100
          )}%`;
          return (
            <dfn
              key={n.node.name}
              className="h-full"
              title={`${n.node.name}, ${percentage}`}
              style={{
                backgroundColor: n.node.color!,
                width: percentage,
              }}
            >
              <div
                className="h-full w-full"
                style={{ backgroundColor: n.node.color!, width: percentage }}
              ></div>
            </dfn>
          );
        }
      )}
    </div>
  );
};

export default Languages;

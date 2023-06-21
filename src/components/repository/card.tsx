import "./index.scss";

import { OutboundLink } from "gatsby-plugin-google-gtag";
import React from "react";

import Languages from "./languages";

type Props = {
  repository: Queries.Maybe<Queries.GitHub_Repository>;
};

function Card({ repository }: Props) {
  return (
    <li role="listitem" className="h-item">
      <OutboundLink href={repository?.url} target="_blank">
        <div className="card">
          <Languages languages={repository?.languages} />
          <div className="p-name">
            <h2>{repository?.name}</h2>
            <small>&#9733;&nbsp;&nbsp;{repository?.stargazerCount}</small>
          </div>
          <div
            className="repo-description"
            dangerouslySetInnerHTML={{ __html: repository?.descriptionHTML }}
          ></div>
        </div>
      </OutboundLink>
    </li>
  );
}

export default Card;

import { Link } from "gatsby";
import React from "react";

type Props = {
  data: Queries.Mdx;
};

const ArticleSuggestionCard = ({ data }: Props) => {
  return (
    <li className="suggestion-list-item" role="listitem">
      <div>
        <div>
          <Link
            className="focus:outline-none"
            tabIndex={-1}
            to={data.fields?.slug!}
          >
            <h2 className=" suggestion-list-item-title">
              {data.frontmatter?.title}
            </h2>
          </Link>
        </div>
        <div>
          <p className=" suggestion-list-item-details">{data.excerpt}</p>
          <Link to={data.fields?.slug!}>Read more&nbsp;&nbsp;&#10140;</Link>
        </div>
      </div>
    </li>
  );
};

export default ArticleSuggestionCard;

import { Link } from "gatsby";
import React from "react";

type Props = {
  data: Queries.Mdx;
};

const ArticlePreviewCard = ({ data }: Props) => {
  return (
    <li className="h-entry" role="listitem">
      <div>
        <div className="h-item">
          <Link className="u-url" tabIndex={-1} to={data.fields?.slug!}>
            <h2 className="p-name">{data.frontmatter?.title}</h2>
          </Link>
        </div>
        <div>
          <p className="p-summary">{data.excerpt}</p>
          <Link className="u-url" to={data.fields?.slug!}>
            Read more&nbsp;&nbsp;&#10140;
          </Link>
        </div>
      </div>
    </li>
  );
};

export default ArticlePreviewCard;

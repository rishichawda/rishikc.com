import { Link } from "gatsby";
import React from "react";

type Props = {
  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
};

function PaginationNav({ pageContext }: Props) {
  const { numPages, currentPage } = pageContext;
  if (!numPages || !currentPage) return null;

  const isFirst = currentPage === 1;
  const isLast = currentPage === numPages;
  const prev =
    currentPage === 2 ? "/articles/" : `/articles/${currentPage - 1}`;
  const next = currentPage + 1;

  let start = isLast ? currentPage - 1 : currentPage;
  start = isFirst ? currentPage : start - 1;
  start = !start ? 1 : start;
  const pages = Array.from({ length: numPages < 3 ? numPages : 3 }).map(
    (_, i) => i + start
  );

  return (
    <nav className="pagination-nav" aria-label="articles page navigation">
      <ul>
        <li>
          <Link
            to={prev}
            rel="prev"
            className={isFirst ? "item-disabled" : undefined}
            tabIndex={isFirst ? -1 : undefined}
          >
            Previous
          </Link>
        </li>
        {pages.map((page) => (
          <li>
            <Link
              className={page == currentPage ? "current-index" : undefined}
              to={page === 1 ? "/articles" : `/articles/${page}`}
            >
              {page}
            </Link>
          </li>
        ))}

        <li>
          <Link
            className={isLast ? "item-disabled" : undefined}
            to={`/articles/${next}`}
            rel="next"
            tabIndex={isLast ? -1 : undefined}
          >
            Next
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default PaginationNav;

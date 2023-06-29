import "./index.scss";

import React from "react";

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form id="articles-search-bar" method="get" autoComplete="off">
      <label htmlFor="articles-search-bar">
        <span className="hide">Search</span>
      </label>
      <input
        value={searchQuery}
        onInput={onInputChange}
        type="text"
        placeholder="Type to search.."
        name="articles-search-bar"
      />
    </form>
  );
};

type SearchProps = {
  searchQuery: string;
  setSearchQuery: Function;
};

export default Search;

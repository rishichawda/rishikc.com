import "./index.scss";

import React from "react";

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form
      id="articles-search-bar"
      action="javascript:void(0);"
      method="get"
      autoComplete="off"
      className="border-4 border-gray-200 focus-within:border-gray-300 dark:border-slate-600 dark:focus-within:border-slate-500 w-full sm:w-fit"
    >
      <label htmlFor="articles-search-bar">
        <span className="hide">Search</span>
      </label>
      <input
        value={searchQuery}
        onInput={onInputChange}
        type="text"
        placeholder="Type to search.."
        name="articles-search-bar"
        className="placeholder:text-gray-400 block bg-gray-200 dark:bg-slate-600 dark:placeholder:text-slate-300"
      />
      <button className="hide" type="submit">
        Search
      </button>
    </form>
  );
};

type SearchProps = {
  searchQuery: string;
  setSearchQuery: Function;
};

export default Search;

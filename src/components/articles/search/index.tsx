import './index.scss';

import React from 'react';

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <form
      id="articles-search-bar"
      action="javascript:void(0);"
      method="get"
      autoComplete="off"
      className="border-4 border-slate-200 focus-within:border-slate-300 w-full sm:w-fit"
    >
      <label htmlFor="articles-search-bar">
        <span className="hide">
          Search
        </span>
      </label>
      <input
        value={searchQuery}
        onInput={onInputChange}
        type="text"
        placeholder="Type to search.."
        name="articles-search-bar"
        className="placeholder:text-slate-400 block bg-slate-200"
      />
      <button className="hide" type="submit">Search</button>
    </form>
  );
}

type SearchProps = {
  searchQuery: string;
  setSearchQuery: Function;
}

export default Search

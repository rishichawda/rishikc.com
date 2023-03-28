import React from 'react';
import './search.scss'

const Search: React.FC<SearchProps> = ({ searchQuery, setSearchQuery }) => {

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  return (
    <form
      action="javascript:void(0);"
      method="get"
      autoComplete="off"
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
        id="articles-search-bar"
        placeholder="Type to search.."
        name="articles-search-bar"
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

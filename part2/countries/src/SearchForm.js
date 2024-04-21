import React from 'react';

const SearchForm = ({ searchTerm, handleSearchChange, handleSearchSubmit }) => {
  return (
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;
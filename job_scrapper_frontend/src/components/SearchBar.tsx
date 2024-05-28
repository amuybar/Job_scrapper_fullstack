
import React from 'react';

interface SearchBarProps {
  searchTerm: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, handleSearch }) => (
  <div className="input">
    <input
      className="inputf"
      type="text"
      placeholder="Search jobs..."
      value={searchTerm}
      onChange={handleSearch}
    />
  </div>
);

export default SearchBar;

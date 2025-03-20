import React, { useState } from "react";

const searchIcon = () => {};

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  const SearchIcon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    );
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products..."
        className="w-full p-2 pl-3 pr-10 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="absolute inset-y-0 right-0 p-2 text-white cursor-pointer active:scale-95 transition-transform duration-100"
      >
        <SearchIcon />
      </button>
    </form>
  );
};

export default SearchBar;

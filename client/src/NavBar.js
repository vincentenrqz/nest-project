import React from "react";

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};
const Search = ({ query, searchFilter }) => {
  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => searchFilter(e)}
      />
    </>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const NavBar = ({ movies, query, searchFilter }) => {
  return (
    <nav className="nav-bar">
      <Logo />
      <Search searchFilter={searchFilter} query={query} />
      <NumResults movies={movies} />
    </nav>
  );
};

export default NavBar;

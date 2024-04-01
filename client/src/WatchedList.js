import React from "react";

const WatchedMovie = ({ movie }) => {
  return (
    <li>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
};

const WatchedList = ({ watched }) => {
  return (
    <>
      {watched.map((movie) => (
        <ul className="list">
          <WatchedMovie movie={movie} key={movie.imdbID} />
        </ul>
      ))}
    </>
  );
};

export default WatchedList;

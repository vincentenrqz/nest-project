import React from "react";

const Movie = ({ movie, handleSelectMovie }) => {
  return (
    <li onClick={() => handleSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

const MovieList = ({ movies, handleSelectMovie }) => {
  return (
    <>
      <ul className="list">
        {movies &&
          movies.length > 0 &&
          movies?.map((movie) => (
            <Movie
              movie={movie}
              key={movie.imdbID}
              handleSelectMovie={handleSelectMovie}
            ></Movie>
          ))}
      </ul>
    </>
  );
};

export default MovieList;

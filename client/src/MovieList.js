import React, { useState } from "react";
import Button from "./Button";

const Movie = ({ movie, children }) => {
  return (
    <>
      <li>
        <img src={movie.Poster} alt={`${movie.Title} poster`} />
        <h3>{movie.Title}</h3>
        <div>
          <p>
            <span>🗓</span>
            <span>{movie.Year}</span>
          </p>
        </div>
      </li>
    </>
  );
};

const MovieList = ({ movies }) => {
  return (
    <>
      <ul className="list">
        {movies?.map((movie) => (
          <Movie movie={movie} key={movie.imdbID}></Movie>
        ))}
      </ul>
    </>
  );
};

export default MovieList;
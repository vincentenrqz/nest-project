import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";

const MovieDetails = ({ movieKey, selectedId, closeMovie }) => {
  const [movie, setMovie] = useState({});

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  useEffect(() => {
    const selectedMovie = async () => {
      try {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${movieKey}&i=${selectedId}`
        );

        const data = await res.json();

        setMovie(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    selectedMovie();
  }, [selectedId]);

  return (
    <div className="details">
      <header>
        <button className="btn-back" onClick={closeMovie}>
          &larr;
        </button>
        <img src={poster} alt={`Poster of ${movie} movie`} />
        <div className="details-overview">
          <h2>{title}</h2>
          <p>
            {released} &bull; {runtime}
          </p>
          <p>{genre}</p>
          <p>
            <span>⭐</span>
            {imdbRating} IMDb rating
          </p>
        </div>
      </header>
      <section>
        <div className="rating">
          <StarRating maxRating={10} size={24} />
        </div>
        <p>
          <em>{plot}</em>
        </p>
        <p>Starring {actors}</p>
        <p>Directed by {director}</p>
      </section>
    </div>
  );
};

export default MovieDetails;

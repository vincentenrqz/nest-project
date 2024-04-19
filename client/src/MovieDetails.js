import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

const MovieDetails = ({
  movieKey,
  selectedId,
  closeMovie,
  onAddWatched,
  watched,
}) => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState("");

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

  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const watchUserRating = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;

  const handleAdd = () => {
    const newWatchedMove = {
      poster,
      imdbID: selectedId,
      title,
      year,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating,
    };

    onAddWatched(newWatchedMove);
    closeMovie();
  };

  useEffect(() => {
    const callback = () => {
      document.addEventListener("keydown", function (e) {
        if (e.code === "Escape") {
          closeMovie();
        }
      });
    };

    return function () {
      document.removeEventListener("keydown", callback);
    };
  }, [closeMovie]);

  useEffect(() => {
    const selectedMovie = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${movieKey}&i=${selectedId}`
        );

        const data = await res.json();

        setMovie(data);
        setIsLoading(false);
      } catch (err) {
        console.error(err.message);
      } finally {
      }
    };

    selectedMovie();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return function () {
      document.title = "usePopcorn";
    };
  }, [title]);

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
              {!isWatched ? (
                <>
                  <StarRating
                    maxRating={10}
                    size={24}
                    onSetRating={setUserRating}
                  />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You rated with movie {watchUserRating} ⭐</p>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default MovieDetails;

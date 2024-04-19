import { useEffect, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import MovieList from "./MovieList";
import Box from "./Box";
import WatchedList from "./WatchedList";
import MovieSummary from "./MovieSummary";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";

const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

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

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
};

const NumResults = ({ movies }) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

const ErrorMessage = ({ message }) => {
  return (
    <p className="error">
      <span>⛔ {message}</span>
    </p>
  );
};

const KEY = "add29be9";

export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setErrorMsg("");
      return;
    }

    fetchMovies();
  }, [query]);

  const searchFilter = (e) => {
    setQuery(e.target.value);
  };

  const handleSelectMovie = (id) => {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  };

  const handleCloseMovie = () => {
    setSelectedId(null);
  };

  const handleAddWatch = (movie) => {
    setWatched((watched) => [...watched, movie]);
  };

  console.log("watched", watched);
  return (
    <>
      <NavBar movies={movies} query={query}>
        <Logo />
        <Search searchFilter={searchFilter} query={query} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        {/* Passing elements as props*/}
        {/* <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          }
        /> */}

        {/* Passing elements as children */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !errorMsg && (
            <MovieList movies={movies} handleSelectMovie={handleSelectMovie} />
          )}
          {errorMsg && <ErrorMessage message={errorMsg} />}
        </Box>
        <Box>
          {selectedId ? (
            <MovieDetails
              movieKey={KEY}
              selectedId={selectedId}
              closeMovie={handleCloseMovie}
              onAddWatched={handleAddWatch}
              watched={watched}
            />
          ) : (
            <>
              <MovieSummary watched={watched} />
              <WatchedList watched={watched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

import { useEffect, useRef, useState } from "react";
import NavBar from "./NavBar";
import Main from "./Main";
import MovieList from "./MovieList";
import Box from "./Box";
import WatchedList from "./WatchedList";
import MovieSummary from "./MovieSummary";
import Loader from "./Loader";
import MovieDetails from "./MovieDetails";

const Search = ({ query, searchFilter }) => {
  const inputEl = useRef(null);

  useEffect(() => {
    if (document.activeElement === inputEl.current) return;
    const callback = (e) => {
      if (e.code === "Enter") {
        inputEl.current.focus();
        // searchFilter("");
      }
    };

    document.addEventListener("keydown", callback);

    return () => document.addEventListener("keydown", callback);
  }, [searchFilter]);

  return (
    <>
      <input
        className="search"
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => searchFilter(e)}
        ref={inputEl}
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
  const [query, setQuery] = useState(() => localStorage.getItem("search"));
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [watched, setWatched] = useState(function () {
    const storedValue = localStorage.getItem("watched");
    return JSON.parse(storedValue);
  });

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        setErrorMsg("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error("Something went wrong with fetching movies");
        }

        const data = await res.json();
        if (data.Response === "False") {
          throw new Error("Movie not found");
        }

        setMovies(data.Search);
        setErrorMsg("");
      } catch (err) {
        if (err.name !== "AbortError") {
          setErrorMsg(err.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (query.length < 3) {
      setMovies([]);
      setErrorMsg("");
      return;
    }

    handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
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

  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  };

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify(watched));
    localStorage.setItem("search", query);
  }, [watched, query]);

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
              <WatchedList
                watched={watched}
                onDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

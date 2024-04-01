import React, { useState } from "react";
import MovieList from "./MovieList";
import MovieWatched from "./MovieWatched";
import Button from "./Button";

const ListBox = ({ children }) => {
  const [isOpen1, setIsOpen1] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen1} setIsOpen={setIsOpen1} />

      {isOpen1 && children}
    </div>
  );
};

const Main = ({ tempWatchedData, movies }) => {
  return (
    <main className="main">
      <ListBox>
        <MovieList movies={movies} />
      </ListBox>
      <MovieWatched tempWatchedData={tempWatchedData} />
    </main>
  );
};

export default Main;

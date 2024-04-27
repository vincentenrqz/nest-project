import { useEffect, useState } from "react";

export const useLocalStorageState = (initialState, key) => {
  const [value, setValue] = useState(function () {
    const watchedMovie = localStorage.getItem(key);
    const parsedMovie = JSON.parse(watchedMovie);

    return watchedMovie ? parsedMovie : initialState;
  });

  useEffect(() => {
    const setValueItem = () => {
      localStorage.setItem(key, JSON.stringify(value));
    };

    setValueItem();
  }, [value, key]);

  return [value, setValue];
};

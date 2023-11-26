import React, { useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState([]);
  const [myReviews, setMyReviews] = useState({});
  const [mustWatch, setMustWatch] = useState([]);

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)) {
      newFavorites = [...favorites, movie.id];
    } else {
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites);
  };

  const addReview = (movie, review) => {
    setMyReviews({ ...myReviews, [movie.id]: review });
  };

  const removeFromFavorites = (movie) => {
    setFavorites(favorites.filter((mId) => mId !== movie.id));
  };

  const addToMustWatch = (movie) => {
    let newMustWatch = [];
    if (!mustWatch.includes(movie.id)) {
      newMustWatch = [...mustWatch, movie.id];
    } else {
      newMustWatch = [...mustWatch];
    }
    setMustWatch(newMustWatch);
    console.log('must watch: ' + mustWatch);
  };

  return (
    <MoviesContext.Provider
      value={{
        favorites,
        mustWatch,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addToMustWatch,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;
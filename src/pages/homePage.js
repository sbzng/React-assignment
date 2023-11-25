import React, { useState } from "react";
import { getMovies } from "../api/tmdb-api";
import PageTemplate from "../components/templateMovieListPage";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavoritesIcon from "../components/cardIcons/addToFavorites";

const HomePage = () => {
  const [page, setPage] = useState(1);
  const fetchMovies = () => getMovies(page);
  const { data, error, isLoading, isError } = useQuery(['discover', page], fetchMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <div>Error occurred: {error.message}</div>;
  }


  const movies = data.results;
  const totalPage = Math.min(data.total_pages, 500);
  const favorites = movies.filter((m) => m.favorite);
  localStorage.setItem("favorites", JSON.stringify(favorites));

 
  const getPage = (page) => {
    setPage(page);
  };
  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      page={page}
      totalPage={totalPage}
      getPage={getPage}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />;
      }}
    />
  );
};

export default HomePage;
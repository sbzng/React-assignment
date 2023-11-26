import React, { useState } from "react";
import { useParams } from "react-router-dom";
import PageTemplate from "../components/templateMovieListPage";
import { getTrendingMovies } from "../api/tmdb-api";
import AddToMustWatchIcon from "../components/cardIcons/addToMustWatchIcon";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const TrendingMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { timeWindow } = useParams();

  const { data, error, isLoading, isError } = useQuery(
    ["trending", timeWindow, currentPage],
    () => getTrendingMovies(timeWindow, currentPage)
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const movies = data.results;
  const totalPage = data.total_pages;

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <PageTemplate
      title="Trending Movies"
      movies={movies}
      page={currentPage}
      totalPage={totalPage}
      getPage={handlePageChange}
      action={(movie) => <AddToMustWatchIcon movie={movie} />}
    />
  );
};

export default TrendingMoviesPage;
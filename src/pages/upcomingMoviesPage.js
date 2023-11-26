import React, { useState } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getUpcomingMovies } from "../api/tmdb-api";
import AddToMustWatch from "../components/cardIcons/addToMustWatch";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";

const UpcomingMoviesPage = () => {
  const [ page, setPage] = useState(1); 

  const fetchUpcomingMovies = () => getUpcomingMovies( page);
  const movieQuery = useQuery(['upcoming',  page], fetchUpcomingMovies);

  if (movieQuery.isLoading) {
    return <Spinner />;
  }

  if (movieQuery.isError) {
    return <h1>Error: {movieQuery.error.message}</h1>;
  }

  const movies = movieQuery.data.results;
  const totalPage = Math.min(movieQuery.data.total_pages, 500);

  const handlePageChange = (page) => {
    setPage(page);  
  };

  return (
    <PageTemplate
      title="Upcoming Movies"
      movies={movies}
      page={page} 
      totalPage={totalPage}
      getPage={handlePageChange}
      action={(movie) => <AddToMustWatch movie={movie} />}
    />
  );
};

export default UpcomingMoviesPage;
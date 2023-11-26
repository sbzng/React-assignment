import React from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import Typography from "@mui/material/Typography";

const TopRatedMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('topRated', getTopRatedMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">Error: {error.message}</Typography>;
  }

  const movies = data.results;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={movies}
      action={(movie) => <AddToFavoritesIcon movie={movie} />}
    />
  );
};

export default TopRatedMoviesPage;

import React from "react";
import { useParams } from 'react-router-dom';
import PageTemplate from "../components/templateMoviePage";
import MovieDetails from "../components/movieDetails/";
import { getMovie, getMovieCredits, getSimilarMovies } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MoviePage = () => {
  const { id } = useParams();
  
  const movieQuery = useQuery(["movie", { id }], getMovie);
  const actorsQuery = useQuery(["actors", { id }], getMovieCredits);
  const similarMoviesQuery = useQuery(["similarMovies", { id }], getSimilarMovies);

  if (movieQuery.isLoading || actorsQuery.isLoading || similarMoviesQuery.isLoading) {
    return <Spinner />;
  }

  if (movieQuery.isError) {
    return <h1>Error: {movieQuery.error.message}</h1>;
  }

  if (actorsQuery.isError) {
    return <h1>Error: {actorsQuery.error.message}</h1>;
  }

  if (similarMoviesQuery.isError) {
    return <h1>Error: {similarMoviesQuery.error.message}</h1>;
  }

  return (
    <PageTemplate movie={movieQuery.data}>
      <MovieDetails movie={movieQuery.data} actors={actorsQuery.data} similarMovies={similarMoviesQuery.data} />
    </PageTemplate>
  );
};

export default MoviePage;

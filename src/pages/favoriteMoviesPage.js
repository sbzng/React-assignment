import React, { useState, useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import RemoveFromFavorites from "../components/cardIcons/removeFromFavorites";
import WriteReview from "../components/cardIcons/writeReview";

const FavoriteMoviesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { favorites } = useContext(MoviesContext);

  const movieQueries = favorites.map((id) => ({
    queryKey: ['movie', { id }],
    queryFn: getMovie,
  }));

  const results = useQueries(movieQueries);
  const isLoading = results.some((query) => query.isLoading);

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading]);

  const movies = results.map((query) => query.data).filter(Boolean);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <PageTemplate
      title="Favorite Movies"
      movies={movies}
      page={currentPage}
      totalPage={1} 
      getPage={handlePageChange}
      action={(movie) => (
        <>
          <RemoveFromFavorites movie={movie} />
          <WriteReview movie={movie} />
        </>
      )}
    />
  );
};

export default FavoriteMoviesPage;

import React, { useState } from "react";
import PageTemplate from '../components/templateMovieListPage';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites';
import TextField from "@mui/material/TextField";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { searchMovies } from "../api/tmdb-api";
import useDebounce from "../hooks/useDebounce";
import SiteHeader from './../components/siteHeader';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SearchMoviePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { data, error, isLoading, isError } = useQuery(
    ['search/movies', debouncedSearchTerm],
    () => searchMovies(debouncedSearchTerm),
    { enabled: !!debouncedSearchTerm }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  const movies = data?.results;

  return (
    <div className="movies">
      <SiteHeader />
      <Container>
        <form noValidate autoComplete="off" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>
          <TextField
            id="search-movies"
            label="Search for a movie"
            type="search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {movies?.length > 0 ? (
          <PageTemplate
            title="Discover Movies"
            movies={movies}
            action={(movie) => <AddToFavoritesIcon movie={movie} />}
          />
        ) : (
          <Typography variant="h6">
            Enter a search term to find movies.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default SearchMoviePage;

s
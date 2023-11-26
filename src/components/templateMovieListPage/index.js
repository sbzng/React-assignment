import React, { useState } from "react";
import { Grid, Pagination } from "@mui/material";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import InfoCardList from "../infoCardList";
import SortSelect from "../sortSelect";
import dayjs from "dayjs";
import _ from "lodash";

function MovieListPageTemplate({ movies, page, totalPage, getPage, title, action }) {
  const [filters, setFilters] = useState({
    name: "",
    genre: "0",
    ratingStart: 0,
    ratingEnd: 10,
    releaseDateStart: null,
    releaseDateEnd: null,
    sortBy: "Default",
  });
  const [viewType, setViewType] = useState("Card");

  const handlePageChange = (event, value) => {
    getPage(value);
  };

  const handleChange = (type, value) => {
    setFilters({ ...filters, [type]: value });
  };

  const filteredMovies = applyFilters(movies, filters);

  return (
    <Grid container sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      <Grid item xs={12}>
        <SortSelect
          viewType={viewType}
          setViewType={setViewType}
          userSortBy={filters.sortBy}
          setSortBy={(sortBy) => setFilters({ ...filters, sortBy })}
        />
      </Grid>
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={filters.name}
            genreFilter={filters.genre}
            ratingStartFilter={filters.ratingStart}
            ratingEndFilter={filters.ratingEnd}
            releaseDateStartFilter={filters.releaseDateStart}
            releaseDateEndFilter={filters.releaseDateEnd}
          />
        </Grid>
        {viewType === "Card" ? (
          <MovieList action={action} movies={filteredMovies} />
        ) : (
          <Grid key="listContainer" item xs={12} sm={6} md={8} lg={9} xl={10}>
            <InfoCardList action={action} movies={filteredMovies} />
          </Grid>
        )}
      </Grid>
      <Grid container sx={{ margin: "20px", justifyContent: "center" }}>
        <Pagination
          color="secondary"
          count={totalPage}
          page={page}
          onChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
}

function applyFilters(movies, filters) {
  let filteredMovies = movies.filter((movie) => {
    const matchesName = movie.title.toLowerCase().includes(filters.name.toLowerCase());
    const matchesGenre = filters.genre === "0" || movie.genre_ids.includes(Number(filters.genre));
    const matchesRating = movie.vote_average >= filters.ratingStart && movie.vote_average <= filters.ratingEnd;
    const matchesReleaseDate = !filters.releaseDateStart || !filters.releaseDateEnd || 
                                dayjs(movie.release_date).isBetween(filters.releaseDateStart, filters.releaseDateEnd, "day", "[]");
    
    return matchesName && matchesGenre && matchesRating && matchesReleaseDate;
  });

  switch (filters.sortBy) {
    case "title":
      return _.orderBy(filteredMovies, "title", "asc");
    case "releaseDate":
      return _.orderBy(filteredMovies, "release_date", "desc");
    case "rating":
      return _.orderBy(filteredMovies, "vote_average", "desc");
    default:
      return filteredMovies;
  }
}

export default MovieListPageTemplate;

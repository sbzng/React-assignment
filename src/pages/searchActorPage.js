import React, { useState } from "react";
import PageTemplate from '../components/templateActorListPage';
import TextField from "@mui/material/TextField";
import { searchActors } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import useDebounce from "../hooks/useDebounce";
import Spinner from '../components/spinner';
import SiteHeader from './../components/siteHeader';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

const SearchActorPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const { data, error, isLoading, isError } = useQuery(
    ['search/actors', debouncedSearchTerm],
    () => searchActors(debouncedSearchTerm),
    { enabled: !!debouncedSearchTerm }
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <Typography variant="h6" color="error">{error.message}</Typography>;
  }

  const actors = data?.results;

  return (
    <div className="actors">
      <SiteHeader />
      <Container>
        <form noValidate autoComplete="off" style={{ margin: '20px 0' }} onSubmit={handleSubmit}>
          <TextField
            id="search-actors"
            label="Search for an actor"
            type="search"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </form>

        {actors?.length > 0 ? (
          <PageTemplate
            name="Discover Actors"
            actors={actors}
          />
        ) : (
          <Typography variant="h6">
            Enter a search term to find actors.
          </Typography>
        )}
      </Container>
    </div>
  );
};

export default SearchActorPage;

import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import PageTemplate from '../components/templateShowListPage';
import TextField from "@mui/material/TextField";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { searchTVShows } from "../api/tmdb-api";
import useDebounce from "../hooks/useDebounce"
import SiteHeader from './../components/siteHeader'

const SearchTVShowPage = (props) => {
  const { user } = useContext(AuthContext);

  const [searchTerm, setSearchTerm] = useState("")
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

  const {  data, error, isLoading, isError }  = useQuery(['search/shows', { debouncedSearchTerm }], () => searchTVShows(debouncedSearchTerm), { enabled: !!debouncedSearchTerm})

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data?.results;


  const favorites = shows?.filter(s => s?.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (showId) => true 

  if (!user) {
    return <Navigate replace to="/login" />;
}
  
  return (
    <div className="shows">
      <SiteHeader />
    <form>
        <TextField
    id="filled-search"
    fullWidth 
    label="Search for a show"
    type="searchTMDB"
    variant="filled"
    value={searchTerm}
    onChange={handleSearchChange}
        />
        <br></br>
        </form>

    <PageTemplate
      title='Discover TV Shows'
      shows={shows}
    />
    </div>
  );
};

export default SearchTVShowPage;
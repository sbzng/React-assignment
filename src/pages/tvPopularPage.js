import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import PageTemplate from '../components/templateShowListPage'
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';
import { getPopularTV } from "../api/tmdb-api";
import SiteHeader from './../components/siteHeader'

const TvPopularPage = (props) => {

  const { user } = useContext(AuthContext);

  const [activePage, setActivePage] = useState(1);

  const handleChange = (event, value) => {
    setActivePage(value);
    console.log(value)
  };

  const { data, error, isLoading, isError }  = useQuery(['tv/popular', activePage], () => getPopularTV(activePage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const shows = data.results;


  const favorites = shows.filter(s => s.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (showId) => true 

  if (!user) {
    return <Navigate replace to="/login" />;
}
  
  return (
    <div className="tvpopularpage">
      <SiteHeader />
    <PageTemplate
      title="Discover TV Shows"
      shows={shows}
    />
    <Pagination
    count="100"
    variant='outlined'
    color='primary'
    shape="rounded"
    showFirstButton 
    showLastButton
    className='pagination'
    page={activePage}
    onChange={handleChange}
  />
  </div>
    );
};
export default TvPopularPage;
import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import PageTemplate from '../components/templateActorListPage'
import { getPopularActors } from "../api/tmdb-api";
import Spinner from '../components/spinner';
import Pagination from '@mui/material/Pagination';
import { useQuery } from 'react-query';
import SiteHeader from './../components/siteHeader'

const ActorPopularPage = (props) => {

  const { user } = useContext(AuthContext);

  const [activePage, setActivePage] = useState(1);

  const handleChange = (event, value) => {
    setActivePage(value);
    console.log(value)
  };

  const {  data, error, isLoading, isError }  = useQuery(['popular', activePage], () => getPopularActors(activePage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const actors = data.results;

  // Redundant, but necessary to avoid app crashing.
  const favorites = actors.filter(a => a.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (actorId) => true 

  if (!user) {
    return <Navigate replace to="/login" />;
}
  
  return (
    <div className="actorpage">
      <SiteHeader />
    <PageTemplate
      title="Discover Actors"
      actors={actors}
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
export default ActorPopularPage;
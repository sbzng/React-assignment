import React, { useState, useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import { getMovies } from "../api/tmdb-api";
import PageTemplate from '../components/templateMovieListPage';
import { useQuery } from 'react-query';
import Pagination from '@mui/material/Pagination';
import Spinner from '../components/spinner';
import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import SiteHeader from './../components/siteHeader'

const HomePage = (props) => {

  const { user } = useContext(AuthContext);
  
  const [activePage, setActivePage] = useState(1);

  const handleChange = (event, value) => {
    setActivePage(value);
    console.log(value)
  };

  const {  data, error, isLoading, isError }  = useQuery(['discover', activePage], () => getMovies(activePage), { keepPreviousData: true })

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  
  const movies = data.results;

  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))
  const addToFavorites = (movieId) => true 

  if (!user) {
    return <Navigate replace to="/login" />;
}
  
  return (
    <div className="homepage">
<SiteHeader />
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
        return <AddToFavoritesIcon movie={movie} />
      }}
    />
  <Pagination
        count='100'
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
export default HomePage;
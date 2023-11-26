import React from 'react';
import FilmCard from '../filmCard'; 
import './scrollableMovieList.css';

const ScrollMovieList = ({ movies }) => {
  if (!movies || movies.length === 0) {
    return <div>No movies available.</div>;
  }

  return (
    <div className="scroll-movie-list">
      {movies.map(movie => (
        <FilmCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default ScrollMovieList;

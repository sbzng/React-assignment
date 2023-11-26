import React from "react";
import { getMovieCredits } from "../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../spinner'; 
import './scrollableCastList.css'; 
import CastCard from '../castCard';

const ScrollableCastList = ({ movieId }) => {
  const { data: castData, isLoading, isError, error } = useQuery(
    ["movieCredits", { id: movieId }],
    getMovieCredits
  );

  if (isLoading) return <Spinner />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="scrollable-cast-list">
      {castData.cast.map((castMember) => (
        <CastCard key={castMember.id} cast={castMember} />
      ))}
    </div>
  );
};

export default ScrollableCastList;

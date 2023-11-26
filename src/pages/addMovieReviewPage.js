import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { Navigate } from 'react-router-dom';
import PageTemplate from "../components/templateMoviePage";
import ReviewForm from "../components/reviewForm";
import { useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import SiteHeader from './../components/siteHeader'

const WriteReviewPage = (props) => {

  const { user } = useContext(AuthContext);

  const location = useLocation();
  const movieId = location.state.movieId;

  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: movieId }],
    getMovie
  );

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  if (!user) {
    return <Navigate replace to="/login" />;
}

  return (
    <div><SiteHeader />
    <PageTemplate movie={movie}>
      <ReviewForm movie={movie} />
    </PageTemplate>
    </div>
  );
};

export default WriteReviewPage;
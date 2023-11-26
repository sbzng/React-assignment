import React from "react";
import { useParams } from 'react-router-dom';
import ActorDetails from "../components/actorDetails";
import PageTemplate from "../components/templateActorPage";
import { getActorDetails, getActorMovieCredits } from '../api/tmdb-api';
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

const ActorDetailsPage = () => {
  const { id } = useParams();
  
  const actorDetailsResult = useQuery(["actor", { id }], getActorDetails);
  const actorMoviesResult = useQuery(["cast", { id }], getActorMovieCredits);

  if (actorDetailsResult.isLoading || actorMoviesResult.isLoading) {
    return <Spinner />;
  }

  if (actorDetailsResult.isError) {
    return <h1>Error: {actorDetailsResult.error.message}</h1>;
  }

  if (actorMoviesResult.isError) {
    return <h1>Error: {actorMoviesResult.error.message}</h1>;
  }

  return (
    <div>
      {actorDetailsResult.data && (
        <PageTemplate actor={actorDetailsResult.data}>
          <ActorDetails actor={actorDetailsResult.data} cast={actorMoviesResult.data} />
        </PageTemplate>
      )}
    </div>
  );
};

export default ActorDetailsPage;
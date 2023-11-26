import React from 'react';
import { useParams } from 'react-router-dom';
import ActorDetails from '../components/actorDetails';
import PageTemplate from '../components/templateActorPage';
import { getActor, getActorMovieCredits } from '../api/tmdb-api';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import SiteHeader from './../components/siteHeader';

const ActorPage = () => {
  const { id } = useParams();

  const { data: actor, error: actorError, isLoading: isActorLoading, isError: isActorError } = useQuery(
    ['actor', { id }],
    getActor
  );

  const { data: cast, error: castError, isLoading: isCastLoading, isError: isCastError } = useQuery(
    ['cast', { id }],
    getActorMovieCredits
  );

  if (isActorLoading || isCastLoading) {
    return <Spinner />;
  }

  if (isActorError) {
    return <h1>Error: {actorError.message}</h1>;
  }

  if (isCastError) {
    return <h1>Error: {castError.message}</h1>;
  }

  return (
    <>
    <SiteHeader />
    <PageTemplate actor={actor}>
      <ActorDetails actor={actor} cast={cast} />
    </PageTemplate>
    </>
  );
};

export default ActorPage;

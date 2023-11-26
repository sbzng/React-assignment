import React, { useContext } from "react";
import AuthContext from "../AuthContext";
import { useParams, Navigate } from 'react-router-dom';
import ShowDetails from "../components/showDetails/";
import PageTemplate from "../components/templateShowPage";
import { getShow } from '../api/tmdb-api'
import { useQuery } from "react-query";
import Spinner from '../components/spinner'
import SiteHeader from './../components/siteHeader'

const ShowPage = (props) => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const { data: show, error, isLoading, isError } = useQuery(
    ["show", { id: id }],
    getShow
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
    <>
      {show ? (
        <><SiteHeader />
          <PageTemplate show={show}>
            <ShowDetails show={show} />
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for show details</p>
      )}
    </>
  );
};

export default ShowPage;
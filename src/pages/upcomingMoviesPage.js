import React, { useContext } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { MoviesContext } from "../contexts/moviesContext";

const UpcomingMoviesPage = () => {
    const { data, error, isLoading, isError } = useQuery('discover', getUpcomingMovies)
    const { addToMustWatch } = useContext(MoviesContext);
    if (isLoading) {
        return <Spinner />
    }
    if (isError) {
        return <h1>{error.message}</h1>;
    }
    const movies = data.results;

    const handleAddToMustWatch = (movie) => {
        addToMustWatch(movie);
    };


    return (
        <PageTemplate
            title="Upcoming Movies"
            movies={movies}
            action={(movie) => {
                return (
                    <PlaylistAddIcon
                        onClick={() => handleAddToMustWatch(movie)}
                    />
                );
            }}
        />
    );
};

export default UpcomingMoviesPage;
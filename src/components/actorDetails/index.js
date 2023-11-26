import React from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import ScrollMovieList from '../scrollableMovieList'; 
import FilmCard from '../filmCard';

const ActorDetails = ({ actor, cast }) => {  
  return (
    <>
      <Typography variant="h5" component="h3">Biography</Typography>
      <Paper sx={{ p: 2, mb: 2 }}>
        <Typography variant="body1">{actor.biography || 'Biography not available.'}</Typography>
      </Paper>

      <Typography variant="h5" component="h3">Known for</Typography>
      <Typography variant="body1" sx={{ mb: 2 }}>{actor.known_for_department || 'Information not available.'}</Typography>

      <Typography variant="h5" component="h3">Personal Info</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', mb: 2 }}>
        {actor.place_of_birth && <Chip label={`Birth Place: ${actor.place_of_birth}`} sx={{ mr: 1, mb: 1 }} />}
        {actor.birthday && <Chip label={`Birthday: ${actor.birthday}`} sx={{ mr: 1, mb: 1 }} />}
      </Box>

      <Typography variant="h5" component="h3">Movies</Typography>
      <Box sx={{ display: 'flex', overflowX: 'auto', py: 2 }}>
        {cast.cast.length > 0 ? (
          cast.cast.map((movie) => (
            <Box key={movie.id} sx={{ minWidth: 120, mr: 2 }}>
              <FilmCard movie={movie} />
            </Box>
          ))
        ) : (
          <Typography variant="body1">No movies available.</Typography>
        )}
      </Box>
    </>
  );
};

export default ActorDetails;

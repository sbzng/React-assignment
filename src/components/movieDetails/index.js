import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MonetizationIcon from "@mui/icons-material/MonetizationOn";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import Avatar from "@mui/material/Avatar";
import MovieReviews from "../movieReviews";
import { Link as RouterLink } from "react-router-dom";
import InfoCardList from "../infoCardList";

const profilePathRoot = "https://image.tmdb.org/t/p/w300";

const boxStyle = {
  display: "flex",
  justifyContent: "center",
  flexWrap: "wrap",
  listStyle: "none",
  padding: "10px",
  margin: "10px",
};

const chipStyle = { margin: "3px" };



const MovieDetails = ({ movie, actors, similarMovies }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);


  const renderActorCards = () => {
    return actors.cast
      .filter((actor) => actor.profile_path)
      .map((actor, index) => (
        <Box key={index} p={1} sx={{ display: 'inline-block' }}>
          <Avatar
            component={RouterLink}
            to={`/actors/${actor.id}`}
            src={`${profilePathRoot}${actor.profile_path}`}
            alt={actor.name}
            sx={{ width: 100, height: 100, cursor: 'pointer' }}
          />
          <Typography variant="body2" sx={{ textAlign: 'center' }}>{actor.name}</Typography>
        </Box>
      ));
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        Overview
      </Typography>
      <Paper sx={{ p: 2 }}>
        {movie.overview}
      </Paper>

      <Typography variant="h5" component="h3">
        <i>Basic Info</i>
      </Typography>

      <Paper>
        <Box component="ul" sx={{ ...boxStyle }}>
          <li>
            <Chip label="Genres" sx={{ ...chipStyle }} color="primary" />
          </li>
          {movie.genres.map((g) => (
            <li key={g.name}>
              <Chip label={g.name} sx={{ ...chipStyle }} />
            </li>
          ))}
        </Box>
        <Box component="ul" sx={{ ...boxStyle }}>
          <Chip
            icon={<AccessTimeIcon />}
            label={`${movie.runtime} min.`}
            sx={{ ...chipStyle }}
          />
          <Chip
            icon={<MonetizationIcon />}
            label={`${movie.revenue.toLocaleString()}`}
            sx={{ ...chipStyle }}
          />
          <Chip
            icon={<StarRate />}
            label={`${movie.vote_average} (${movie.vote_count})`}
            sx={{ ...chipStyle }}
          />
          <Chip
            label={`Released: ${movie.release_date}`}
            sx={{ ...chipStyle }}
          />
        </Box>
        <Box component="ul" sx={{ ...boxStyle }}>
          <li>
            <Chip
              label="Production countries"
              sx={{ ...chipStyle }}
              color="primary"
            />
          </li>
          {movie.production_countries.map((c) => (
            <li key={c.name}>
              <Chip label={c.name} sx={{ ...chipStyle }} />
            </li>
          ))}
        </Box>
      </Paper>

      <Typography variant="h5" component="h3">
        Top Billed Cast
      </Typography>
      <Paper sx={{ overflowX: 'auto', p: 2, display: 'flex' }}>
        {renderActorCards()}
      </Paper>

      <Typography variant="h5" component="h3">
        Similar Movies
      </Typography>
      <Paper sx={{ overflowX: 'auto', p: 2, display: 'flex' }}>
        <InfoCardList movies={similarMovies.results} action={null} />
      </Paper>

      <Fab color="secondary" variant="extended" onClick={() => setDrawerOpen(true)} sx={{ position: "fixed", bottom: "1em", right: "1em" }}>
        <NavigationIcon />
        Reviews
      </Fab>
      <Drawer anchor="top" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <MovieReviews movie={movie} />
      </Drawer>
    </>
  );
};

export default MovieDetails;

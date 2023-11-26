import React, { useState } from "react";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import StarRate from "@mui/icons-material/StarRate";
import NavigationIcon from "@mui/icons-material/Navigation";
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";
const root = {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    listStyle: "none",
    padding: 1.5,
    margin: 0,
};
const chip = { margin: 0.5 };

const ShowDetails = ({ show }) => {  
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>

      <Typography variant="h5" component="h3">
        Overview
      </Typography>

      <Typography variant="h6" component="p">
        {show.overview}
      </Typography>

      <Typography variant="h5" component="h3">
        <br />
        Show Details
      </Typography>
      <Typography variant="h6" component="p">
        <br />
        Number of episodes: {show.number_of_episodes}
      </Typography>
      <Typography variant="h6" component="p">
        Number of seasons: {show.number_of_seasons}
      </Typography>
      <Typography variant="h6" component="p">
       Show type: {show.type}
      </Typography>
      <Typography variant="h6" component="p">
       Status: {show.status}
      </Typography>

      <Paper 
        component="ul" 
        sx={{...root}}
      >
        <li>
          <Chip label="Genres" sx={{...chip}} color="primary" />
        </li>
        {show.genres.map((g) => (
          <li key={g.name}>
            <Chip label={g.name} sx={{...chip}} />
          </li>
        ))}
      </Paper>
      <Paper component="ul" sx={{...root}}>
        <Chip
          icon={<StarRate />}
          label={`${show.vote_average}`}
        />
        <Chip label={`Released: ${show.first_air_date}`} />
      </Paper>
      </>
  );
};
export default ShowDetails ;
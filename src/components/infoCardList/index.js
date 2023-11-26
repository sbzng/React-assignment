import React from "react";
import MovieEntry from "../movieEntry";
import { Grid } from "@mui/material";

const InfoCardList = ({ movies, action }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((m) => (
        <Grid item xs={12} key={m.id}>
          <MovieEntry movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCardList;
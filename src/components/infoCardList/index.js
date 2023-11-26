import React from "react";
import InfoCard from "../infoCard";
import { Grid } from "@mui/material";

const InfoCardList = ({ movies, action }) => {
  return (
    <Grid container spacing={2}>
      {movies.map((m) => (
        <Grid item xs={12} key={m.id}>
          <InfoCard movie={m} action={action} />
        </Grid>
      ))}
    </Grid>
  );
};

export default InfoCardList;
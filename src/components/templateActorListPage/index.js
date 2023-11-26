import React, { useState } from "react";
import Header from "../headerMovieList";
import ActorList from "../actorList";
import { Grid } from "@mui/material";

function PerformerOverview({ performerList, pageTitle, selectAction }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(0);
  const genreId = Number(selectedGenre);

  let filteredPerformers = performerList
    ?.filter((performer) => {
      return performer.name.toLowerCase().includes(searchTerm.toLowerCase());
    })
    ?.filter((performer) => {
      return genreId > 0 ? performer.genre_ids.includes(genreId) : true;
    });

  const handleFilterChange = (filterType, value) => {
    if (filterType === "search") setSearchTerm(value);
    else setSelectedGenre(value);
  };

  return (
    <Grid container spacing={2} sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={pageTitle} onFilterChange={handleFilterChange} />
      </Grid>
      <Grid item xs={12}>
        <ActorList actors={filteredPerformers} onActorSelect={selectAction}></ActorList>
      </Grid>
    </Grid>
  );
}

export default PerformerOverview;

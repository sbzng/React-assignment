import React from "react";
import ActorHeader from "../headerActor";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";

const TemplateActorPage = ({ actor, children }) => {

  return (
    <>
      <ActorHeader actor={actor} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
      <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList 
                cols={1}>
                    <ImageListItem key={actor.profile_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                        alt={actor.poster_path}
                    />
                    </ImageListItem>
            </ImageList>
          </div>
        </Grid>
  
        <Grid item xs={9}>
          {children}
        </Grid>
      </Grid>
    </>
  );
};

export default TemplateActorPage;
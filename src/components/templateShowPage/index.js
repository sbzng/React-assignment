import React from "react";
import ShowHeader from "../headerShow";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import Grid from "@mui/material/Grid";

const TemplateShowPage = ({ show, children }) => {

  return (
    <>
      <ShowHeader show={show} />

      <Grid container spacing={5} sx={{ padding: "15px" }}>
      <Grid item xs={3}>
          <div sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}>
            <ImageList 
                cols={1}>
                    <ImageListItem key={show.poster_path} cols={1}>
                    <img
                        src={`https://image.tmdb.org/t/p/w500/${show.poster_path}`}
                        alt={show.poster_path}
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

export default TemplateShowPage;
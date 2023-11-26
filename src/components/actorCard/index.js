import React from "react";
import { Card, CardMedia, CardContent, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import placeholderImg from '../../images/film-poster-placeholder.png';

export default function ActorCard({ actor }) {
  const imageUrl = actor.profile_path
    ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
    : placeholderImg;

  return (
    <Card sx={{ maxWidth: 345, display: 'flex', flexDirection: 'column' }}>
      <CardMedia
        component="img"
        sx={{ height: 300 }}
        image={imageUrl}
        alt={actor.name}
      />
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography gutterBottom variant="h6" component="div">
              {actor.name}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <Link to={`/actors/${actor.id}`} style={{ margin: 'auto' }}>
        <Button variant="outlined" size="small">
          More Info
        </Button>
      </Link>
    </Card>
  );
}

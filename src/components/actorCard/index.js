import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import img from '../../images/film-poster-placeholder.png'
import { Link } from "react-router-dom";

export default function ActorCard(props) {
  const actor = props.actor;

  const handleAddToFavorite = (e) => {
    e.preventDefault();
    props.selectFavorite(actor.id);
  };

  return (

<Card sx={{ maxWidth: 345, height: '100%' }}>
<CardMedia
  sx={{ height: 500 }}
  image={
    actor.profile_path
      ? `https://image.tmdb.org/t/p/w500/${actor.profile_path}`
      : img
  }
/>
<CardContent>
  <Grid container >
    <Grid item xs={20}>
      <Typography variant="h6" component="p">
        {actor.name}
      </Typography>
    </Grid>
  </Grid>
</CardContent>
<CardActions disableSpacing>
  <Link to={`/actors/${actor.id}`}>
    <Button variant="outlined" size="medium" color="primary">
      More Info ...
    </Button>
  </Link>
</CardActions>
</Card>
  );
}
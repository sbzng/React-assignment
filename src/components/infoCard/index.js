import React from "react";
import { Card, CardMedia, CardContent, Typography, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link as RouterLink } from "react-router-dom";
import placeholderImg from "../../images/film-poster-placeholder.png";

function infoCard({ movie }) {


  return (
    <Card sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, width: '100%' }}>
      <CardMedia
        component="img"
        sx={{ width: 100, height: 150 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholderImg}
        alt={movie.title}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {movie.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Release Date: {movie.release_date}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {movie.vote_average}
        </Typography>
      </CardContent>

      <IconButton component={RouterLink} to={`/movies/${movie.id}`}>
        <MoreHorizIcon />
      </IconButton>

    </Card>
  );
}

export default infoCard;

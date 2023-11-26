import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import { Card, CardMedia, CardContent, CardActions, Typography, Avatar, Grid, Button, Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import MustWatchIcon from "@mui/icons-material/PlaylistAddCheck";
import { Link } from "react-router-dom";
import placeholderImg from "../../images/film-poster-placeholder.png";

export default function MovieCard({ movie, action }) {
  const { favorites, mustWatch } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
  const isMustWatch = mustWatch.includes(movie.id);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        {isFavorite && <Avatar sx={{ bgcolor: "red" }}><FavoriteIcon /></Avatar>}
        {isMustWatch && <Avatar sx={{ bgcolor: "green" }}><MustWatchIcon /></Avatar>}
        <Typography variant="h5" sx={{ ml: 2 }}>{movie.title}</Typography>
      </Box>
      <CardMedia
        component="img"
        sx={{ height: 500 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : placeholderImg}
        alt={movie.title}
      />
      <CardContent>
        <Grid container justifyContent="space-between">
          <Typography variant="h6">
            <CalendarIcon fontSize="small" /> {movie.release_date}
          </Typography>
          <Typography variant="h6">
            <StarRateIcon fontSize="small" /> {movie.vote_average}
          </Typography>
        </Grid>
      </CardContent>
      <CardActions>
        {action(movie)}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" color="primary">More Info ...</Button>
        </Link>
      </CardActions>
    </Card>
  );
}

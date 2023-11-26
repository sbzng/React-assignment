import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import placeholderImg from '../../images/film-poster-placeholder.png'; 

const FilmCard = ({ movie }) => {
  return (
    <Link to={`/movies/${movie.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 120, height: 260 }}>
        <CardMedia
          image={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : placeholderImg}
          alt={movie.title}
          sx={{ height: 150 }}
        />
        <CardContent>
          <Typography component="p" fontSize={8}>
            {movie.title}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default FilmCard;

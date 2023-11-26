import React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import placeholderImg from '../../images/film-poster-placeholder.png';

const CastCard = ({ cast }) => {
  return (
    <Link to={`/actors/${cast.id}`} style={{ textDecoration: 'none' }}>
      <Card sx={{ width: 120, m: 1 }}>
        <CardMedia
          component="img"
          height="140"
          image={cast.profile_path ? `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : placeholderImg}
          alt={cast.name}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {cast.name}
          </Typography>
        </CardContent>
      </Card>
    </Link>
  );
};

export default CastCard;

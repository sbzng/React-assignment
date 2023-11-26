import React from "react";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Paper, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Actorheader = ({ actor }) => {
  const navigate = useNavigate();

  const handleNavigation = (direction) => {
    navigate(direction);
  };

  return (
    <Paper sx={{ display: "flex", justifyContent: "center", alignItems: "center", p: 2 }}>
      <IconButton onClick={() => handleNavigation(-1)} color="primary">
        <ArrowBack fontSize="large" />
      </IconButton>
      <Typography variant="h4" sx={{ mx: 2 }}>{actor.name}</Typography>
      <IconButton onClick={() => handleNavigation(1)} color="primary">
        <ArrowForward fontSize="large" />
      </IconButton>
    </Paper>
  );
};

export default Actorheader;
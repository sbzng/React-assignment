import React, { useState } from "react";
import { Typography, Paper, Box, Stack, Chip, Avatar, Link } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link as RouterLink } from "react-router-dom";
import { excerpt } from "../../util";

const posterPathRoot = "https://image.tmdb.org/t/p/w780";

const ActorDetails = ({ actor, cast }) => {
  const [isFullBiography, setIsFullBiography] = useState(false);

  const renderInfoEntry = (label, data, iterData, icon) => {
    return (
      <Stack direction="row" spacing={2} alignItems="center" key={label}>
        <Chip label={label} color="primary" />
        {iterData ? (
          iterData.map((item) => <Chip key={item} label={item} />)
        ) : icon ? (
          <Chip label={data} icon={icon} />
        ) : (
          <Chip label={data} />
        )}
      </Stack>
    );
  };

  return (
    <>
      <Typography variant="h5" component="h3">
        <i>Biography</i>
      </Typography>
      <Paper>
        <Box>
          {actor.biography ? (
            !isFullBiography ? (
              <Typography variant="body2">
                {excerpt(actor.biography)}
                <Typography
                  variant="body2"
                  onClick={() => setIsFullBiography(true)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Expand
                </Typography>
              </Typography>
            ) : (
              <Typography variant="body2">
                {actor.biography}
                <Typography
                  variant="body2"
                  onClick={() => setIsFullBiography(false)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  Fold
                </Typography>
              </Typography>
            )
          ) : (
            <Typography variant="body2">No Data</Typography>
          )}
        </Box>
      </Paper>

      <Typography variant="h5" component="h3">
        <i>Personal Info</i>
      </Typography>
      <Paper>
        <Box>
          <Stack direction="column" spacing={1}>
            {actor.also_known_as.length !== 0 && renderInfoEntry("Also known as", null, actor.also_known_as)}
            {actor.birthday && renderInfoEntry("Birthday", actor.birthday)}
            {actor.gender && renderInfoEntry("Gender", getGender(actor.gender))}
            {actor.place_of_birth && renderInfoEntry("Place of birth", actor.place_of_birth)}
            {actor.popularity && renderInfoEntry("Popularity", actor.popularity.toFixed(2), null, <StarRateIcon />)}
          </Stack>
        </Box>
      </Paper>

      <Typography variant="h5" component="h3">
        <i>Acting</i>
      </Typography>
      <Paper>
        <Box sx={{ display: "flex", flexDirection: "column", padding: 2 }}>
          {cast.cast ? (
            cast.cast.map((c) => (
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                key={c.id}
              >
                <Link component={RouterLink} to={`/movies/${c.id}`} underline="none">
                  <Avatar
                    alt={c.original_title}
                    src={c.poster_path ? `${posterPathRoot}${c.poster_path}` : ""}
                    variant="square"
                    sx={{ width: 200, height: 300 }}
                  />
                </Link>
                <Typography variant="body2">
                  <Link component={RouterLink} to={`/movies/${c.id}`} underline="none">
                    {c.original_title} ({c.release_date.substring(0, 4)})
                  </Link>
                </Typography>
                <Typography variant="body2">
                  <i>as</i> {c.character}
                </Typography>
              </Stack>
            ))
          ) : (
            <Typography variant="body2">No Data</Typography>
          )}
        </Box>
      </Paper>
    </>
  );
};

const getGender = (genderCode) => {
  switch (genderCode) {
    case 1: return "Female";
    case 2: return "Male";
    case 3: return "Non-binary";
    default: return "Unknown";
  }
};

export default ActorDetails;

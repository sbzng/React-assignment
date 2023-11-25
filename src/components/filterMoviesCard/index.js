import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  TextField,
  FormControl,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useQuery } from "react-query";
import Spinner from "../spinner";
import img from "../../images/pexels-dziana-hasanbekava-5480827.jpg";
import { getGenres } from "../../api/tmdb-api";

const formControlStyle = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)",
};

export default function FilterMoviesCard(props) {
  const { data, error, isLoading } = useQuery("genres", getGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <h1>{error.message}</h1>;
  }

  const genres = [{ id: "0", name: "All" }, ...data.genres];

  const handleInputChange = (type, value) => {
    props.onUserInput(type, value);
  };

  return (
    <Card sx={{ maxWidth: 345, backgroundColor: "rgb(204, 204, 0)" }} variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter the movies.
        </Typography>
        <TextField
          sx={formControlStyle}
          label="Search field"
          type="search"
          variant="filled"
          value={props.titleFilter}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
        <FormControl sx={formControlStyle}>
          <Select
            value={props.genreFilter}
            onChange={(e) => handleInputChange("genre", e.target.value)}
            displayEmpty
          >
            {genres.map((genre) => (
              <MenuItem key={genre.id} value={genre.id}>
                {genre.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Stack direction="row" justifyContent="space-between" sx={{ mt: 2 }}>
          <TextField
            sx={{ ...formControlStyle, minWidth: 100 }}
            label="Rating from"
            variant="filled"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.ratingStartFilter}
            onChange={(e) => handleInputChange("ratingStart", e.target.value)}
          />
          <TextField
            sx={{ ...formControlStyle, minWidth: 100 }}
            label="to"
            variant="filled"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            value={props.ratingEndFilter}
            onChange={(e) => handleInputChange("ratingEnd", e.target.value)}
          />
        </Stack>
      </CardContent>
      <CardMedia sx={{ height: 300 }} image={img} title="Filter" />
    </Card>
  );
}

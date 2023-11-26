import React from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

const SortSelect = ({ sortBy, setSortBy }) => {
  const handleSortByChange = (event) => {
    const newSortBy = event.target.value;
    if (newSortBy !== sortBy) {
      setSortBy(newSortBy);
    }
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        justifyContent: "center",
        margin: "10px",
      }}
    >
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="sort-by-label">Sort by</InputLabel>
        <Select
          labelId="sort-by-label"
          id="sort-by-select"
          value={sortBy}
          label="Sort by"
          onChange={handleSortByChange}
        >
          <MenuItem value="title">Title</MenuItem>
          <MenuItem value="releaseDate">Release Date</MenuItem>
          <MenuItem value="rating">Rating</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SortSelect;

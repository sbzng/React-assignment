import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import { useAuthState } from "react-firebase-hooks/auth";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { auth, logout } from "../../firebase";
import Fade from '@mui/material/Fade';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchAnchorEl, setSearchAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isSearchMenuOpen = Boolean(searchAnchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const generalMenuOptions = user
    ? [
        { label: "Home", path: "/" },
        { label: "Favorites", path: "/movies/favorites" },
        { label: "Upcoming", path: "/movies/upcoming" },
        { label: "TV", path: "/shows/popular" },
        { label: "Actors", path: "/actors/popular" }
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Register", path: "/register" },
        { label: "Login", path: "/login" },
        { label: "TV", path: "/shows/popular" },
        { label: "Actors", path: "/actors/popular" }
      ];

  const searchSubMenuOptions = [
    { label: "Movies", path: "/movies/search" },
    { label: "Actors", path: "/actors/search" },
    { label: "TV Shows", path: "/shows/search" }
  ];

  const handleMenuSelect = (pageURL) => {
    navigate(pageURL, { replace: true });
    setAnchorEl(null);
    setSearchAnchorEl(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSearchMenu = (event) => {
    setSearchAnchorEl(event.currentTarget);
  };

  return (
    <>
      <AppBar position="fixed" color="secondary">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            TMDB Client
          </Typography>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            All you ever wanted to know about Movies!
          </Typography>
            {isMobile ? (
              <>
                <IconButton
                  aria-label="menu"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={isMenuOpen}
                  onClose={() => setAnchorEl(null)}
                >
                  {generalMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                  <MenuItem onClick={handleSearchMenu}>Search</MenuItem>
                </Menu>
              </>
            ) : (
              <>
                {generalMenuOptions.map((opt) => (
                  <Button
                    key={opt.label}
                    color="inherit"
                    onClick={() => handleMenuSelect(opt.path)}
                  >
                    {opt.label}
                  </Button>
                ))}
                <Button
                  aria-controls="search-menu"
                  aria-haspopup="true"
                  onClick={handleSearchMenu}
                  color="inherit"
                >
                  Search
                </Button>
                <Menu
                  id="search-menu"
                  anchorEl={searchAnchorEl}
                  keepMounted
                  open={isSearchMenuOpen}
                  onClose={() => setSearchAnchorEl(null)}
                  TransitionComponent={Fade}
                >
                  {searchSubMenuOptions.map((opt) => (
                    <MenuItem
                      key={opt.label}
                      onClick={() => handleMenuSelect(opt.path)}
                    >
                      {opt.label}
                    </MenuItem>
                  ))}
                </Menu>
                {user && (
                  <Button color="inherit" onClick={logout}>
                    Logout
                  </Button>
                )}
              </>
            )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;

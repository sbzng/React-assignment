import React from "react";
import { BrowserRouter, Route, Navigate, Routes} from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import ShowPage from "./pages/tvDetailsPage";
import ActorPage from "./pages/actorDetailsPage";
import TvPopularPage from "./pages/tvPopularPage";
import SearchMoviePage from "./pages/searchMoviePage";
import SearchShowPage from "./pages/searchTVShowPage";
import SearchActorPage from "./pages/searchActorPage";
import ActorPopularPage from "./pages/actorsPage";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Reset from "./components/Reset/Reset";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./AuthProvider";
import MoviesContextProvider from "./contexts/moviesContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
    <MoviesContextProvider>
    <AuthProvider>
    <Routes>
    <Route path="/shows/popular" element={<TvPopularPage />} />
      <Route path="/actors/popular" element={<ActorPopularPage />} />
      <Route path="/actors/:id" element={<ActorPage />} />
      <Route path="/shows/:id" element={<ShowPage />} />
      <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
      <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
      <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
      <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
      <Route path="/movies/:id" element={<MoviePage />} />
      <Route path="/movies/search" element={<SearchMoviePage />} />
      <Route path="/shows/search" element={<SearchShowPage />} />
      <Route path="/actors/search" element={<SearchActorPage />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/reset" element={<Reset />} />
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={ <Navigate to="/" /> } />
    </Routes>
    </AuthProvider>
    </MoviesContextProvider>
  </BrowserRouter>
  <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
  );
};
const rootElement = createRoot(  document.getElementById("root") )
rootElement.render(<App />);
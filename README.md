Movie Explorer App

Overview

Users can delve into details about their favorite films, discover popular actors, and explore TV shows. The app offers functionality to search for specific movies, actors, or shows, and users can register or log in using Firebase Authentication to access personalized features such as favoriting movies and writing reviews.

Features

Firebase Authentication: Secure user registration and login functionality.

Firestore Cloud Storage: Stores user data and preferences in the cloud.

Pagination: Efficient navigation through lists of movies, actors, and TV shows.

Search Functionality: Allows users to search for movies, actors, and TV shows.

Favorite Movies: Users can mark movies as favorites and access them easily.

Popular Actors Page: Showcases currently trending actors.

Actor Details Page: Provides detailed information about actors.

Popular TV Shows Page: Displays trending TV shows.

Show Details Page: Offers in-depth details about specific TV shows.

Popular Movies Page: Lists currently popular movies.

Upcoming Movies Page: Features movies that are yet to be released.

Movie Details Page: Contains detailed information about movies.

Movie Reviews: Users can check reviews for movies.

Write a Review: Users can write and submit reviews for movies.



To run the application, a .env file needs to be created in the src folder with the following content:


REACT_APP_TMDB_KEY=<YOUR_TMDB_API_KEY>
FAST_REFRESH=false

API Endpoints

Search for a Movie: /search/movie

Search for an Actor: /search/person

Search for a Show: /search/tv

Discover Upcoming Movies: /movie/upcoming

Discover Popular Actors: /person/popular

Discover Popular Shows: /tv/popular

Actor Details: /person/:id

Show Details: /tv/:id

Routing

/shows/popular: Popular TV shows.

/actors/popular: Popular actors.

/actors/:id: Specific actor details.

/shows/:id: Specific show details.

/movies/upcoming: Upcoming movies.

/movies/search: Search movies.

/shows/search: Search TV shows.

/actors/search: Search actors.

/login: User login.

/register: User registration.

/reset: Password reset.

Protected :

/register - sign up page, users can sign up with email and password

/login - log in page, users can log in with email and password

/password/reset - password reset page, users can enter email and get a password reset email.

Independent Learning

The project includes independently researched and implemented features such as Firebase authentication, Firestore integration, search functionality, and pagination using React Query. Also, route protection using Auth Context is implemented to ensure that only authenticated users access certain functionalities.Use dynamic UI to create cast members and actors in movies

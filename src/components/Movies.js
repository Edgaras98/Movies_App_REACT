import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import "./Movies.css";
import { Button, Alert } from "react-bootstrap";
import { useAuth } from "../Context/AuthContext";
import { useHistory } from "react-router-dom";

//API's import from TMDB
const IMG_URL = "https://image.tmdb.org/t/p/w1280";
const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=cfc50d26c547473d07ecc9939610a67f";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=cfc50d26c547473d07ecc9939610a67f&query=";

//APP
export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState([]);
  const { currentUser, logout } = useAuth();
  const [searched, setSearched] = useState("");
  const [error, setError] = useState("");
  const history = useHistory();

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (searchTerm) {
      getMovies(SEARCH_API + searchTerm);
      setSearchTerm("");
      setSearched(searchTerm);
    }
  };

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    fetch(FEATURED_API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      });
  }, []);

  async function handleLogOut() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("failed to log out");
    }
  }

  return (
    <>
      <header>
        <div className="header-wrapper">
          <Button size="lg" className="bg-primary" onClick={handleLogOut}>
            Sign out
          </Button>
          <form onSubmit={handleOnSubmit}>
            <input
              className="search"
              type="search"
              placeholder="Search...🔎"
              value={searchTerm}
              onChange={handleOnChange}
            />
          </form>
        </div>
      </header>
      <div className="welcome-div">
        <h2 className="terms">
          {currentUser === null
            ? `Welcome, user!`
            : `Welcome, ${currentUser.email.split("@")[0].toUpperCase([0])} !`}
        </h2>
        <h3 className="terms">{`${`Recent search: ${searched}`}`}</h3>
      </div>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
      </div>
    </>
  );
}

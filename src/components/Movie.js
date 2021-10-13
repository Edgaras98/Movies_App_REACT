import React from "react";
//API from TMDB
const IMG_URL = "https://image.tmdb.org/t/p/w1280";

//Creating product card

function Movie({ title, poster_path, overview, vote_average }) {
  return (
    <div className="movie">
      <img src={IMG_URL + poster_path} alt={title}></img>
      <div className="movie-info">
        <h3>{title}</h3>
        <span>{vote_average}</span>
      </div>
      <div className="movie-over">
        <h2>Overview</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}

export default Movie;

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";


const MovieCard = ({ movie, setMovies, movies }) => {
  const [showAdditionalContent, setShowAdditionalContent] = useState(true);
  const { id, title, genre, rating, explicit } = movie || {};
  console.log(movie, "movie");
  console.log(id, "id");

  const deleteMovie = (id) => {
    const headers = { method: "DELETE", mode: "cors" };
    fetch(`http://localhost:3001/api/v1/movies/${id}`, headers)
      .then((response) => {
        let filterMovie = movies.filter((movie) => movie.id !== id);
        setMovies(filterMovie);
      })
      .catch((err) => {
        console.log(err, "Unable to delete movie");
      });
  };

  // useEffect (()=> {
  //   const grabElement = document.getElementById("patka");
  //   grabElement?.addEventListener(
  //     "mouseover",
  //     function (event) {
  //       setTimeout(function () {
  //         console.log("tu sam ");
  //         setShowAdditionalContent(true);
  //       }, 100);
  //     },
  //     false
  //   );
  //   grabElement?.addEventListener(
  //     "mouseleave",
  //     function (event) {
  //       setTimeout(function () {
  //         setShowAdditionalContent(false);
  //       }, 100);
  //     },
  //     true
  //   ),[]}

  return (
    <div className="card-wrapper" id="patka">
      <div>
        <h2 className="titula">{title}</h2>
        <div className="card-image-wrapper">
          <img src="/logo192.png" alt="movie img" />
        </div>
      </div>
      {showAdditionalContent ? (
        <div className="extra-content-wrapper">
          <div className="p-wrapper">
            <p className="genre">Genre: {genre}</p>
            <p className="rating">Rating: {rating}</p>
            <p className="explicit">Explicit: {explicit ? "Yes" : "No"}</p>
          </div>
          <div className="card-button-wrapper">
            <Link to={`/movie/edit/${id}`}>
              <button className="edit">EDIT MOVIE</button>
            </Link>
            <button onClick={() => deleteMovie(movie.id)} className="delete">
              DELETE MOVIE
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MovieCard;

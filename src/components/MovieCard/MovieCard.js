import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie, setMovies, movies }) => {
  const { id, title, genre, rating, explicit } = movie || {};
  console.log(movie, "movie");
  console.log(id, "id");
  console.log (explicit, ' explicit mamu ti ')

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

  return (
    <div className="card-wrapper">
      <h2 className="titula">{title}</h2>
      <div className="card-image-wrapper">
        <img src="/logo192.png" alt="movie img" />
      </div>
      <div className="extra-content-wrapper">
        <div className="p-wrapper">
          <p className="genre">Genre: {genre}</p>
          <p className="rating">Rating: {rating}</p>
          <p className="explicit">Explicit: {explicit? "Yes" : "No"}</p>
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
    </div>
  );
};

export default MovieCard;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./EditMovie.css";

// We can use the `useParams` hook here to access
// the dynamic pieces of the URL.

const EditMovie = (props) => {
  let { id } = useParams();
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  const [explicit, setExplicit] = useState();
  const [statusErr, setStatusErr] = useState();
  const [movie, setSingleMovie] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3001/api/v1/movies`, {
      method: "GET",
      mode: "cors",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response, "res");
        let filterMovie = response.find((movie) => movie.id == id);
        console.log(filterMovie, "fil");
        setSingleMovie(filterMovie);
        setTitle(filterMovie.title);
        setGenre(filterMovie.genre);
        setRating(filterMovie.rating);
        setExplicit(filterMovie.explicit);
      })
      .catch((err) => {
        console.log("Unable to get movie");
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/movies/" + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...movie, title, rating, explicit, genre }),
    })
      .then((response) => {
        console.log("res", response);
        setStatusErr({ statusErr: false });
        props.history.push("/");
      })
      .catch((err) => {
        console.log("er", err);
        setStatusErr({ statusErr: true });
      });
  };

  return (
    <div className="card-wrapper-add">
      <div className="image-wrapper">
        <img src="/logo192.png" alt="movie img" />
      </div>
      <form action="/" onSubmit={handleSubmit}>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input
              value={title}
              type="text"
              id="title"
              placeholder="Enter movie title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </li>
          <li>
            <label htmlFor="genre">
              Genre
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Comedy">Comedy</option>
                <option value="Documentary">Documentary</option>
                <option value="Horror">Horror</option>
                <option value="Sci-Fi">Sci-Fi</option>
              </select>
            </label>
          </li>
          <li>
            <label htmlFor="rating">Rating</label>
            <input
              value={rating}
              id="rating"
              type="number"
              placeholder="Rate movie 0-10"
              min="0"
              max="10"
              required
              onChange={(e) => setRating(e.target.value)}
            />
          </li>
          <li>
            <div>
              <label htmlFor="boolean">Explicit ?</label>
              <input
                value={explicit}
                className="radio"
                type="radio"
                onChange={(e) => setExplicit(e.target.value)}
                name="explicit"
                value="true"
                //checked={explicit === true}
              />
              <input
                value={explicit}
                className="radio"
                onChange={(e) => setExplicit(e.target.value)}
                type="radio"
                name="explicit"
                value="false"
                // checked={explicit === false}
              />
            </div>
            <p className="yesno"> YES || NO </p>
          </li>
        </ul>
        <div>
          <input className="button" type="submit" value="Update Movie" />
        </div>
      </form>
      {statusErr ? <h1> An error occurred while updating the movie! </h1> : ""}
    </div>
  );
};

export default EditMovie;

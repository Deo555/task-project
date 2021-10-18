import React, { useState } from "react";
import "./AddMovie.css";

const AddMovie = (props) => {
  console.log(props);
  const [title, setTitle] = useState();
  const [genre, setGenre] = useState();
  const [rating, setRating] = useState();
  const [explicit, setExplicit] = useState();
  const [statusErr, setStatusErr] = useState();

  const handleSumbit = (e) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };
    const movie = { title, genre, rating, explicit };
    console.log(movie, "movieee");
    fetch("http://localhost:3001/api/v1/movies", {
      method: "POST",
      mode: "cors",
      headers,
      body: JSON.stringify(movie),
    })
      .then((response) => {
        if (response.status >= 400) {
          throw { error: "Error happened while saving the movie" };
        }
        console.log(response);
        return response.json();
      })
      .then((data) => {
        props.history.push("/");
        setStatusErr({ statusErr: false });
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        setStatusErr({ statusErr: true });
      });
  };

  return (
    <div className="card-wrapper-add">
      <div className="image-wrapper">
        <img src="/logo192.png" alt="movie img" />
      </div>
      <form action="/" onSubmit={handleSumbit}>
        <ul>
          <li>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              id="title"
              placeholder="Enter movie title"
              required
            />
          </li>
          <li>
            <label htmlFor="genre">
              Genre
              <select
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                id="genre"
              >
                <option value="" selected disabled hidden>
                  Choose genre
                </option>
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
              onChange={(e) => setRating(e.target.value)}
              id="rating"
              type="number"
              placeholder="Rate movie 0-10"
              min="0"
              max="10"
              required
            />
          </li>
          <li>
            <label htmlFor="boolean">Explicit ?</label>
            <input
              value={explicit}
              onChange={(e) => setExplicit(e.target.value)}
              className="radio"
              type="radio"
              name="explicit"
              value="true"
              required
            />
            <input
              value={explicit}
              onChange={(e) => setExplicit(e.target.value)}
              className="radio"
              type="radio"
              name="explicit"
              value="false"
            />
            <p className="yesno"> YES || NO </p>
          </li>
        </ul>
        <div>
          <input className="button" type="submit" value="Add Movie" />
        </div>
      </form>
      {statusErr ? <h1> An error occurred while adding the movie! </h1> : ""}
    </div>
  );
};

export default AddMovie;

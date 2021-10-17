import React, { useState, useEffect } from "react";
import MovieCard from "../../MovieCard/MovieCard";
import './Home.css'

const Home = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/movies", {
      method: "GET",
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw { error: "No movies found" };
        }
        return response.json();
      })
      .then((data) => setMovies(data))
      .catch((err) => {
        console.log(err, "catch error");
      });
  }, []);
  
  return (
    <div className="home-wrapper">
      {movies?.map((movie, index) => {
        return (
          <div key={index}>
            <MovieCard movie={movie} setMovies={setMovies} movies={movies} />
          </div>
        );
      })}
    </div>
  );
};

export default Home;

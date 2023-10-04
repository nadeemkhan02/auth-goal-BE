const express = require("express");
const dummyMovieData = require("../utils/dummyMovies");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/getMovieList/:id?", (req, res) => {
  const id = req.params.id;
  if (id) {
    const movie = dummyMovieData.find((item) => item?.id === parseInt(id));
    if (movie) return res.send(movie);
    return res.status(404).send("Movie not found!");
  } else {
    res.send(dummyMovieData);
  }
});
//  id: 19,
//     movie_name: "The Godfather: Part II",
//     genre: "Crime",
//     imdb_rating: 9.0,
//     release_year: 1974,
//     director: "Francis Ford Coppola",
//     sequel: true,

router.post("/addMovie", auth, (req, res) => {
  const movieData = req.body;
  if (
    movieData?.movie_name &&
    movieData?.genre &&
    movieData?.imbd_rating &&
    movieData?.director &&
    movieData?.sequel &&
    movieData?.release_year
  ) {
    const newMovieData = {
      id: dummyMovieData.length + 1,
      ...movieData,
    };
    dummyMovieData.push(newMovieData);
    res.status(201).send(dummyMovieData);
  } else {
    res.status(400).send("Bad request, please provide valid movie data!");
  }
});

router.put("/updateMovie/:id", (req, res) => {
  //check and find the movie which is to be updated
  const id = req.params.id;
  if (id) {
    const movie = dummyMovieData.find((item) => item?.id === parseInt(id));
    if (movie) {
      //is updated that movie with updated data from body
      const movieData = req.body;
      if (
        movieData?.movie_name &&
        movieData?.genre &&
        movieData?.imbd_rating &&
        movieData?.director &&
        movieData?.sequel &&
        movieData?.release_year
      ) {
        movie.movie_name = movieData.movie_name;
        movie.genre = movieData.genre;
        movie.imbd_rating = movieData.imbd_rating;
        movie.director = movieData.director;
        movie.sequel = movieData.sequel;
        movie.release_year = movieData.release_year;
        res.status(201).send(movie);
      } else {
        res.status(400).send("Bad request, please provide valid movie data!");
      }
    } else {
      return res.status(404).send("Movie not found!");
    }
  } else res.status(400).send("provide valid movie id!");
});

router.delete("/deleteMovie/:id", auth, (req, res) => {
  const id = parseInt(req.params.id);

  if (!Number.isNaN(id)) {
    const index = dummyMovieData.findIndex((movie) => movie?.id === id);

    if (index !== -1) {
      const deletedMovie = dummyMovieData[index];
      dummyMovieData.splice(index, 1);
      res.status(200).send(deletedMovie);
    } else {
      res.status(404).send("Movie not found!");
    }
  } else {
    res.status(400).send("Provide a valid movie id!");
  }
});

module.exports = router;

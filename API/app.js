const express = require("express");
const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const { type } = require("os");

const app = express();
const port = 3000;

app.use(express.json());

mongoose
  .connect("mongodb://root:root@localhost:27018/mflix?authSource=admin")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect to MongoDB", err));

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plot: { type: String, required: true },
  fullplot: { type: String, required: true },
  genres: [{ type: String }],
  runtime: { type: Number },
  cast: [{ type: String }],
  num_mflix_comments: { type: Number },
  countries: [{ type: String }],
  released: { type: Date },
  directors: [{ type: String }],
  rated: { type: String },
  awards: {
    wins: { type: Number },
    nominations: { type: Number },
    text: { type: String },
  },
  lastupdated: { type: Date },
  year: { type: Number },
  imdb: {
    rating: { type: Number },
    votes: { type: Number },
    id: { type: Number },
  },
  type: { type: String },
  tomatoes: {
    viewer: {
      rating: { type: Number },
      numReviews: { type: Number },
      meter: { type: Number },
    },
    lastUpdated: { type: Date },
  },
});

const Movie = mongoose.model("movies", movieSchema);

app.get("/", async (req, res) => {
  res.status(200).json("Bienvenue sur l'api");
});

app.get("/MovieCount", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" }).countDocuments();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/SeriesCount", async (req, res) => {
  try {
    const series = await Movie.find({ type: "series" }).countDocuments();
    res.status(200).json(series);
  } catch (error) {
    res.status(500).json({ error: "Error getting series" });
  }
});

app.get("/Types", async (req, res) => {
  try {
    const types = await Movie.distinct("type");
    res.status(200).json(types);
  } catch (error) {
    res.status(500).json({ error: "Error getting types" });
  }
});

app.get("/Genres", async (req, res) => {
  try {
    const genres = await Movie.distinct("genres");
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ error: "Error getting genres" });
  }
});

app.get("/2015Movies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("released")
      .gte(new Date("2015-01-01"))
      .sort({ released: -1 });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/2015WinnerMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("released")
      .gte(new Date("2015-01-01"))
      .where("awards.wins")
      .gte(5);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/2015FrenchWinnerMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("released")
      .gte(new Date("2015-01-01"))
      .where("awards.wins")
      .gte(5)
      .where("languages")
      .in(["French"]);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/ThrillerAndDramaMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("genres")
      .all(["Thriller", "Drama"]);
    res.status(200).json({ total: movies.length, movies });
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/ThrillerOrCrimeMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("genres")
      .in(["Thriller", "Crime"])
      .select("title genres -_id");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/FrAndItMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("languages")
      .all(["French", "Italian"])
      .select("title languages -_id");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/IMDBMovies", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("imdb.rating")
      .gt(9)
      .select("title genres -_id");
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.get("/Cast", async (req, res) => {
  try {
    const movies = await Movie.find({ type: "movie" })
      .where("cast")
      .size(4)
      .countDocuments();
    res.status(200).json(movies );
  } catch (error) {
    res.status(500).json({ error: "Error getting movies" });
  }
});

app.listen(port, () => {
  console.log(`DB app listening on port ${port}`);
});

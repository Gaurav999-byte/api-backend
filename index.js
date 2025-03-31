const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors());

const port = process.env.PORT || 3000; // ✅ Use Render-assigned port

// ✅ Root route to check if backend is running
app.get("/", (req, res) => {
  res.send("✅ Backend is running on Render...");
});

// ✅ Path to JSON file
const moviesFilePath = path.join(__dirname, "movies_data.json");

// ✅ Function to read movies data
function readMoviesData() {
  try {
    const data = fs.readFileSync(moviesFilePath, "utf8");
    return JSON.parse(data);
  } catch (err) {
    console.error("❌ Error reading the JSON file:", err);
    return [];
  }
}

// ✅ Get all movies
app.get("/movies", (req, res) => {
  const movies = readMoviesData();
  res.json(movies);
});

// ✅ Get movie by ID
app.get("/movies/:id", (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movies = readMoviesData();
  const movie = movies.find((m) => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: "Movie not found" });
  }
});

const cors = require('cors');
app.use(cors({ origin: "*" })); // ✅ Allows requests from anywhere


// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

const express = require('express');
const fs = require('fs').promises; // Use async file reading
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse JSON

const port = process.env.PORT || 3000; // ✅ Use dynamic port for deployment

// ✅ Root route to prevent "Cannot GET /" error
app.get('/', (req, res) => {
  res.send({ message: 'Backend is running...' });
});

// Path to the JSON file
const moviesFilePath = path.join(__dirname, 'movies_data.json');

// Utility function to read the JSON file asynchronously
async function readMoviesData() {
  try {
    const data = await fs.readFile(moviesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('❌ Error reading the JSON file:', err);
    return [];
  }
}

// Route to get all movies
app.get('/movies', async (req, res) => {
  const movies = await readMoviesData();
  res.json(movies);
});

// Route to get a specific movie by ID
app.get('/movies/:id', async (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movies = await readMoviesData();
  const movie = movies.find(m => m.id === movieId);

  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Movie not found' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server is running on port ${port}`);
});

// server.js
const express = require('express');
const app = express();

// Middleware for parsing JSON
app.use(express.json());

// Define the /api route
app.get('/api', (req, res) => {
  res.json({ message: 'API is running!' });
});

// Add a root route for testing
app.get('/', (req, res) => {
  res.send(`Hello from Express!<br>Visit <a href="/api">/api</a> for JSON response`);
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
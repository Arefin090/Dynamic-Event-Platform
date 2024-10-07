const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const db = require('./db'); // Import database connection
const eventRoutes = require('./routes/events'); // Import event routes

dotenv.config();

const app = express();

// Configure CORS with specific origin
const corsOptions = {
    origin: 'http://localhost:3001', // Allow your frontend's origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
  
  app.use(cors(corsOptions)); // Apply CORS options to the app
  app.use(bodyParser.json()); // Parse JSON bodies
  app.use('/api/events', eventRoutes); // Use event routes

// Test route to check server status
app.get('/', (req, res) => {
  res.send('Event Platform API is running!');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

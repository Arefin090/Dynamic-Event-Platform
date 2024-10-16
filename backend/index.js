const express = require('express');
const cors = require('cors');
const { poolPromise } = require('./db'); // Database connection
const setupDatabase = require('./setupDatabase');
const eventRoutes = require('./routes/events'); // Your events route
const userRoutes = require('./routes/users');
const rsvpRoutes = require('./routes/rsvps');
const { swaggerUi, swaggerDocs } = require('./swagger');
require('dotenv').config();
require('./db');

const app = express(); // Initialize the app
const PORT = process.env.PORT || 5001;

app.use(cors()); // Use CORS middleware
app.use(express.json()); // Middleware to parse JSON

// Swagger Documentation Route
if (process.env.NODE_ENV === 'development') {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

// Test database connection on server startup
async function testConnection() {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT 1 AS number');
    console.log('Test query result:', result.recordset);
  } catch (err) {
    console.error('Error executing test query:', err);
  }
}

// Run setupDatabase and testConnection only in non-test environments
if (process.env.NODE_ENV !== 'test') {
  testConnection();
  setupDatabase();
}

// Define routes
app.use('/api/events', eventRoutes);
app.use('/api/users', userRoutes);
app.use('/api/rsvps', rsvpRoutes);


// Only start server if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}
module.exports = app; // Export for testing








const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Determine the server URL based on the environment
const serverUrl = process.env.NODE_ENV === 'development'
  ? 'http://localhost:5001' 
  : process.env.SERVER_URL; // Use a SERVER_URL variable for production

// Swagger configuration options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Dynamic Event Platform API',
      version: '1.0.0',
      description: 'API documentation for the Dynamic Event Platform',
    },
    servers: [
      {
        url: serverUrl || 'http://localhost:5001', // Fallback to localhost if no SERVER_URL is set,
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the route files for documentation
};


const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = {
  swaggerUi,
  swaggerDocs,
};

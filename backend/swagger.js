const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
        url: 'http://localhost:5001', // Replace with your server URL
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

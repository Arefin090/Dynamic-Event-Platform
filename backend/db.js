const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_HOST, // Your server name from Azure
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT) || 1433, // Default to 1433
  options: {
    encrypt: true, // Azure requires encryption for SQL Server
    trustServerCertificate: false
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

module.exports = { sql, poolPromise };

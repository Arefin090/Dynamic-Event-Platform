const { poolPromise } = require('./db');

async function setupDatabase() {

  if (process.env.NODE_ENV === 'test') {
    return; // Skip setup in test environment
  }
  try {
    const pool = await poolPromise;
    
    if (!pool) {
      console.error("Failed to establish a database connection.");
      return;
    }

    // Check if the 'Users' table exists, and create it if not
    const usersTableResult = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Users')
      CREATE TABLE Users (
        id INT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
      )
    `);
    if (usersTableResult.rowsAffected && usersTableResult.rowsAffected[0] === 1) {
      console.log("Users table created.");
    } else {
      console.log("Users table already exists or creation query returned no changes.");
    }

    // Check if the 'Events' table exists, and create it if not
    const eventsTableResult = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'Events')
      CREATE TABLE Events (
        id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        description TEXT,
        date DATETIME NOT NULL,
        location NVARCHAR(255),
        created_at DATETIME DEFAULT GETDATE()
      )
    `);
    if (eventsTableResult.rowsAffected && eventsTableResult.rowsAffected[0] === 1) {
      console.log("Events table created.");
    } else {
      console.log("Events table already exists or creation query returned no changes.");
    }

    // Check if the 'RSVPs' table exists, and create it if not
    const rsvpsTableResult = await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = 'RSVPs')
      CREATE TABLE RSVPs (
        id INT PRIMARY KEY IDENTITY(1,1),
        user_id INT NOT NULL,
        event_id INT NOT NULL,
        status NVARCHAR(20) CHECK (status IN ('Going', 'Not Going', 'Maybe')) DEFAULT 'Maybe',
        created_at DATETIME DEFAULT GETDATE(),
        FOREIGN KEY (user_id) REFERENCES Users(id) ON DELETE CASCADE,
        FOREIGN KEY (event_id) REFERENCES Events(id) ON DELETE CASCADE
      )
    `);
    if (rsvpsTableResult.rowsAffected && rsvpsTableResult.rowsAffected[0] === 1) {
      console.log("RSVPs table created.");
    } else {
      console.log("RSVPs table already exists or creation query returned no changes.");
    }

  } catch (error) {
    console.error("Error setting up database:", error.message);
    // You may want to log error stack trace in development
    if (process.env.NODE_ENV === 'development') {
      console.error(error.stack);
    }
  }
}
module.exports = setupDatabase;

const { poolPromise } = require('./db'); // Assuming 'db.js' is your connection file

async function setupDatabase() {
  try {
    const pool = await poolPromise;

    // Create Users table
    await pool.request().query(`
      CREATE TABLE Users (
        id INT PRIMARY KEY IDENTITY(1,1),
        username NVARCHAR(50) NOT NULL,
        email NVARCHAR(100) NOT NULL UNIQUE,
        password NVARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT GETDATE()
      )
    `);
    console.log("Users table created.");

    // Create Events table
    await pool.request().query(`
      CREATE TABLE Events (
        id INT PRIMARY KEY IDENTITY(1,1),
        title NVARCHAR(255) NOT NULL,
        description TEXT,
        date DATETIME NOT NULL,
        location NVARCHAR(255),
        created_at DATETIME DEFAULT GETDATE()
      )
    `);
    console.log("Events table created.");

    // Create RSVPs table
    await pool.request().query(`
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
    console.log("RSVPs table created.");
  } catch (error) {
    console.error("Error setting up database:", error.message);
  }
}

setupDatabase();

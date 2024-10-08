const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const authenticateToken = require('../middleware/auth')
const { JWT_SECRET, JWT_EXPIRATION } = process.env;

// Register a new user
router.post('/', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool.request()
      .input('username', username)
      .input('email', email)
      .input('password', hashedPassword)
      .query(`
        INSERT INTO Users (username, email, password)
        VALUES (@username, @email, @password);
      `);
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login route to authenticate user and issue a JWT
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('email', email)
      .query(`SELECT * FROM Users WHERE email = @email`);
    
    const user = result.recordset[0];
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(401).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
    res.json({ token });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ error: 'Error during login' });
  }
});

// Get all users
router.get('/', authenticateToken, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT id, username, email, created_at FROM Users;`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Error fetching users' });
  }
});

// Get a specific user by ID
router.get('/:id',authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', userId)
      .query(`SELECT id, username, email, created_at FROM Users WHERE id = @id;`);
    
    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ error: 'Error fetching user' });
  }
});

// Update a user by ID
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const pool = await poolPromise;
    await pool.request()
      .input('id', userId)
      .input('username', username)
      .input('email', email)
      .input('password', hashedPassword)
      .query(`
        UPDATE Users
        SET username = @username, email = @email, password = @password
        WHERE id = @id;
      `);
    res.status(200).json({ message: 'User updated successfully' });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ error: 'Error updating user' });
  }
});

// Delete a user by ID
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const userId = req.params.id;
    const pool = await poolPromise;
    await pool.request()
      .input('id', userId)
      .query(`DELETE FROM Users WHERE id = @id;`);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    console.error('Error deleting user:', err);
    res.status(500).json({ error: 'Error deleting user' });
  }
});

module.exports = router;

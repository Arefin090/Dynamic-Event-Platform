const request = require('supertest');
const app = require('../index'); // Ensure this points to your main server file
const db = require('../db'); // Mock the db
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock the poolPromise object to avoid real database interactions
jest.mock('../db', () => ({
    poolPromise: {
      request: jest.fn().mockReturnThis(),
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({
        recordset: [
          { id: 1, username: 'testuser', email: 'test@example.com' } // No password field here
        ],
        rowsAffected: [1]
      })
    }
  }));
  

// Mock bcrypt compare to simulate successful password verification
jest.mock('bcryptjs', () => ({
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashedpassword')
}));

// Mock jwt sign
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(() => 'fake-jwt-token'),
  verify: jest.fn((token, secret, callback) => {
    if (token === 'valid-token') {
      callback(null, { id: 1, email: 'test@example.com' });
    } else {
      callback(new Error('Invalid token'));
    }
  })
}));

describe('Users API', () => {
  // Test for POST /api/users - Register
  it('should register a new user', async () => {
    const newUser = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
    const response = await request(app).post('/api/users').send(newUser);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'User created successfully' });
  });

  // Test for POST /api/users/login - Authenticate
  it('should authenticate a user and issue a JWT', async () => {
    const credentials = { email: 'test@example.com', password: 'password123' };

    const response = await request(app).post('/api/users/login').send(credentials);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ token: 'fake-jwt-token' });
  });

  // Test for GET /api/users - Fetch all users
  it('should retrieve all users', async () => {
    const response = await request(app).get('/api/users').set('Authorization', 'valid-token');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, username: 'testuser', email: 'test@example.com' }]);
  });

  // Test for GET /api/users/:id - Fetch user by ID
  it('should retrieve a user by ID', async () => {
    const response = await request(app).get('/api/users/1').set('Authorization', 'valid-token');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 1, username: 'testuser', email: 'test@example.com' });
  });

  // Test for PUT /api/users/:id - Update user details
  it('should update a user by ID', async () => {
    const updatedUser = { username: 'updateduser', email: 'updated@example.com', password: 'newpassword' };
    const response = await request(app).put('/api/users/1').send(updatedUser).set('Authorization', 'valid-token');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'User updated successfully' });
  });

  // Test for DELETE /api/users/:id - Delete user
  it('should delete a user by ID', async () => {
    const response = await request(app).delete('/api/users/1').set('Authorization', 'valid-token');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted successfully' });
  });
});

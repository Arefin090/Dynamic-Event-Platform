const request = require('supertest');
const app = require('../index'); // Ensure this points to your main server file
const db = require('../db'); // Mock the db

// Mock the poolPromise object to avoid real database interactions
jest.mock('../db', () => ({
  poolPromise: {
    request: jest.fn().mockReturnThis(),
    input: jest.fn().mockReturnThis(),
    query: jest.fn().mockResolvedValue({ rowsAffected: [1] }) // Default mock response
  }
}));

describe('RSVPs API', () => {
  // Test for POST /api/rsvps
  it('should create a new RSVP', async () => {
    const newRSVP = { userId: 1, eventId: 1, status: 'Going' };
    const response = await request(app).post('/api/rsvps').send(newRSVP);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'RSVP created successfully' });
  });

  // Test for GET /api/rsvps/:eventId
  it('should retrieve RSVPs for a specific event', async () => {
    // Mock a successful query returning RSVP data
    db.poolPromise.query.mockResolvedValueOnce({ recordset: [{ id: 1, user_id: 1, event_id: 1, status: 'Going' }] });

    const response = await request(app).get('/api/rsvps/1');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, user_id: 1, event_id: 1, status: 'Going' }]);
  });

  // Test for PUT /api/rsvps
  it('should update an RSVP status', async () => {
    const updatedRSVP = { userId: 1, eventId: 1, status: 'Maybe' };

    const response = await request(app).put('/api/rsvps').send(updatedRSVP);

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'RSVP updated successfully' });
  });
});

const request = require('supertest');
const app = require('../index'); // Ensure this is pointing to your main server file
const db = require('../db'); // Import db to mock it

jest.mock('../db', () => ({
  poolPromise: {
    request: jest.fn().mockReturnThis(),
    input: jest.fn().mockReturnThis(), // Mock the input method for chaining
    query: jest.fn() // Mock the query method to allow different responses
  }
}));

describe('Events API', () => {
  beforeEach(() => {
    // Reset mocks before each test
    db.poolPromise.request.mockClear();
    db.poolPromise.input.mockClear();
    db.poolPromise.query.mockClear();
  });

  // Test GET /api/events
  it('should retrieve all events', async () => {
    db.poolPromise.query.mockResolvedValueOnce({ recordset: [{ id: 1, title: 'Test Event' }] });
    const response = await request(app).get('/api/events');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 1, title: 'Test Event' }]);
  });

  // Test POST /api/events
  it('should create a new event', async () => {
    db.poolPromise.query.mockResolvedValueOnce({ rowsAffected: [1] });
    const newEvent = { title: 'New Event', description: 'A test event', date: '2024-11-12', location: 'New York' };
    const response = await request(app).post('/api/events').send(newEvent);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'Event created successfully' });
  });

  // Test PUT /api/events/:id
  it('should update an existing event', async () => {
    db.poolPromise.query.mockResolvedValueOnce({ rowsAffected: [1] });
    const updatedEvent = { title: 'Updated Event', description: 'Updated description', date: '2024-12-01', location: 'Chicago' };
    const response = await request(app).put('/api/events/1').send(updatedEvent);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Event updated successfully' });
  });

  // Test DELETE /api/events/:id
  it('should delete an event', async () => {
    db.poolPromise.query.mockResolvedValueOnce({ rowsAffected: [1] });
    const response = await request(app).delete('/api/events/1');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: 'Event deleted successfully' });
  });
});

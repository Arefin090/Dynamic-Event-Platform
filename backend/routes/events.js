const express = require('express');
const router = express.Router();

// Placeholder for event data (to be replaced with real database queries later)
let events = [];

// Get all events
router.get('/', (req, res) => {
  res.json(events);
});

// Create a new event
router.post('/', (req, res) => {
  const { title, description, date, location } = req.body;
  const newEvent = {
    id: events.length + 1,
    title,
    description,
    date,
    location,
  };
  events.push(newEvent);
  res.status(201).json(newEvent);
});

// Get event by ID
router.get('/:id', (req, res) => {
  const eventId = parseInt(req.params.id, 10);
  const event = events.find((e) => e.id === eventId);
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// Update an existing event by ID
router.put('/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const { title, description, date, location } = req.body;
    const eventIndex = events.findIndex((e) => e.id === eventId);
  
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    events[eventIndex] = { id: eventId, title, description, date, location };
    res.json(events[eventIndex]);
  });

  // Delete an event by ID
router.delete('/:id', (req, res) => {
    const eventId = parseInt(req.params.id, 10);
    const eventIndex = events.findIndex((e) => e.id === eventId);
  
    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }
  
    events.splice(eventIndex, 1); // Remove the event from the array
    res.json({ message: 'Event deleted successfully' });
  });
  
  

module.exports = router;

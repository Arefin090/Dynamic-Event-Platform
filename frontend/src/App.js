import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import { getEvents, createEvent } from './services/eventService';

function App() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleCreateEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
        alert('Please fill in all fields');
        return;
      }
      await createEvent(newEvent);
      fetchEvents(); // Refresh the list of events
      setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset the form
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Event List
      </Typography>
      <List>
        {events.map((event) => (
          <ListItem key={event.id}>
            <ListItemText primary={event.title} secondary={event.description} />
          </ListItem>
        ))}
      </List>

      <Typography variant="h5" gutterBottom>
        Create a New Event
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <TextField
        label="Description"
        fullWidth
        margin="normal"
        value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
      />
      <TextField
        label="Date"
        type="date"
        fullWidth
        margin="normal"
        value={newEvent.date}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
      />
      <TextField
        label="Location"
        fullWidth
        margin="normal"
        value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
      />
      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Create Event
      </Button>
    </Container>
  );
}

export default App;

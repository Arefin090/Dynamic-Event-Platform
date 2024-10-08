import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { createEvent } from '../../Services/eventService';

function EventForm() {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });

  const handleCreateEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
        alert('Please fill in all fields');
        return;
      }
      await createEvent(newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <TextField label="Title" fullWidth margin="normal" value={newEvent.title}
        onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
      <TextField label="Description" fullWidth margin="normal" value={newEvent.description}
        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
      <TextField label="Date" type="date" fullWidth margin="normal" value={newEvent.date}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })} />
      <TextField label="Location" fullWidth margin="normal" value={newEvent.location}
        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })} />
      <Button variant="contained" color="primary" onClick={handleCreateEvent}>
        Create Event
      </Button>
    </div>
  );
}

export default EventForm;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Alert } from '@mui/material';
import { createEvent } from '../../Services/eventService';

function EventForm() {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const handleCreateEvent = async () => {
    try {
      if (!newEvent.title || !newEvent.description || !newEvent.date || !newEvent.location) {
        alert('Please fill in all fields');
        return;
      }
      await createEvent(newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
      setSnackbar({ open: true, message: 'Event created successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error creating event:', error);
      setSnackbar({ open: true, message: 'Error creating event', severity: 'error' });
    }
  };

  return (
    <div>
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
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
      <Button
        variant="contained"
        color="primary"
        onClick={handleCreateEvent}
        sx={{ mt: 2, width: '100%' }}
      >
        Create Event
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>

    </div>
  );
}

export default EventForm;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Typography, Snackbar, Alert } from '@mui/material';
import { getEventById, updateEvent } from '../../Service/eventService';

function EventEditForm() {
  const { id } = useParams();
  const [event, setEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const data = await getEventById(id);
        setEvent({
          ...data,
          date: formatDateForInput(data.date), // Format the date
        });
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };

    fetchEvent();
  }, [id]); // Add 'id' to dependencies

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract only the date part in yyyy-MM-dd format
  };

  const handleUpdateEvent = async () => {
    try {
      await updateEvent(id, event);
      setSnackbar({ open: true, message: 'Event updated successfully!', severity: 'success' });
      setTimeout(() => {
        navigate(`/events/${id}`);
      }, 1500);
    } catch (error) {
      console.error('Error updating event:', error);
      setSnackbar({ open: true, message: 'Error updating event', severity: 'error' });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Edit Event
      </Typography>
      <TextField label="Title" fullWidth margin="normal" value={event.title}
        onChange={(e) => setEvent({ ...event, title: e.target.value })} />
      <TextField label="Description" fullWidth margin="normal" value={event.description}
        onChange={(e) => setEvent({ ...event, description: e.target.value })} />
        <TextField
            label="Date"
            type="date"
            fullWidth
            margin="normal"
            value={event.date ? formatDateForInput(event.date) : ''}
            InputLabelProps={{ shrink: true }}
            onChange={(e) => setEvent({ ...event, date: e.target.value })}
            />      
      <TextField label="Location" fullWidth margin="normal" value={event.location}
        onChange={(e) => setEvent({ ...event, location: e.target.value })} />
      <Button variant="contained" color="primary" onClick={handleUpdateEvent} sx={{ mt: 2, width: '100%' }}>
        Save Changes
      </Button>
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EventEditForm;

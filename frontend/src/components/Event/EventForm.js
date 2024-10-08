import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Snackbar, Alert, Card, CardContent, Box } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import PlaceIcon from '@mui/icons-material/Place';
import DescriptionIcon from '@mui/icons-material/Description';
import TitleIcon from '@mui/icons-material/Title';
import { createEvent } from '../../Services/eventService';

function EventForm() {
  const [newEvent, setNewEvent] = useState({ title: '', description: '', date: '', location: '' });
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const validateFields = () => {
    let fieldErrors = {};
    if (!newEvent.title) fieldErrors.title = 'Title is required.';
    if (!newEvent.description) fieldErrors.description = 'Description is required.';
    if (!newEvent.date) fieldErrors.date = 'Date is required.';
    if (!newEvent.location) fieldErrors.location = 'Location is required.';
    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  const handleCreateEvent = async () => {
    if (!validateFields()) {
      setSnackbar({ open: true, message: 'Please fill in all required fields.', severity: 'warning' });
      return;
    }
    try {
      await createEvent(newEvent);
      setNewEvent({ title: '', description: '', date: '', location: '' }); // Reset form
      setSnackbar({ open: true, message: 'Event created successfully!', severity: 'success' });
    } catch (error) {
      console.error('Error creating event:', error);
      setSnackbar({ open: true, message: 'Error creating event', severity: 'error' });
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, p: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h4" align="center" gutterBottom>
            Create a New Event
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <TitleIcon color="primary" sx={{ mr: 1 }} />
            <TextField
              label="Title"
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.title}
              error={!!errors.title}
              helperText={errors.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <DescriptionIcon color="primary" sx={{ mr: 1 }} />
            <TextField
              label="Description"
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.description}
              error={!!errors.description}
              helperText={errors.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <EventIcon color="primary" sx={{ mr: 1 }} />
            <TextField
              label="Date"
              type="date"
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.date}
              error={!!errors.date}
              helperText={errors.date}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
            <PlaceIcon color="primary" sx={{ mr: 1 }} />
            <TextField
              label="Location"
              fullWidth
              variant="outlined"
              margin="dense"
              value={newEvent.location}
              error={!!errors.location}
              helperText={errors.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 3, borderRadius: '20px', width: 'auto' }}
            onClick={handleCreateEvent}
          >
            Create Event
          </Button>
        </CardContent>
      </Card>

      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default EventForm;

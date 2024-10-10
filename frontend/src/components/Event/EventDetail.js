import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardContent, Typography, Box, Button, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, CircularProgress } from '@mui/material';
import { getEventById, deleteEvent } from '../../Service/eventService';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const data = await getEventById(id);
        setEvent(data);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchEvent();
  }, [id]); // Add 'id' to the dependency array

  const handleDelete = async () => {
    try {
      await deleteEvent(id);
      setOpenDialog(false);
      navigate('/events'); // Redirect to events list after deletion
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card sx={{ boxShadow: 3, p: 4 }}>
        <CardContent>
          <Typography variant="h3" color="primary" gutterBottom>
            {event.title}
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Box display="flex" justifyContent="space-between" sx={{ mb: 4 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Date: {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Location: {event.location}
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {event.description}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Button variant="contained" color="primary" onClick={() => navigate(`/events/${id}/edit`)} sx={{ mr: 2 }}>
              Edit Event
            </Button>
            <Button variant="contained" color="secondary" onClick={handleOpenDialog}>
              Delete Event
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default EventDetail;

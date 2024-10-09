import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Snackbar, Alert, IconButton, Box, Stack, CircularProgress, Pagination } from '@mui/material';
import { getEvents, deleteEvent } from '../Services/eventService';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
        setLoading(true);
      const data = await getEvents();
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }finally {
        setLoading(false);
      }
  };

  const handleDelete = async () => {
    try {
      await deleteEvent(selectedEventId);
      setSnackbar({ open: true, message: 'Event deleted successfully!', severity: 'success' });
      setOpenDialog(false);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
      setSnackbar({ open: true, message: 'Error deleting event', severity: 'error' });
    }
  };

  const handleOpenDialog = (id) => {
    setSelectedEventId(id);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Event Management Dashboard
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddCircleOutlineIcon />} 
          onClick={() => navigate('/create')}
          sx={{ borderRadius: '20px' }}
        >
          Create New Event
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Paper elevation={3} sx={{ p: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><Typography variant="h6">Title</Typography></TableCell>
                  <TableCell><Typography variant="h6">Date</Typography></TableCell>
                  <TableCell><Typography variant="h6">Location</Typography></TableCell>
                  <TableCell><Typography variant="h6">Actions</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentEvents.map((event, index) => (
                  <TableRow key={event.id} sx={{ backgroundColor: index % 2 === 0 ? '#f9f9f9' : 'inherit' }}>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                    <TableCell>{event.location}</TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        <IconButton color="primary" onClick={() => navigate(`/events/${event.id}/edit`)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton color="error" onClick={() => handleOpenDialog(event.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination Component */}
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
            <Pagination
              count={Math.ceil(events.length / eventsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              size="large"
            />
          </Box>
        </Paper>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this event? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">Cancel</Button>
          <Button onClick={handleDelete} color="secondary">Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Dashboard;

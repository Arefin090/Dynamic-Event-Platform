// src/components/Event/EventList.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress, Box, IconButton, Pagination} from '@mui/material';
import { getEvents } from '../../Service/eventService';
import { Link } from 'react-router-dom';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 6;

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const data = await getEvents();
      console.log('Fetched events:', data);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }finally {
      setLoading(false);
    }
  };

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    if (loading) {
      return (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      );
    }
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h4" align="center" color="primary" gutterBottom>
          Upcoming Events
        </Typography>
        <Grid container spacing={4}>
          {currentEvents.map((event) => (  // Use currentEvents here
            <Grid item xs={12} sm={6} md={4} key={event.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  borderRadius: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': { transform: 'scale(1.02)' }
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight="bold" color="text.primary" gutterBottom>
                    {event.title}
                  </Typography>
                  <Box display="flex" alignItems="center" sx={{ mb: 1 }}>
                    <EventIcon sx={{ mr: 1, color: 'secondary.main' }} />
                    <Typography color="text.secondary">
                      {new Date(event.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box display="flex" alignItems="center">
                    <LocationOnIcon sx={{ mr: 1, color: 'secondary.main' }} />
                    <Typography variant="body2" color="text.secondary">
                      {event.location}
                    </Typography>
                  </Box>
                </CardContent>
                <Box sx={{ padding: 2, textAlign: 'center' }}>
                  <Button
                    variant="contained"
                    color="primary"
                    component={Link}
                    to={`/events/${event.id}`}
                    sx={{
                      borderRadius: '20px',
                      padding: '8px 16px',
                      width: '100%',
                      fontWeight: 'bold'
                    }}
                  >
                    View Details
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
    
        {/* Pagination Component */}
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(events.length / eventsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            size="large"
          />
        </Box>
      </Container>
    );
    
  }
  
  export default EventList;
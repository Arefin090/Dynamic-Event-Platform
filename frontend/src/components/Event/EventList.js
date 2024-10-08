// src/components/Event/EventList.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button, CircularProgress } from '@mui/material';
import { getEvents } from '../../Services/eventService';
import { Link } from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

    if (loading) {
      return (
        <Container sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
        </Container>
      );
    }
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ boxShadow: 3, borderRadius: 2, p: 2, minHeight: '220px' }}>
          <CardContent>
            <Typography variant="h6" component="div">
              {event.title}
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 1.5 }}>
              {new Date(event.date).toLocaleDateString()}
            </Typography>
            <Typography variant="body2" sx={{ mb: 2 }}>
              {event.location}
            </Typography>
            <Button 
              variant="contained" 
              color="primary" 
              component={Link} 
              to={`/events/${event.id}`}
              sx={{ mt: 2, width: '100%' }}
            >
              View Details
            </Button>
          </CardContent>
        </Card>

          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default EventList;

// src/components/Event/EventList.js
import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, Button } from '@mui/material';
import { getEvents } from '../../Services/eventService';
import { Link } from 'react-router-dom';

function EventList() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const data = await getEvents();
      console.log('Fetched events:', data);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Upcoming Events
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" component="div">
                  {event.title}
                </Typography>
                <Typography color="text.secondary">
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

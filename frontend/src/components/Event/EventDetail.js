// src/components/Event/EventDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography, Box } from '@mui/material';
import { getEventById } from '../../Services/eventService';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEvent();
  }, []);

  const fetchEvent = async () => {
    try {
      const data = await getEventById(id);
      setEvent(data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  if (!event) return <Typography>Loading...</Typography>;

  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography variant="h3" color="primary">{event.title}</Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          {new Date(event.date).toLocaleDateString()}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          {event.location}
        </Typography>
      </Box>
      <Typography variant="body1" paragraph>
        {event.description}
      </Typography>
    </Container>
  );
}

export default EventDetail;

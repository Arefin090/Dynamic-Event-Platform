// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom color="primary">
          Discover Events Near You
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          Explore events and connect with people in your area.
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to="/events"
            sx={{ marginRight: 2 }}
          >
            Browse Events
          </Button>
          <Button
            variant="outlined"
            color="primary"
            component={Link}
            to="/create"
          >
            Create an Event
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default Home;

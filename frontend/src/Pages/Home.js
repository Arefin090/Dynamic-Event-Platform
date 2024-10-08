// src/pages/Home.js
import React from 'react';
import { Container, Typography, Button, Box, Card, CardContent, Fade } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';
import EventIcon from '@mui/icons-material/Event';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const backgroundUrl = 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDE2fHxldmVudHN8ZW58MHx8fHwxNjEyODQ5MzQ5&ixlib=rb-1.2.1&q=80&w=1080';

const GradientOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  // background: 'linear-gradient(to bottom right, rgba(255, 111, 97, 0.6), rgba(255, 182, 169, 0.6))',
  zIndex: 1,
  borderRadius: '8px',
});

const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundImage: `url(${backgroundUrl})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: '120px 0',
  color: theme.palette.text.primary,
  textAlign: 'center',
  borderRadius: '8px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

function Home() {
  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <HeroSection>
        <GradientOverlay />
        <Card
          sx={{
            maxWidth: 600,
            backgroundColor: 'rgba(255,255,255,0.85)',
            p: 4,
            boxShadow: 6,
            textAlign: 'center',
            zIndex: 2,
          }}
        >
          <CardContent>
            <Fade in timeout={800}>
              <Typography variant="h3" color="primary" gutterBottom sx={{ fontWeight: 'bold' }}>
                Discover Events Near You
              </Typography>
            </Fade>
            <Fade in timeout={1200}>
              <Typography variant="h6" color="text.secondary" paragraph>
                Explore events and connect with people in your area.
              </Typography>
            </Fade>
            <Box sx={{ mt: 3 }}>
              <Fade in timeout={1600}>
                <Button
                  variant="contained"
                  color="primary"
                  component={Link}
                  to="/events"
                  startIcon={<EventIcon />}
                  sx={{
                    padding: '12px 24px',
                    fontSize: '1rem',
                    marginRight: 2,
                    borderRadius: '20px',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
                    '&:hover': {
                      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.25)',
                    },
                  }}
                >
                  Browse Events
                </Button>
              </Fade>
              <Fade in timeout={2000}>
                <Button
                  variant="outlined"
                  color="primary"
                  component={Link}
                  to="/create"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    padding: '12px 24px',
                    fontSize: '1rem',
                    borderRadius: '20px',
                    borderColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'rgba(255, 111, 97, 0.1)',
                    },
                  }}
                >
                  Create an Event
                </Button>
              </Fade>
            </Box>
          </CardContent>
        </Card>
      </HeroSection>
    </Container>
  );
}

export default Home;

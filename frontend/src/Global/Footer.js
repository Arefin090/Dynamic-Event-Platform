// src/Global/Footer.js
import React from 'react';
import { Container, Typography, Box, Link, Grid, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

function Footer() {
  return (
    <Box sx={{ backgroundColor: 'primary.main', color: '#fff', py: 4, mt: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* About Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2" color="inherit">
              Discover and create amazing events with Event Platform. Connect with people in your area and build unforgettable memories.
            </Typography>
          </Grid>

          {/* Navigation Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="/" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
              Home
            </Link>
            <Link href="/create" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
              Create Event
            </Link>
            <Link href="/events" color="inherit" underline="hover" sx={{ display: 'block', mb: 0.5 }}>
              Browse Events
            </Link>
            <Link href="/dashboard" color="inherit" underline="hover" sx={{ display: 'block' }}>
              Dashboard
            </Link>
          </Grid>

          {/* Social Media & Contact */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Connect with Us
            </Typography>
            <Box>
              <IconButton href="https://www.facebook.com" target="_blank" color="inherit">
                <FacebookIcon />
              </IconButton>
              <IconButton href="https://www.twitter.com" target="_blank" color="inherit">
                <TwitterIcon />
              </IconButton>
              <IconButton href="https://www.instagram.com" target="_blank" color="inherit">
                <InstagramIcon />
              </IconButton>
              <IconButton href="https://www.linkedin.com" target="_blank" color="inherit">
                <LinkedInIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ mt: 1 }}>
              © {new Date().getFullYear()} Event Platform. All rights reserved.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;

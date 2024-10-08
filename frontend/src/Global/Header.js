// src/Global/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Tooltip } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/login'); // Redirect to login page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Event Platform</Link>
          </Typography>
          <Button color="inherit" component={Link} to="/" sx={{ mr: 1 }}>Home</Button>
          <Button color="inherit" component={Link} to="/create" sx={{ mr: 1 }}>Create Event</Button>
          <Button color="inherit" component={Link} to="/dashboard" sx={{ mr: 1 }}>Dashboard</Button>
          {!token ? (
            <>
              <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>Login</Button>
              <Button color="inherit" component={Link} to="/register" sx={{ mr: 1 }}>Register</Button>
            </>
          ) : (
            <Tooltip title="Logout" arrow>
              <IconButton color="inherit" onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

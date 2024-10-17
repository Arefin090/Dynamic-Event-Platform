// src/Global/Header.js
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, IconButton, Tooltip, Drawer, List, ListItem, ListItemText, ListItemIcon, Divider, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import EventIcon from '@mui/icons-material/Event';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import useAuthRedirect from '../hooks/useAuthRedirect';

function Header() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { redirectToLogin, snackbar } = useAuthRedirect(!!token);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleCreateEventClick = () => {
    if (!token) {
      redirectToLogin();
    } else {
      navigate('/create');
    }
  };

  const handleDashboardClick = () => {
    if (!token) {
      redirectToLogin();
    } else {
      navigate('/dashboard');
    }
  };

  const drawerList = (
    <Box
      sx={{
        width: 250,
        bgcolor: 'background.paper',
        height: '100%',
        padding: 2,
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon><HomeIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button component={Link} to="/create">
          <ListItemIcon><EventIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Create Event" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard">
          <ListItemIcon><DashboardIcon color="primary" /></ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <Divider sx={{ my: 1 }} />
        {!token ? (
          <>
            <ListItem button component={Link} to="/login">
              <ListItemIcon><LoginIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register">
              <ListItemIcon><PersonAddIcon color="primary" /></ListItemIcon>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        ) : (
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon color="primary" /></ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" sx={{ backgroundColor: 'primary.main' }}>
      <Container>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Event Platform</Link>
          </Typography>
          {/* Desktop Buttons */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button color="inherit" component={Link} to="/" sx={{ mr: 1 }}>Home</Button>
            <Button color="inherit" onClick={handleCreateEventClick} sx={{ mr: 1 }}>Create Event</Button>
            <Button color="inherit" onClick={handleDashboardClick} sx={{ mr: 1 }}>Dashboard</Button>
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
          </Box>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton color="inherit" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
              {drawerList}
            </Drawer>
          </Box>
        </Toolbar>
      </Container>
      {snackbar}
    </AppBar>
  );
}

export default Header;




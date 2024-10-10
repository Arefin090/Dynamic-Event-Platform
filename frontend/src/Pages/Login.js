// src/Pages/Login.js
import React, { useState } from 'react';
import { Container, TextField, Button, Card, Typography, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../Services/userService';

function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const token = await loginUser(credentials); 
      localStorage.setItem('token', token); // Store the token
      setSnackbar({ open: true, message: 'Login successful!', severity: 'success' });
      setTimeout(() => {
        navigate('/');
      }, 1500);
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbar({ open: true, message: 'Login failed. Please try again.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };  

  const handleCloseSnackbar = () => {
    setSnackbar({ open: false, message: '', severity: '' });
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 8 }}>
      <Card sx={{ p: 4, boxShadow: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Welcome Back!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
          Sign in to continue
        </Typography>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </Card>

      {/* Snackbar for Notifications */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Login;

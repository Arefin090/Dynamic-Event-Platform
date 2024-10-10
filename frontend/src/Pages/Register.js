// src/Pages/Register.js
import React, { useState } from 'react';
import { Container, TextField, Button, Card, Typography, Box, Snackbar, Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../Service/userService';

function Register() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
        await registerUser(formData); // Use the service function here
      setSnackbar({ open: true, message: 'Registration successful! Please log in.', severity: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 1500);
    } catch (error) {
      console.error('Error during registration:', error);
      setSnackbar({ open: true, message: 'Registration failed. Please try again.', severity: 'error' });
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
          Join Us!
        </Typography>
        <Typography variant="body1" align="center" sx={{ mb: 3, color: 'text.secondary' }}>
          Create your account to get started
        </Typography>
        <TextField
          label="Username"
          name="username"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.username}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Register'}
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

export default Register;

// src/hooks/useAuthRedirect.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Snackbar, Alert } from '@mui/material';

const useAuthRedirect = (isAuthenticated) => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const redirectToLogin = (message = 'Login required to access this page.') => {
    if (!isAuthenticated) {
      setSnackbarMessage(message);
      setSnackbarOpen(true);
      navigate('/login');
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return {
    redirectToLogin,
    snackbar: (
      <Snackbar open={snackbarOpen} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    )
  };
};

export default useAuthRedirect;

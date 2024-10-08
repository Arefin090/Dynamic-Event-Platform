import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF6F61', // Coral color
    },
    secondary: {
      main: '#FFB6A9', // Lighter coral for secondary
    },
    background: {
      default: '#FFF7F5', // Light background with coral hue
    },
    text: {
      primary: '#333333', // Dark color for contrast with coral
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h3: {
      fontWeight: 700,
    },
    h4: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 500,
      color: '#555555',
    },
    body1: {
      fontSize: '1rem',
      color: '#444444',
    },
    subtitle1: {
      fontSize: '0.9rem',
      color: '#888888',
    },
  },
});

export default theme;

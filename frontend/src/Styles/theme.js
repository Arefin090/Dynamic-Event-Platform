//Styles/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7F50', // Coral color
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
  },
});

export default theme;

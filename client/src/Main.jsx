import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import App from './App.jsx'
import './styles.css'


// Create a custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d046e',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#282429',
      paper: '#656366',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
  }, typography: {
    fontFamily: '"Press Start 2P", cursive',
  },
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </StrictMode>
);

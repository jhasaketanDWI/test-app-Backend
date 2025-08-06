import { createTheme } from '@mui/material/styles';

const getTheme = (mode = 'dark') => createTheme({
  palette: {
    mode,
    primary: {
      main: mode === 'light' ? '#fff' : '#000',
    },
    secondary: {
      main: mode === 'light' ? '#000' : '#fff',
    },
  },
  typography: {
    fontFamily: 'system-ui, Arial, sans-serif',
  },
});

export default getTheme;

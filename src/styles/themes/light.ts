import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    primary: {
      light: '#5BC4F0',
      main: '#14A6E3',
      dark: '#006B98',
      contrastText: '#333',
    },
    secondary: {
      light: '#FFDC8B',
      main: '#FEC84B',
      dark: '#D79600',
      contrastText: '#333',
    },
  },
});

export default light;

import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#FFDC8B',
      main: '#FEC84B',
      dark: '#D79600',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5BC4F0',
      main: '#14A6E3',
      dark: '#006B98',
      contrastText: '#fff',
    },
  },
});

export default light;

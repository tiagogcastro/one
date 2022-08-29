import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import AppProvider from './hooks';
import AppRoutes from './routes';
import GlobalStyles from './styles/global';
import lightCustom from './styles/themes/light';

function App() {
  return (
    <ThemeProvider theme={lightCustom}>
      <GlobalStyles />
      <ToastContainer />
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;

import 'react-toastify/dist/ReactToastify.css';

import { ToastContainer } from 'react-toastify';
import { ThemeProvider } from 'styled-components';

import { AuthProvider } from './context';
import { AppRouter } from './routes';
import GlobalStyles from './styles/global';
import lightCustom from './styles/themes/light';

function App() {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={lightCustom}>
          <GlobalStyles />

          <ToastContainer />

          <AppRouter />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;

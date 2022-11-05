import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './context';
import { AppRouter } from './routes';
import GlobalStyles from './styles/global';
import light from './styles/themes/light';
import { CompanyProvider } from './context/company/CompanyContext';

function App() {
  return (
    <>
      <AuthProvider>
        <GlobalStyles />
        <ThemeProvider theme={light}>
          <ToastContainer />

          <CompanyProvider>
            <AppRouter />
          </CompanyProvider>
        </ThemeProvider>
      </AuthProvider>
    </>
  );
}

export default App;

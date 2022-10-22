import { BrowserRouter } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Routers } from './Routers';

export function AppRouter() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <>
        <p>Loading...</p>
      </>
    );
  }

  return (
    <>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  );
}

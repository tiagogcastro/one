import { BrowserRouter } from 'react-router-dom';

import { Routers } from './Routers';

export function AppRouter() {
  return (
    <>
      <BrowserRouter>
        <Routers />
      </BrowserRouter>
    </>
  );
}

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from '../pages/Auth/SignIn/SignIn';

const AuthRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  </Router>
);

export default AuthRoutes;

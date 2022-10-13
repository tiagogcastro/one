import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthHome from '../pages/Auth/AuthHome/AuthHome';

const AuthRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHome />} />
      </Routes>
    </Router>
  );
};

export default AuthRoutes;

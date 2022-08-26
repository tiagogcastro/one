import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../pages/UserPages/Home/Home';

const UserRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  </Router>
);

export default UserRoutes;

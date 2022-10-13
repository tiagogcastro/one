import React from 'react';
import { BrowserRouter as Router, Outlet, Route, Routes } from 'react-router-dom';

import UserLayout from '../components/Layouts/UserLayout/UserLayout';
import Home from '../pages/UserPages/Home/Home';

const UserRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route
        element={
          <UserLayout>
            <Outlet />
          </UserLayout>
        }
      >
        <Route path="/" element={<Home />} />
      </Route>
    </Routes>
  </Router>
);

export default UserRoutes;

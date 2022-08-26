import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignIn from '../pages/Auth/SignInUser/SignInUser';

// import Layout from '../components/AppLayoutAdmin';
const AdminRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </Router>
  );
};

export default AdminRoutes;

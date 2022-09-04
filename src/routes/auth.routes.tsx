import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import AuthHome from '../pages/Auth/AuthHome/AuthHome';
//import SignIn from '../pages/Auth/SignInUser/SignInUser';
import SignUp from '../pages/Auth/SignUpUser/SignUpUser';

const AuthRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthHome />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default AuthRoutes;

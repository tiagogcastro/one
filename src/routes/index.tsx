import React from 'react';

import { useAuth } from '../hooks/auth';
import Admin from './admin.routes';
import Auth from './auth.routes';
import User from './user.routes';

const Routes: React.FC = () => {
  const { user } = useAuth();

  const Route = () => {
    if (!user) return <Auth />;

    if (user.profile.name === 'cliente') return <User />;
    return user.environment === 'client' ? <User /> : <Admin />;
  };

  return <Route />;
};

export default Routes;

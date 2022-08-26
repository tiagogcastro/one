import React from 'react';

import { useAuth } from '../../../hooks/auth';

const Home: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};
export default Home;
